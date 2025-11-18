# Portfolio & Blog API
A secure, scalable, and production-ready RESTful API built with Node.js, Express, and MongoDB Atlas. This API powers a personal portfolio (managing projects, contact messages) and a full-featured blog (with user authentication, posts, and comments), designed to integrate seamlessly with a front-end application.


## Project Overview
This API serves as the back-end "brain" for two core use cases:
1. **Personal Portfolio Management**: Store, retrieve, update, and delete portfolio projects (e.g., side projects, freelance work) and manage incoming contact form submissions.
2. **Blog Functionality**: Support user registration/login, blog post creation/editing (author-only access), and comment management—all with secure authentication and authorization.

The API follows the **MVC (Model-View-Controller)** pattern, uses **JWT for authentication**, **bcrypt for password hashing**, and is deployed to a live cloud platform for public access.


## Tech Stack
| Category               | Tools/Libraries                                                                 |
|-------------------------|---------------------------------------------------------------------------------|
| Back-End Framework      | Node.js, Express.js                                                             |
| Database                | MongoDB Atlas (cloud-hosted), Mongoose (ODM for schema validation/relationships)|
| Authentication          | JSON Web Tokens (JWT), bcrypt (password hashing)                                |
| Security                | Helmet (secure HTTP headers), dotenv (environment variable management)           |
| Development/Testing     | Postman/Thunder Client (API testing), Git (version control)                     |
| Deployment              | Render (cloud hosting)                                                          |
| Middleware              | CORS (cross-origin resource sharing), Express JSON parser, custom error handling|


