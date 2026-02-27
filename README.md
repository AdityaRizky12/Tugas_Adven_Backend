 EduCourse App - Backend API Development

This repository contains the backend implementation for the EduCourse App, focusing on building a robust, secure, and scalable RESTful API. This project demonstrates core backend functionalities, including user authentication, secure data handling, and dynamic content management.

 🚀 Key Features

* Secure Authentication & Authorization:** Implements user registration, login, and token-based authorization (JWT) to protect sensitive routes.
* Email Verification System:** Features a verification workflow using tokens to ensure user authenticity during the signup process.
* Dynamic Course Management:** Comprehensive API for retrieving course data with support for advanced query parameters such as searching, category filtering, and sorting.
* Media Assets Handling:** Includes functionality for uploading image files to the server and serving static assets efficiently.
* Robust Error Handling:** Designed with standardized HTTP response codes (e.g., 200 OK, 400 Bad Request, 401 Unauthorized) to ensure a seamless frontend-to-backend integration.

 🛠️ Tech Stack

* Runtime: Node.js
* Framework: Express.js
* Database: [Insert Database, e.g., MySQL / MongoDB]
* API Testing: Postman

 📂 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/signup` | Registers a new user into the database. |
| GET | `/api/verify/:token` | Verifies the user's account via an email token. |
| POST | `/api/login` | Authenticates the user and returns an access token. |
| GET | `/api/courses` | Retrieves the list of courses (supports search, filter, and sort). |
| POST | `/api/upload` | Handles image file uploads to the server. |

 📸 API Testing & Documentation

The API has been rigorously tested using Postman. Below are highlights of the testing process:
* Successful Authentication:** Validated login flows and token generation.
* Data Accuracy:** Ensured that search and filter queries return precise data from the database.
* Edge Case Handling:** Verified that the system correctly rejects duplicate emails and invalid tokens.

## ⚙️ How to Run This Project

1. Clone the repository:
   ```bash
   git clone [https://github.com/AdityaRizky12/Tugas_Adven_Backend.git](https://github.com/AdityaRizky12/Tugas_Adven_Backend.git)

2.Install dependencies:
npm install
3.Configure Environment Variables:
Create a .env file and add your database credentials and secret keys.
4.Start the server:
npm start
