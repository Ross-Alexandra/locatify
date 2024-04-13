package main

import (
	"archive/tar"
	"compress/gzip"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		panic("Couldn't load .env file")
	}

	homeDir, err := os.UserHomeDir()
	if err != nil {
		panic("Couldn't find homeDir: " + err.Error())
	}

	installLocation := homeDir + "/locatify-v3/db"
	os.Mkdir(installLocation, os.ModePerm)

	databaseFile, err := os.Create(installLocation + "/database.mmdb.tar.gz")
	if err != nil {
		panic("Couldn't create database file: " + err.Error())
	}
	defer databaseFile.Close()

	response, err := http.Get("https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&suffix=tar.gz&license_key=" + os.Getenv("MM_LICENSE"))
	if err != nil {
		panic("Couldn't fetch database file from MaxMind: " + err.Error())
	}
	defer response.Body.Close()

	_, err = io.Copy(databaseFile, response.Body)
	if err != nil {
		panic("Couldn't clone compressed database contents from MaxMind to our created file: " + err.Error())
	}

	databaseFile.Seek(0, io.SeekStart)
	uncompressedStream, err := gzip.NewReader(databaseFile)
	if err != nil {
		panic("Couldn't decompress .tar.gz archive from MaxMind: " + err.Error())
	}

	tarReader := tar.NewReader(uncompressedStream)
	var header *tar.Header
	for header, err = tarReader.Next(); err == nil; header, err = tarReader.Next() {
		switch header.Typeflag {
		case tar.TypeDir:
			err := os.Mkdir(installLocation+"/"+header.Name, 0755)
			if err != nil {
				panic("Couldn't extract .tar archive from MaxMind; Mkdir() failed with: " + err.Error())
			}
		case tar.TypeReg:
			outFile, err := os.Create(installLocation + "/" + header.Name)
			if err != nil {
				panic("Couldn't extract .tar archive from MaxMind; Create() failed with: " + err.Error())
			}

			_, err = io.Copy(outFile, tarReader)
			if err != nil {
				outFile.Close()
				panic("Couldn't extract .tar archive from MaxMind; Copy() failed with: " + err.Error())
			}

			err = outFile.Close()
			if err != nil {
				panic("Couldn't extract .tar archive from MaxMind; Close failed with: " + err.Error())
			}
		default:
			panic(fmt.Sprintf("Couldn't extract .tar archive, unknown type %b in %s", header.Typeflag, header.Name))
		}
	}

	if err != io.EOF {
		panic("Couldn't extract .tar archive from MaxMind; Next() failed with: " + err.Error())
	}

	foundFile := false
	filesToRemove := make([]string, 0)
	dirsToRemove := make([]string, 0)

	filepath.Walk(installLocation, func(path string, fileInfo os.FileInfo, e error) error {
		fileName := fileInfo.Name()
		if len(fileName) > 5 && fileName[len(fileName)-5:] == ".mmdb" {
			os.Rename(path, installLocation+"/database.mmdb")

			foundFile = true
			return nil
		} else {
			if path != installLocation {
				if fileInfo.IsDir() {
					dirsToRemove = append(dirsToRemove, path)
				} else {
					filesToRemove = append(filesToRemove, path)
				}
			}
		}

		return nil
	})

	if !foundFile {
		panic("Couldn't find .mmdb file in extracted archive")
	}

	for _, file := range filesToRemove {
		os.Remove(file)
	}

	for _, dir := range dirsToRemove {
		os.Remove(dir)
	}
}
