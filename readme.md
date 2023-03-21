# Help teacher app

The Teacher Evaluation Dashboard is a lightweight web application designed to assist teachers in evaluating student tasks. It is built using vanilla JavaScript and leverages Webpack for bundling the application. The user interface employs Bootstrap components to create a clean layout.

The application allows teachers to view a document preview, navigate through tasks, and filter the task list based on specific criteria. Teachers can update task scores, provide feedback, and adjust the document view according to their preferences.

## Code Structure

This code is used for rendering and handling events in a web application that allows users to evaluate tasks and provide feedback. The application consists of a `document preview`, `navigation bar`, and a list of `task cards`. Users can <b>filter</b> the task list, <b>adjust</b> the document view, and <b>update</b> task scores.

### Store Object

The store object holds the application's state, including:
-template settings,
-score information,
-evaluations,
-rendered evaluations,
-and feedback.

### Event Listeners

1. DOMContentLoaded: When the page is loaded, it calls the onPageLoad and setupClickHandlers functions.
2. Click: Handles various click events, such as filtering tasks, adjusting document view, updating scores, and providing feedback.
