Project#2: Equipment Request System
Objective
The goal of this project is to build an Equipment Request System where employees can submit requests for equipment. The process involves multiple departments and requires the signatures of relevant stakeholders:

Requester: The person who is requesting the equipment (must digitally sign the form).
Department Leader: The head of the department where the request originates (must digitally sign).
Provider: The person in charge of providing the equipment (must digitally sign).
The request process ensures that all necessary parties approve the equipment request.

Features
1. User Authentication
Login Page: Users can log in with their credentials.
Register Page: New users can create an account to access the system.
Security Features:
Try/Catch blocks for error handling.
Error Handling for potential issues during login and registration.
Prepared Statements using PDO for secure database interactions.
Input Validation including:
Length validation on user input.
Format validation on email and other fields.
CSRF Tokens to prevent cross-site request forgery.
Session management:
Regenerate session ID on login for security.
Session timeout to log users out after inactivity.
2. Database and Data Handling
Connection to Database: Manages connections to the database and handles multiple form selections.
Fetching Data: Retrieves options for the BCII form (used for equipment requests).
3. Form Validation (In Progress)
BCII Form: A form for submitting equipment requests, with server-side validation in progress to ensure correct data input.
4. Security
Session Management: Manages session timeouts and other session-related security features.
CSRF Token Implementation: Protects against CSRF attacks by using tokens.
File Structure
bash
Copiar código
/Project#2
│
├── assets/              # Static assets such as CSS, images, etc.
├── auth/                # Authentication files (login, register, etc.)
├── data/                # Database connections and data fetching
├── error_log/           # Error log for debugging
├── forms/               # Forms (including BCII)
├── others/              # Miscellaneous files
├── registro/            # Records or logs
├── security/            # Security-related files (CSRF, session management)
Files Explained
auth:

login.php: The login form with authentication logic.
register.php: The registration form for new users.
data:

Handles the database connection and fetching of options for the BCII form.
error_log:

Stores any errors related to the system for debugging.
forms:

Contains the BCII form and its validation.
security:

csrf_token.php: Implements CSRF protection.
session_management.php: Handles session timeouts and security-related session features.
Technologies Used
PHP: For backend development and handling form submissions.
PDO (PHP Data Objects): For secure database interactions.
MySQL: For storing user information and equipment request data.
CSS: For styling the login form and other pages.
JavaScript: For additional client-side validation and interactive features.
Next Steps
Complete BCII form validation.
Implement Equipment Request Signature Flow for multiple department approvals.
Challenges & Learnings
Throughout the development of this project, I have worked on improving my skills in several key areas that are essential for backend development:

Error handling and the use of try/catch blocks in PHP.
Using PDO for database interaction, including prepared statements and parameter binding for security.
Implementing CSRF protection and managing user sessions.
Conclusion
This project has been a great learning experience, especially in applying best practices for secure and efficient PHP development. The goal is to create a robust and user-friendly system that streamlines the equipment request process while ensuring security and validation.

