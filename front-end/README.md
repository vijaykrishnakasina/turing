

# Documentation for React Message Board App

## Overview
The Message Board App is a React-based web application that allows users to log in, view, add, edit, and delete messages. The application is structured with React components and utilizes React Router for navigation and React Context for state management.

### Key Features
1. **User Authentication:** Users can log in and out.
2. **Message Board:** Authenticated users can view, add, edit, and delete messages.

### Structure
The application consists of the following main components:
- `App`: The main component that sets up routing and authentication checks.
- `Login`: A component for user login.
- `MessageBoard`: The main component for displaying and managing messages.
- `MessageForm`: A form for adding or editing messages.
- `MessageList`: A component to list all messages.

### Contexts
- `AuthContext`: Manages user authentication state.
- `AppContext`: Manages message board state.

## Components

### `App`
The `App` component integrates the `AuthContext` and sets up routing using React Router. It defines routes for login and the main message board. It also displays error messages if any exist in the authentication context.

### `Login`
The `Login` component allows users to log in by submitting a username and password. It uses the `AuthContext` to manage the login process.

### `MessageBoard`
`MessageBoard` is the primary interface for the message board. It displays the message list and a form for adding or editing messages. It also allows users to log out.

### `MessageForm`
This component provides a form for adding new messages or editing existing ones. It utilizes the `AppContext` to dispatch add or edit actions.

### `MessageList`
Displays a list of messages with options to edit or delete each message based on the user's ownership. It uses the `AppContext` for message operations.

## Contexts

### `AuthContext`
Manages the authentication state of the app. It provides functions for login, logout, and setting error messages. It uses an API call to authenticate users.

### `AppContext`
Manages the state of messages in the app. It includes functions to fetch, add, edit, and delete messages. It uses an API for backend communication.

## API Integration
The application communicates with a backend API for user authentication and message operations. Axios is used for making HTTP requests.

### Authentication Endpoints
- **Login:** POST request to `/login` with username and password.

### Message Endpoints
- **Fetch Messages:** GET request to `/messages`.
- **Add Message:** POST request to `/messages`.
- **Edit Message:** PUT request to `/messages/{id}`.
- **Delete Message:** DELETE request to `/messages/{id}`.

## Styling
The application uses React Bootstrap for styling and a custom CSS file for additional styles. Each component has its dedicated CSS file for specific styling.

## Error Handling
Error handling is implemented in both `AuthContext` and `AppContext`. Errors are displayed in the UI, providing feedback to the user.

## Installation and Setup
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the application: `npm start`.
4. Ensure the backend API server is running.

## Dockerization 
docker build -t messaging-ui .
docker run -p 3000:3000 messaging-ui

## Conclusion
The Message Board App demonstrates a full-featured application using React, React Router, and Context API, along with Axios for API integration. It provides a functional interface for user authentication and message board operations.