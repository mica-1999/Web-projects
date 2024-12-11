<?php
session_start();
include 'authentication.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../assets/css/login.css">
</head>
<body>
    <div class="login-container">
        <h1>DRI Access</h1>
        <form action="login.php" method="POST">
            <?php if (isset($error)) { echo '<p class="error">' . htmlspecialchars($error) . '</p>'; } ?>
            
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" required>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" required>
            </div>
            
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="../registro/registro.php">Register here</a></p>
    </div>
</body>
</html>