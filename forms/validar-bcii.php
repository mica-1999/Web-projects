<?php // Check if the form is submitted and if the CSRF token is valid

session_start();  // Start the session
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['csrf_token']) && $_POST['csrf_token'] === $_SESSION['csrf_token']) {
        // CSRF token is valid, process the form
        // Proceed with the form processing
        // Example: check login credentials or other form data
		echo "it entered here";
		// After processing the form, unset the CSRF token
		unset($_SESSION['csrf_token']);
		header("Location: ../auth/login.php"); // Change this to the page you want to redirect to
		exit(); // Make sure the script stops here

    } else {
        // CSRF token is invalid
        die("Invalid CSRF token. Request rejected.");
    }
}
?>