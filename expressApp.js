import express from "express";

// B1: Create an Express application
const app = express();
const PORT = 4000;

// B1: Configure JSON parsing middleware
app.use(express.json());

// B1 & B3: Initialize an array containing at least three sample employee task records
let tasks = [
  {
    id: 1,
    taskName: "Develop Login Page",
    assignedTo: "Rahul Sharma",
    status: "Pending",
    priority: "High",
  },
  {
    id: 2,
    taskName: "Create Dashboard",
    assignedTo: "Amit Kumar",
    status: "Completed",
    priority: "Medium",
  },
  {
    id: 3,
    taskName: "Test Website",
    assignedTo: "Priya Sharma",
    status: "Pending",
    priority: "Low",
  },
];

// B2: GET /tasks -> Retrieve all employee tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// B2 & B4: GET /tasks/:id -> Retrieve a specific task by ID using route parameters
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid task ID parameter" });
  }

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(task);
});

// B2 & B4: POST /tasks -> Add a new task (Return HTTP 201)
app.post("/tasks", (req, res) => {
  const { id, taskName, assignedTo, status, priority } = req.body;

  // Validate required fields
  if (
    id === undefined ||
    id === null ||
    !taskName ||
    !assignedTo ||
    !status ||
    !priority
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const numericId = Number(id);
  if (isNaN(numericId)) {
    return res.status(400).json({
      message: "ID must be a valid number",
    });
  }

  // Check if task ID already exists
  const existingTask = tasks.find((t) => t.id === numericId);
  if (existingTask) {
    return res.status(400).json({
      message: "Task ID already exists",
    });
  }

  const newTask = {
    id: numericId,
    taskName: String(taskName).trim(),
    assignedTo: String(assignedTo).trim(),
    status: String(status).trim(),
    priority: String(priority).trim(),
  };

  tasks.push(newTask);

  // Return HTTP 201 Created with message and task object
  res.status(201).json({
    message: "Task added successfully",
    task: newTask,
  });
});

// B2 & B4: PUT /tasks/:id -> Update task details
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid task ID parameter" });
  }

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { taskName, assignedTo, status, priority } = req.body;

  // Validate required fields for update
  if (!taskName || !assignedTo || !status || !priority) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Update existing task details
  task.taskName = String(taskName).trim();
  task.assignedTo = String(assignedTo).trim();
  task.status = String(status).trim();
  task.priority = String(priority).trim();

  res.status(200).json({
    message: "Task updated successfully",
    task: task,
  });
});

// B2 & B4: DELETE /tasks/:id -> Delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid task ID parameter" });
  }

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const [deletedTask] = tasks.splice(index, 1);

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask,
  });
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// B1: Configure application to listen on port 4000
app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
