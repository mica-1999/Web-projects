<?php 
$timeout_duration = 5*60; // 5 minutes in seconds

// Check if the session has expired based on the last activity time
if (isset($_SESSION['last_activity'])) {
    $inactive_time = time() - $_SESSION['last_activity'];

    if ($inactive_time > $timeout_duration) {
        // If session has expired, destroy the session and redirect to login page
        session_unset();  // Remove all session variables
        session_destroy(); // Destroy the session
        exit();
    }
}

// Update the last activity time to the current time
$_SESSION['last_activity'] = time();
?>
