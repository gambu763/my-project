Feature 1: Backend API Setup
Overview

The first feature focused on creating the backend server using Express.js. The goal was to establish a foundation for handling application data and providing endpoints that the frontend could communicate with.

What Was Built
Express server setup
Route structure for applications
Health check endpoint
Application submission endpoint
In-memory storage using a JavaScript array
Endpoints
GET /

Returns a welcome message from the server.

GET /health

Returns the current status of the server.

POST /applications

Accepts application data and stores it in memory.

Skills Learned
Express.js fundamentals
Creating routes
Handling HTTP requests and responses
Working with JSON data
Organizing backend files and folders
Outcome

A functioning backend capable of receiving and storing application submissions temporarily.   

Feature 2: Application Form
Overview

The second feature focused on building a React form that allows users to submit application information. This was the first connection between the frontend and backend.

What Was Built
React application form
Controlled form inputs using useState
Dropdown menus
Form validation
Fetch API integration
Submission of data to the backend
Form Fields
Full Name
Email Address
Phone Number
Program Selection
Address
Additional applicant information
Skills Learned
React state management with useState
Handling form inputs
Fetch API
Async and await
Sending POST requests
Working with user input
Outcome

Users can complete an application form and submit their information directly to the backend.  

Feature 3: Admin Dashboard
Overview

The third feature introduced an admin dashboard where submitted applications can be viewed. This provided a way to verify that application data was being successfully stored and retrieved.

What Was Built
Admin page
Application list view
Backend GET endpoint integration
Dynamic rendering of application data
Features
View all submitted applications
Display applicant details
Automatically update when new applications are submitted
Skills Learned
React useEffect
Fetching data from an API
Rendering lists with map()
Working with backend data
Basic admin interface design
Outcome

Administrators can view all submitted applications through a dedicated dashboard.

Feature 4: MongoDB Atlas Integration
Overview

The fourth feature focused on moving application storage from temporary in-memory storage to a cloud database using MongoDB Atlas. This allows application data to persist even when the server restarts.

What Was Built
MongoDB Atlas cluster connection
Environment variable configuration
Mongoose integration
Secure database connection
Technologies Used
MongoDB Atlas
Mongoose
dotenv
Express.js
Skills Learned
Cloud database setup
Database authentication
Environment variables
MongoDB connection strings
Debugging database connectivity issues
Outcome

The backend is successfully connected to MongoDB Atlas and ready to store application data permanently.

