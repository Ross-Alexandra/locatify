package main

import (
	"fmt"
	"html/template"
	"io"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"github.com/oschwald/maxminddb-golang"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

type LookupIp struct {
	Ip    string
	Label string
}

type MMIp struct {
	Ip     string
	Label  string
	Record any
}

type Routing struct {
	Title  string
	IsHTMX bool
}

type IndexPage struct {
	CopyrightYear int
	Routing
}

type ResultsPage struct {
	Routing
	IpAddresses []MMIp
}

func parseIpAddress(lookupIp LookupIp) (MMIp, error) {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return MMIp{}, err
	}

	db, err := maxminddb.Open(homeDir + "/locatify-v3/db/database.mmdb")
	if err != nil {
		return MMIp{}, err
	}
	defer db.Close()

	ip := net.ParseIP(lookupIp.Ip)
	label := lookupIp.Label

	var record any
	err = db.Lookup(ip, &record)
	if err != nil {
		return MMIp{}, err
	}

	return MMIp{
		Ip:     lookupIp.Ip,
		Label:  label,
		Record: record,
	}, nil

}

func getTemplates(basePath string) []string {
	templateFiles := make([]string, 0)
	err := filepath.Walk(basePath, func(path string, info os.FileInfo, err error) error {
		if info.IsDir() || len(path) < 5 {
			return nil
		}

		if path[len(path)-5:] == ".html" {
			templateFiles = append(templateFiles, path)
		}
		return nil
	})

	if err != nil {
		panic(err)
	}

	return templateFiles
}

func main() {
	templateFiles := getTemplates("templates")

	funcMap := template.FuncMap{
		"as_time": func(timezone string) string {
			loc, err := time.LoadLocation(timezone)
			if err != nil {
				return "Unknown"
			}

			now := time.Now().In(loc)
			return fmt.Sprintf(now.Format("03:04 pm %s (-07:00)"), timezone)
		},
	}

	t := &Template{
		templates: template.Must(template.New("").Funcs(funcMap).ParseFiles(templateFiles...)),
	}

	e := echo.New()
	e.Renderer = t

	e.Logger.SetLevel(log.INFO)

	e.Use(middleware.Logger())

	e.Static("/static", "dist")
	e.Static("/", "public")

	e.GET("/", func(c echo.Context) error {
		isHTMX := len(c.Request().Header.Get("hx-request")) > 0
		var route string
		if isHTMX {
			route = "search"
		} else {
			route = "search/index"
		}

		return c.Render(http.StatusOK, route, IndexPage{
			CopyrightYear: time.Now().Year(),
			Routing: Routing{
				IsHTMX: isHTMX,
			},
		})
	})

	e.GET("/results", func(c echo.Context) error {
		formParams, err := c.FormParams()
		if err != nil {
			e.Logger.Fatal("Received error from form params: ", err)
			return c.NoContent(http.StatusBadRequest)
		}

		ipAddresses := make([]MMIp, len(formParams["ip"]))
		for i := range len(formParams["ip"]) {
			ipAddresses[i], err = parseIpAddress(LookupIp{
				Ip:    formParams["ip"][i],
				Label: formParams["label"][i],
			})

			if err != nil {
				e.Logger.Fatal("Received error while parsing maxmind DB: ", err)
				return c.NoContent(http.StatusInternalServerError)
			}
		}

		return c.Render(http.StatusOK, "results", ResultsPage{
			Routing: Routing{
				Title: "Locatify - " + strconv.Itoa(len(ipAddresses)) + " IPs Parsed",
			},
			IpAddresses: ipAddresses,
		})
	})

	e.Logger.Fatal(e.Start(":14010"))
}
