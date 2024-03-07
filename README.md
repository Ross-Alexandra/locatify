# Locatify
## V1
The original version of this app was created as an interview assignment for
a company I applied to. It was build using React on a Flack API. Additional
details can be found in the v1 directory.

## V2
A rewrite of the locatify app I'm using to try out HTMX. In theory I like the
idea of having the server be the source of truth for the UI without having to
duplicate the state in the client. I'm also using this as an opportunity to
learn more about php & twig (as this is the stack we use at my current company).
In the future I'd like to try out a similar project using Go and the html/template
package.

## V3
A rewrite of the locatify app using Go and the html/template package. I'm using
this as an opportunity to learn more about Go and to compare it to the php/twig
stack.

Since the app written in v2 uses HTMX & twig templates, I'm going to minimally
rewrite the templates to use the html/template package. Further, since the
app written in v2 uses the methodology of having the server be the source of
truth for the UI, I expect to be able to reuse the templates with minimal
modification. 

V3 will allow me to test this hypothesis and to compare the two stacks, while
also learning more about Go.

