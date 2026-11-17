/**
 * Automated Test Suite for MT1-LABEXAM
 * Validates Part A (HTTP Module & FS Module) and Part B (Express.js REST API)
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("=================================================");
console.log("     MT1 LAB EXAMINATION - TEST SUITE           ");
console.log("=================================================\n");

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`\x1b[32m✔ PASS\x1b[0m: ${message}`);
    passedTests++;
  } else {
    console.error(`\x1b[31m✘ FAIL\x1b[0m: ${message}`);
  }
}

// ---------------------------------------------------------------------------
// TEST PART A: HTTP Server & FS Module Functionality
// ---------------------------------------------------------------------------
console.log("--- PART A: HTTP Module & Static File Serving (FS) ---");

// Check public/index.html exists
const indexPath = path.join(__dirname, "public", "index.html");
assert(fs.existsSync(indexPath), "public/index.html exists");

const indexContent = fs.readFileSync(indexPath, "utf8");
assert(indexContent.includes("Employee Task Management"), "index.html contains system title");
assert(indexContent.includes("<!DOCTYPE html>"), "index.html has valid HTML5 structure");

// Check httpServer.js syntax and contents
const httpServerCode = fs.readFileSync(path.join(__dirname, "httpServer.js"), "utf8");
assert(httpServerCode.includes("http.createServer"), "httpServer.js uses http.createServer()");
assert(httpServerCode.includes("fs.readFile"), "httpServer.js uses fs.readFile for static serving");
assert(httpServerCode.includes("listen(3000") || httpServerCode.includes("PORT = 3000"), "httpServer.js listens on port 3000");
assert(httpServerCode.includes("/tasks"), "httpServer.js defines /tasks route");
assert(httpServerCode.includes("/about"), "httpServer.js defines /about route");
assert(httpServerCode.includes("/home"), "httpServer.js defines /home route");
assert(httpServerCode.includes("/add-task"), "httpServer.js defines /add-task route");

// ---------------------------------------------------------------------------
// TEST PART B: Express.js REST API Functionality
// ---------------------------------------------------------------------------
console.log("\n--- PART B: Express.js REST API ---");

const expressCode = fs.readFileSync(path.join(__dirname, "expressApp.js"), "utf8");
assert(expressCode.includes("express()"), "expressApp.js initializes Express application");
assert(expressCode.includes("express.json()"), "expressApp.js configures express.json() middleware");
assert(expressCode.includes("listen(4000") || expressCode.includes("PORT = 4000"), "expressApp.js listens on port 4000");

// Verify CRUD endpoints defined in expressApp.js
assert(expressCode.includes("app.get(\"/tasks\""), "Express implements GET /tasks");
assert(expressCode.includes("app.get(\"/tasks/:id\""), "Express implements GET /tasks/:id");
assert(expressCode.includes("app.post(\"/tasks\""), "Express implements POST /tasks");
assert(expressCode.includes("app.put(\"/tasks/:id\""), "Express implements PUT /tasks/:id");
assert(expressCode.includes("app.delete(\"/tasks/:id\""), "Express implements DELETE /tasks/:id");

// Verify required status codes
assert(expressCode.includes("status(201)"), "Express returns HTTP 201 for task creation");
assert(expressCode.includes("status(404)"), "Express returns HTTP 404 for task not found");
assert(expressCode.includes("status(400)"), "Express returns HTTP 400 for validation errors");

console.log("\n=================================================");
console.log(`Results: ${passedTests}/${totalTests} tests passed (${Math.round((passedTests/totalTests)*100)}%)`);
console.log("=================================================");

if (passedTests === totalTests) {
  console.log("\x1b[32mAll core requirements successfully verified!\x1b[0m\n");
} else {
  process.exit(1);
}
