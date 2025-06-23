# Express.js + PostgreSQL CRUD API

This is a simple Express.js REST API that performs basic CRUD operations on a PostgreSQL database.

## ✅ Features

- Connects to a PostgreSQL database
- CRUD operations on a `users` table
- Basic error handling
- JSON-based API

## 🧱 Database Schema

Run this SQL in your PostgreSQL client:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  age INTEGER
);


## 🔌 How to Test the API with Postman

Postman is a tool that allows you to interact with APIs by sending HTTP requests. Follow the steps below to test this Express.js + PostgreSQL CRUD API.

### 📥 Step 1: Install Postman

If you don't have Postman installed, download it from [https://www.postman.com/downloads](https://www.postman.com/downloads) and install it on your system.

---

### 🚀 Step 2: Start the API Server

Make sure your PostgreSQL server is running, then start the Express.js server:

```bash
node index.js


Step 3: Test Each API Endpoint in Postman
a. Get All Users
Method: GET
URL: http://localhost:3000/users
What it does: Fetches all user records from the database.

b. Get a Specific User
Method: GET
URL: http://localhost:3000/users/1
What it does: Fetches the user with ID 1. Replace 1 with any existing user ID.

c. Create a New User
Method: POST
URL: http://localhost:3000/users
Headers: Content-Type: application/json
Body (raw → JSON):
What it does: Adds a new user to the database.

d. Update an Existing User
Method: PUT
URL: http://localhost:3000/users/1
Headers: Content-Type: application/json
Body (raw → JSON):
What it does: Updates the user with ID 1. Replace the ID and data as needed.

e. Delete a User
Method: DELETE
URL: http://localhost:3000/users/1
What it does: Deletes the user with ID 1.