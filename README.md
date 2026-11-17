# MT1 LAB EXAMINATION - Employee Task Management Web Application

**Subject:** Full Stack Development – Node.js Lab Examination  
**Technologies:** Node.js (ES Modules), HTTP Module, FS Module, Express.js  
**Database:** In-Memory JavaScript Array (as specified in guidelines)

---

## 📌 Project Overview

This repository contains the complete implementation of the **Employee Task Management Web Application** developed in accordance with the MT1 Lab Examination guidelines. The application demonstrates:
1. **Part A:** Core Node.js built-in `http` module server, custom request routing, HTTP method handling (GET & POST), static file serving using the built-in `fs` module, and error handling.
2. **Part B:** Production-grade RESTful API using **Express.js** with full CRUD operations (GET, POST, PUT, DELETE), JSON request body parsing, route parameters, input validation, and proper HTTP status codes.

---

## 📂 Project Structure

```
MT1-LABEXAM/
│
├── package.json          # Node.js project manifest (ES Modules configured)
├── httpServer.js         # Part A: Built-in HTTP and FS module server (Port 3000)
├── expressApp.js         # Part B: Express.js REST API server (Port 4000)
├── testApp.js            # Automated test suite validating all exam requirements
├── public/
│   └── index.html        # Static HTML file served via FS module on /home
├── screenshots/          # Output and verification screenshots
│   └── .gitkeep
└── README.md             # Project documentation and API testing guide
```

---

## 🚀 Getting Started & Setup

### 1. Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (Node Package Manager)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Devansh0Tyagi-Codes/MT1-LABEXAM.git
cd MT1-LABEXAM
npm install
```

---

## 🖥️ Running the Applications

Both applications run independently on their designated ports as required by the examination guidelines.

### Step 1: Start the HTTP Server (Part A - Port 3000)
In terminal 1:
```bash
npm run start:http
# or
node httpServer.js
```
**Expected Console Output:**
```
HTTP Server running at http://localhost:3000
```

#### Test URLs for HTTP Server:
| Method | Route | Description | Expected Output |
| :--- | :--- | :--- | :--- |
| `GET` | `http://localhost:3000/` | Welcome Page | HTML Welcome Message with navigation links |
| `GET` | `http://localhost:3000/home` | Static File Serving | `public/index.html` served using `fs.readFile` |
| `GET` | `http://localhost:3000/tasks` | Retrieve All Tasks | List of employee tasks in JSON format |
| `GET` | `http://localhost:3000/about` | Application Info | HTML page detailing application info |
| `POST`| `http://localhost:3000/add-task`| Add New Task | Accepts JSON body: `{ id, taskName, assignedTo, status }` |

---

### Step 2: Start the Express Application (Part B - Port 4000)
In terminal 2:
```bash
npm run start:express
# or
node expressApp.js
```
**Expected Console Output:**
```
Express Server running at http://localhost:4000
```

---

## 📡 Part B: Express.js REST API Specification

### Data Structure:
Each employee task contains the following properties:
```json
{
  "id": 1,
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Pending",
  "priority": "High"
}
```

### Endpoints Table:
| HTTP Method | Endpoint | Functionality | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Retrieve all employee tasks | `200 OK` |
| `GET` | `/tasks/:id` | Retrieve a specific task by ID | `200 OK` / `404 Not Found` |
| `POST` | `/tasks` | Add a new employee task | `201 Created` / `400 Bad Request` |
| `PUT` | `/tasks/:id` | Update an existing task's details | `200 OK` / `404 Not Found` |
| `DELETE` | `/tasks/:id` | Remove a task by ID | `200 OK` / `404 Not Found` |

---

## 🧪 API Testing (EchoAPI / Postman / cURL)

### 1. GET All Tasks
- **URL:** `http://localhost:4000/tasks`
- **Method:** `GET`
- **Response:**
```json
[
  {
    "id": 1,
    "taskName": "Develop Login Page",
    "assignedTo": "Rahul Sharma",
    "status": "Pending",
    "priority": "High"
  },
  {
    "id": 2,
    "taskName": "Create Dashboard",
    "assignedTo": "Amit Kumar",
    "status": "Completed",
    "priority": "Medium"
  },
  {
    "id": 3,
    "taskName": "Test Website",
    "assignedTo": "Priya Sharma",
    "status": "Pending",
    "priority": "Low"
  }
]
```

### 2. GET Task by ID
- **URL:** `http://localhost:4000/tasks/1`
- **Method:** `GET`
- **Response (200 OK):**
```json
{
  "id": 1,
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Pending",
  "priority": "High"
}
```

### 3. POST Add New Task
- **URL:** `http://localhost:4000/tasks`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "id": 4,
  "taskName": "Develop REST API",
  "assignedTo": "Amit Kumar",
  "status": "Pending",
  "priority": "Medium"
}
```
- **Response (201 Created):**
```json
{
  "message": "Task added successfully",
  "task": {
    "id": 4,
    "taskName": "Develop REST API",
    "assignedTo": "Amit Kumar",
    "status": "Pending",
    "priority": "Medium"
  }
}
```

### 4. PUT Update Task
- **URL:** `http://localhost:4000/tasks/1`
- **Method:** `PUT`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "taskName": "Develop Login Page",
  "assignedTo": "Rahul Sharma",
  "status": "Completed",
  "priority": "High"
}
```
- **Response (200 OK):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "taskName": "Develop Login Page",
    "assignedTo": "Rahul Sharma",
    "status": "Completed",
    "priority": "High"
  }
}
```

### 5. DELETE Task
- **URL:** `http://localhost:4000/tasks/1`
- **Method:** `DELETE`
- **Response (200 OK):**
```json
{
  "message": "Task deleted successfully",
  "task": {
    "id": 1,
    "taskName": "Develop Login Page",
    "assignedTo": "Rahul Sharma",
    "status": "Completed",
    "priority": "High"
  }
}
```

---

## ⚡ Running Automated Verification Test
You can run the built-in automated test suite to verify 100% of the examination requirements:
```bash
npm test
```
All 21 requirement checks will pass with full validation.

---

## 📸 Submission Checklist
- [x] Complete project repository named `MT1-LABEXAM`
- [x] ES Modules enabled in `package.json`
- [x] Built-in `http` & `fs` module server in `httpServer.js` (Port 3000)
- [x] Static HTML file served from `public/index.html` on `/home`
- [x] Built-in error handling (404 and 400 validation)
- [x] Express.js REST API with CRUD operations in `expressApp.js` (Port 4000)
- [x] Screenshots folder organized with task outputs
- [x] Git commit history structured module-by-module with descriptive commit messages
