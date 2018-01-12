# Instructions

The following instructions are for setting up this repo and exclusively
running the tests for Metal.js.

## Dependencies

Install the root level dependencies:

```
npm install
```

Then start up the server, the server **must be running** to run the tests:

```
npm start
```

## Build Metal

Navigate to the `metal-*` directories, and run the following commands to build:

```
npm install
npm run build-prod
```

## Build and run Selenium driver

Navigate to the `webdriver-ts` directory, and run the following commands to
build:

```
npm install
npm run build-prod
```

Now that it's built, make sure the server is running in another terminal, and
start up the webdriver from the `webdriver-ts` directory.

```
npm run selenium -- --count 3 --framework metal
```

This command will run the tests 3 times for both of the metal directories.
