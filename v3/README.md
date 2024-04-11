# V3

## Running in development
Locatify V3 is built using Go [Echo server](https://github.com/labstack/echo) to
statically serve html templates.

In order to generate static JS files, webpack is used to build, & tree-shake the
`src/scripts/index.ts` file. Any JS which the page uses must be exported into
that file to increase site usability.

In order to generate static CSS files, SASS is used to build & minify the css
in the `src/styles` file. All SASS files in that directory will be build &
exported statically with a matching name.

In order to support hot reloading of each of these functionalities, run
`npm run dev`. This command will use [concurrently](https://www.npmjs.com/package/concurrently)
to run the `dev:js`, `dev:css` and `dev:go` scripts. Each of those scripts will
rebuild the static assets when their relevant files are changed using:
- `dev:js`: WebPack
- `dev:css`: SASS
- `dev:go`: [air](https://github.com/cosmtrek/air)

Since we will be using html templates served via the Echo server, `dev:go` will
automatically reload whenever a `.html` file changes.

Right now, due to a [bug in air](https://github.com/cosmtrek/air/issues/197), 
*only* `.go` and `.html` files will trigger a rebuild of the Echo server. Any
other files will require a manual restart unfortunately. 
