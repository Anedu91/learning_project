# Help teacher app

The Teacher Evaluation Dashboard is a lightweight web application designed to assist teachers in evaluating student tasks. It is built using vanilla JavaScript and leverages Webpack for bundling the application. The user interface employs Bootstrap components to create a clean layout.

The application allows teachers to view a document preview, navigate through tasks, and filter the task list based on specific criteria. Teachers can update task scores, provide feedback, and adjust the document view according to their preferences.

## How to run it

There is a full demo working [here](https://anedu91.github.io/learning_project/dist/)

### Production files

You can find a production files into the `dist` folder

### Development Enviroment

You can run a dev server on `localhost:9000`

- `yarn build-server`
- `npm run build-server`

## Code Structure

This code is used for rendering and handling events in a web application that allows users to evaluate tasks and provide feedback. The application consists of a `document preview`, `navigation bar`, and a list of `task cards`. Users can **filter** the task list, **adjust** the document view, and **update** task scores.

### Store Object

The store object holds the application's state, including:

- template settings,
- score information,
- evaluations,
- rendered evaluations,
- and feedback.

### Event Listeners

1. DOMContentLoaded: When the page is loaded, it calls the onPageLoad and setupClickHandlers functions.
2. Click: Handles various click events, such as filtering tasks, adjusting document view, updating scores, and providing feedback.

### Render Functions

In the code base are two types of render functions.

1. Functions that return `html` strings - Can be found in `src/js/components`
2. Functions that update the DOM - Can be found in `index.js`

- updateScore
- renderTask
- evaluatedTo100
- gradedTo100
