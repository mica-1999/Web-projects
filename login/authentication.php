<?php
session_start();  // Start the session to store user data
require '../php-db/config.php';  // Include the database connection file

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Validate inputs
    if (empty($username) || empty($password)) {
        $error = "Please fill in all fields.";
    } else {
        try {
            // Sanitize user inputs
            $username = htmlspecialchars(trim($username)); // Remove spaces and sanitize HTML characters
            $password = trim($password); // Trim whitespace from password

            // Prepare SQL query to fetch the user from the database
            $stmt = $conn->prepare("SELECT id, username, password_hash FROM users WHERE username = :username");
            $stmt->bindParam(':username', $username);  // Bind the parameter to the prepared statement

            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                // If user exists, fetch user data
                // Verify the hashed password
                if (password_verify($password, $result['password_hash'])) {
                    // If password is correct, start the session and set the user session variable
                    $_SESSION['user_id'] = $result['id'];
                    $_SESSION['username'] = $result['username'];

                    // Regenerate session ID to prevent session fixation attacks
                    session_regenerate_id(true);

                    // Redirect to a protected page
                    header("Location: ../form-bcii.php");
                    exit();
                } else {
                    $error = "Invalid password.";
                    sleep(1); // Delay to prevent brute force attacks
                }
            } else {
                $error = "No user found with that username.";
                sleep(1); // Delay to prevent brute force attacks
            }

            // Close the prepared statement (optional, as PHP will clean this up automatically)
            $stmt = null;
        } catch (PDOException $e) {
            // Handle any errors that occur during the process
            $error = "An error occurred. Please try again later.";
        }
    }
}

// Close the database connection (optional, as PDO will handle it automatically when the object is destroyed)
$conn = null;
?>

