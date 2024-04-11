package main

import (
	"html/template"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	t := &Template{
		templates: template.Must(template.ParseGlob("views/*.html")),
	}

	e := echo.New()
	e.Renderer = t

	e.Static("/static", "dist")
	e.Static("/", "public")

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World")
	})

	e.GET("/index", func(c echo.Context) error {
		return c.File("index.html")
	})

	e.GET("/template", func(c echo.Context) error {
		return c.Render(http.StatusOK, "example.html", nil)
	})

	e.Logger.Fatal(e.Start(":34343"))
}
