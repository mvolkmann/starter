This is a starting point for new React projects.
It was created using create-react-app.

## Installation
```bash
npm install -g yarn
yarn
```

## Steps to start REST server:
1. open a terminal window
2. cd starter-api
3. npm start

## Steps to start web server:
1. open a terminal window
2. cd starter
3. export HTTPS=true
4. npm start

Browse http://localhost:3000

If it fails to fetch data, it could be that the browser doesn't yet trust
the domain of the REST serves.  To enable this:
1. browse https://localhost/project
2. click "ADVANCED"
3. click "Proceed to localhost (unsafe)"

## Sass Linting
For all the rules and options for `stylelint` see:
[Stylelint Rules](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/example-config.md)

To see a list of color names supported by all browsers with CSS3 support, including IE9+, see:
[CSS3 Colors](https://www.w3.org/TR/css3-color/#svg-color)

> NOTE: Rules do not have defaults with stylelint. Any rule not present is not enforced.
> If you had a `.stylelintrc` with `{ "rules": {} }` then it would do nothing.

## Docker
`npm run dbuild` will build the docker image for the web server
`npm run drun` will start the web server container and expose port 3000 to the host