## Prerequisites for Local Development
If you want to run this API locally (for testing or customization), ensure you have the following installed:
- Node.js (v16+ LTS recommended; download from [nodejs.org](https://nodejs.org/))
- npm (included with Node.js)
- MongoDB Atlas account (to create a database cluster; [sign up here](https://www.mongodb.com/cloud/atlas/register))
- A code editor (e.g., Visual Studio Code)
- API testing tool (e.g., Postman, Thunder Client for VS Code)


## Local Setup Instructions
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/portfolio-blog-api.git
   cd portfolio-blog-api
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Configure Environment Variables**  
   Create a `.env` file in the root directory with the following variables (replace placeholders):  
   ```env
   # Server Configuration
   PORT=5000

   # MongoDB Atlas Connection (replace with your cluster credentials)
  mongodb+srv://zhangtongbin:qcmdGqJiXitXb8Ly@cluster0.idibza8.mongodb.net/?appName=Cluster0

   # JWT Security (generate a random string for this, e.g., using https://generate-secret.now.sh/32)
   JWT_SECRET=zhangzhangzhang999
   ```

4. **Start the Local Server**  
   ```bash
   node server.js
   ```
   - The server will run at `http://localhost:5000`
   - Confirm success with the terminal message: `MongoDB Connected: [your-cluster-host]` and `Server running on port 5000`


## API Endpoints Documentation
All endpoints return **JSON responses**. For protected routes, include a `Bearer Token` in the `Authorization` header (obtained via user login).


### 1. User Authentication Endpoints
| Method | Endpoint               | Description                                  | Access       | Request Body                                  | Response Example                                                                 |
|--------|------------------------|----------------------------------------------|--------------|-----------------------------------------------|----------------------------------------------------------------------------------|
| POST   | `/api/users/register`  | Create a new user (admin/blog author)         | Public       | `{ "username": "johndoe", "email": "john@example.com", "password": "SecurePass123" }` | `{ "_id": "60d21b4667d0d8992e610c85", "username": "johndoe", "email": "john@example.com", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }` |
| POST   | `/api/users/login`     | Authenticate user & return JWT                | Public       | `{ "email": "john@example.com", "password": "SecurePass123" }` | `{ "_id": "60d21b4667d0d8992e610c85", "username": "johndoe", "email": "john@example.com", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }` |


### 2. Portfolio Project Endpoints
| Method | Endpoint               | Description                                  | Access       | Request Body/Params                           | Response Example                                                                 |
|--------|------------------------|----------------------------------------------|--------------|-----------------------------------------------|----------------------------------------------------------------------------------|
| GET    | `/api/projects`        | Get all portfolio projects                    | Public       | None                                          | `[ { "_id": "60d21b4667d0d8992e610c86", "title": "E-Commerce App", "description": "A full-stack e-commerce site...", "imageUrl": "https://example.com/img.jpg", "repoUrl": "https://github.com/...", "liveUrl": "https://example.com", "user": "60d21b4667d0d8992e610c85" }, ... ]` |
| GET    | `/api/projects/:id`    | Get a single project by ID                    | Public       | `:id` (project MongoDB ID, e.g., `60d21b4667d0d8992e610c86`) | `{ "_id": "60d21b4667d0d8992e610c86", "title": "E-Commerce App", "description": "A full-stack e-commerce site...", "imageUrl": "https://example.com/img.jpg", "repoUrl": "https://github.com/...", "liveUrl": "https://example.com", "user": "60d21b4667d0d8992e610c85" }` |
| POST   | `/api/projects`        | Create a new portfolio project                | Protected    | `{ "title": "Weather App", "description": "A React-based weather app...", "imageUrl": "https://example.com/weather.jpg", "repoUrl": "https://github.com/...", "liveUrl": "https://weather-app.example.com" }` | `{ "_id": "60d21b4667d0d8992e610c87", "title": "Weather App", "description": "A React-based weather app...", "imageUrl": "https://example.com/weather.jpg", "repoUrl": "https://github.com/...", "liveUrl": "https://weather-app.example.com", "user": "60d21b4667d0d8992e610c85" }` |
| PUT    | `/api/projects/:id`    | Update an existing project                    | Protected    | `:id` (project ID) + Body (same as POST, optional fields) | `{ "_id": "60d21b4667d0d8992e610c87", "title": "Weather App (Updated)", "description": "A React-based weather app with new features...", "imageUrl": "https://example.com/weather.jpg", "repoUrl": "https://github.com/...", "liveUrl": "https://weather-app.example.com", "user": "60d21b4667d0d8992e610c85" }` |
| DELETE | `/api/projects/:id`    | Delete a project                              | Protected    | `:id` (project ID)                            | `{ "message": "Project removed" }`                                                |


### 3. Blog Post Endpoints
| Method | Endpoint               | Description                                  | Access               | Request Body/Params                           | Response Example                                                                 |
|--------|------------------------|----------------------------------------------|----------------------|-----------------------------------------------|----------------------------------------------------------------------------------|
| GET    | `/api/blog`            | Get all blog posts (with author usernames)   | Public               | None                                          | `[ { "_id": "60d21b4667d0d8992e610c88", "title": "Getting Started with Node.js", "content": "Node.js is a JavaScript runtime...", "author": { "_id": "60d21b4667d0d8992e610c85", "username": "johndoe" }, "createdAt": "2024-05-20T12:00:00.000Z", "updatedAt": "2024-05-20T12:00:00.000Z" }, ... ]` |
| GET    | `/api/blog/:id`        | Get a single blog post (with author + comments) | Public           | `:id` (blog post ID)                          | `{ "_id": "60d21b4667d0d8992e610c88", "title": "Getting Started with Node.js", "content": "Node.js is a JavaScript runtime...", "author": { "_id": "60d21b4667d0d8992e610c85", "username": "johndoe" }, "comments": [ { "_id": "60d21b4667d0d8992e610c89", "body": "Great post!", "author": { "_id": "60d21b4667d0d8992e610c85", "username": "johndoe" }, "createdAt": "2024-05-20T13:00:00.000Z" } ], "createdAt": "2024-05-20T12:00:00.000Z", "updatedAt": "2024-05-20T12:00:00.000Z" }` |
| POST   | `/api/blog`            | Create a new blog post                       | Protected            | `{ "title": "Express.js Best Practices", "content": "Here are my top tips for using Express.js..." }` | `{ "_id": "60d21b4667d0d8992e610c90", "title": "Express.js Best Practices", "content": "Here are my top tips for using Express.js...", "author": "60d21b4667d0d8992e610c85", "createdAt": "2024-05-21T10:00:00.000Z", "updatedAt": "2024-05-21T10:00:00.000Z" }` |
| PUT    | `/api/blog/:id`        | Update a blog post (author-only)             | Protected (Author)   | `:id` (blog post ID) + Body (same as POST, optional fields) | `{ "_id": "60d21b4667d0d8992e610c90", "title": "Express.js Best Practices (2024)", "content": "Updated tips for 2024...", "author": { "_id": "60d21b4667d0d8992e610c85", "username": "johndoe" }, "createdAt": "2024-05-21T10:00:00.000Z", "updatedAt": "2024-05-21T11:00:00.000Z" }` |
| DELETE | `/api/blog/:id`        | Delete a blog post (author-only)             | Protected (Author)   | `:id` (blog post ID)                            | `{ "message": "Blog post removed" }`                                             |


### 4. Blog Comment Endpoints
| Method | Endpoint                       | Description                                  | Access       | Request Body/Params                           | Response Example                                                                 |
|--------|--------------------------------|----------------------------------------------|--------------|-----------------------------------------------|----------------------------------------------------------------------------------|
| GET    | `/api/blog/:postId/comments`   | Get all comments for a specific blog post    | Public       | `:postId` (blog post ID)                      | `[ { "_id": "60d21b4667d0d8992e610c89", "body": "Great post!", "author": { "_id": "60d21b4667d0d8992e610c85", "username": "johndoe" }, "post": "60d21b4667d0d8992e610c88", "createdAt": "2024-05-20T13:00:00.000Z", "updatedAt": "2024-05-20T13:00:00.000Z" }, ... ]` |
| POST   | `/api/blog/:postId/comments`   | Add a comment to a blog post                 | Protected    | `:postId` (blog post ID) + `{ "body": "This helped me a lot!" }` | `{ "_id": "60d21b4667d0d8992e610c91", "body": "This helped me a lot!", "author": "60d21b4667d0d8992e610c85", "post": "60d21b4667d0d8992e610c88", "createdAt": "2024-05-21T14:00:00.000Z", "updatedAt": "2024-05-21T14:00:00.000Z" }` |


### 5. Portfolio Contact Endpoint
| Method | Endpoint               | Description                                  | Access       | Request Body                                  | Response Example                                                                 |
|--------|------------------------|----------------------------------------------|--------------|-----------------------------------------------|----------------------------------------------------------------------------------|
| POST   | `/api/contact`         | Submit a contact form message                 | Public       | `{ "name": "Jane Smith", "email": "jane@example.com", "message": "I'd like to hire you for a project!" }` | `{ "message": "Message sent successfully", "data": { "_id": "60d21b4667d0d8992e610c92", "name": "Jane Smith", "email": "jane@example.com", "message": "I'd like to hire you for a project!", "createdAt": "2024-05-22T09:00:00.000Z", "updatedAt": "2024-05-22T09:00:00.000Z" } }` |


## Error Handling
All errors return a consistent JSON format with a `message` and appropriate HTTP status code:
- **400 Bad Request**: Invalid input (e.g., missing required fields, duplicate username/email)  
  `{ "message": "User already exists" }`
- **401 Unauthorized**: Missing/invalid JWT token  
  `{ "message": "Not authorized, no token" }`
- **403 Forbidden**: User not allowed to perform action (e.g., editing another author’s post)  
  `{ "message": "Not authorized to update this post" }`
- **404 Not Found**: Resource not found (e.g., project/blog post with invalid ID)  
  `{ "message": "Project not found" }`
- **500 Internal Server Error**: Server-side issues (e.g., database connection failure)  
  `{ "message": "Failed to connect to MongoDB", "stack": "..." }` (stack trace only in development)


## Deployment Notes
- **Render Setup**: When deploying to Render, ensure the following:
  1. Set the **Build Command** to `npm install`
  2. Set the **Start Command** to `node server.js`
  3. Add all `.env` variables (PORT, MONGO_URI, JWT_SECRET) in the Render dashboard under "Environment Variables"
- **MongoDB Atlas IP Access**: To allow Render to connect to your MongoDB cluster, add `0.0.0.0/0` to your Atlas cluster’s IP access list (temporarily for deployment; restrict to Render’s IPs later for security).


## License
This project is for educational purposes as part of the "Web Data Management and Application – The Back-End Engine" course capstone. All rights reserved.