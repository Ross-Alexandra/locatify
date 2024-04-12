package main

import (
	"html/template"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
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
	IpAddresses []LookupIp
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

	t := &Template{
		templates: template.Must(template.ParseFiles(templateFiles...)),
	}

	e := echo.New()
	e.Renderer = t

	e.Logger.SetLevel(log.INFO)

	e.Use(middleware.Logger())

	e.Static("/static", "dist")
	e.Static("/", "public")

	e.GET("/", func(c echo.Context) error {
		return c.Render(http.StatusOK, "search/index", IndexPage{
			CopyrightYear: time.Now().Year(),
		})
	})

	e.GET("/results", func(c echo.Context) error {
		formParams, err := c.FormParams()
		if err != nil {
			e.Logger.Fatal("Received error from form params: ", err)
			return c.NoContent(http.StatusBadRequest)
		}

		ipAddresses := make([]LookupIp, len(formParams["ip"]))
		for i := range len(formParams["ip"]) {
			ipAddresses[i] = LookupIp{
				Ip:    formParams["ip"][i],
				Label: formParams["label"][i],
			}
		}

		return c.Render(http.StatusOK, "results", ResultsPage{
			Routing: Routing{
				Title: "Locatify - " + strconv.Itoa(len(ipAddresses)) + " IPs Parsed",
			},
			IpAddresses: ipAddresses,
		})
	})

	e.Logger.Fatal(e.Start(":34343"))
}
