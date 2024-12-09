<?php
require '../data/config.php';  // Include the database connection file

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validate inputs
    if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
        $error = "Please fill in all fields.";
    } elseif ($password !== $confirm_password) {
        $error = "Passwords do not match.";
    }  elseif (strlen($username) < 3 || strlen($username) > 50) {
        $error = "Username must be between 3 and 50 characters.";
    } elseif (strlen($email) < 5 || strlen($email) > 100) {
        $error = "Email must be between 5 and 100 characters.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Please provide a valid email address."; // Email format validation
    } elseif (strlen($password) < 8) {
        $error = "Password must be at least 8 characters.";
    } elseif (!preg_match('/[A-Za-z]/', $password) || !preg_match('/\d/', $password)) {
        $error = "Password must contain both letters and numbers."; // Password strength validation
    } else {
        try {
            // Sanitize user inputs
            $username = htmlspecialchars(trim($username));
            $email = htmlspecialchars(trim($email));
            $password = trim($password);

            // Check if the username or email already exists
            $stmt = $conn->prepare("SELECT id FROM users WHERE username = :username OR email = :email");
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                $error = "Username or email already taken.";
            } else {
                // Hash the password
                $password_hash = password_hash($password, PASSWORD_BCRYPT);

                // Insert the new user into the database
                $stmt = $conn->prepare("INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password_hash)");
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':password_hash', $password_hash);

                if ($stmt->execute()) {
                    // Registration successful, redirect to login page
                    header("Location: ../auth/login.php");
                    exit();
                } else {
                    $error = "An error occurred. Please try again later.";
                }
            }
        } catch (PDOException $e) {
            // Handle any errors that occur during the process
            $error = "An error occurred. Please try again later.";
        }
    }
}

// Close the database connection (optional, as PDO will handle it automatically when the object is destroyed)
$conn = null;
?>
