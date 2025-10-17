# Overview of Your Approach
This React frontend provides user authentication with sign-up and login pages. Once logged in, users can navigate to the Tasks page to perform CRUD operations on tasks with pagination support to browse pages. The header displays the user's email and a logout button for session management. The app efficiently manages UI state using Context API and performs backend requests with Axios. React Router handles navigation throughout the app, while Tailwind CSS and React Icons provide styling and iconography.

# Tools, Technologies, or Libraries Used
React.js for building UI components

Tailwind CSS for utility-first styling

React Icons for scalable icon components

Context API for state management

Axios for HTTP requests

React Router for client-side routing

# Setup / Run Instructions
Docker:

Build the image: docker build -t my-frontend-dev .

Run the container: docker run -d -p 3000:3000 my-frontend-dev

Local Development:

Run locally with: npm run start