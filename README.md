# SkyArt

## Taking Over Your Imagination

A place where thinkers can share and discuss A.I. art!

## Getting started with Create React App
This project was bootstrapped with Create React App. To run this on your own machine, simply download the code and its dependencies.

### Additional Packages
The list of dependencies can be found within the package.json file

To install them run 

### `npm i`

in the terminal

### Setting up connection
In the src/remote/social-media-api folder, change the socialClient.ts file to point to the backend server that you are running, either locally or on the cloud

Edit the 'Access-Control-Allow-Origin' property under 'headers' to contain the URL of the backend Spring server

### Commands to use

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run coverage`
Performs all the created tests in the project and displays coverage information

