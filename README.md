## Ripple TakeHome
Simple chat app which allows user input and randomly generated Messages to appear on a chat log. Built with React + Redux and Bootstrap for styling.
## Running

Install dependencies: `$ npm install`

Fire up a development server: `$ npm run dev` - this includes a redux development tool which display application state.

To run as if in production: `$ npm start` - this will build files for production and use the Uglify plugin to compress the JS files.

Run Front end tests: `$ npm run test` - this runs all component unit tests.

Once the server is running, you can visit `http://localhost:3000/`

## File layout

- **Frontend React**
    - The top level application Container is in `frontend/containers/AppContainer.js`
    - CSS styles are in `frontend/assets/stylesheets/base.scss`
- **Backend Express**
    - Entry point is `server.js`
