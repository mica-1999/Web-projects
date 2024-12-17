<?php
// Database configuration
$dsn = "mysql:host=localhost;dbname=digitalsignature;charset=utf8mb4"; // DSN (Data Source Name)
$username = "root";
$password = "";

try {
    // Create a new PDO instance
    $conn = new PDO($dsn, $username, $password);
    
    // Set PDO attributes to handle errors and emulate prepared statements
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    
    // Optionally, you can set default fetch mode to FETCH_ASSOC
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // Handle connection errors
    die("Connection failed: " . $e->getMessage());
}
?>
