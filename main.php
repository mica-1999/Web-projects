<?php
// Include database configuration file
include 'php-db/config.php';

// Your main page code here
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Signing</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h1>Sign Documents</h1>
        <form id="uploadForm">
            <input type="file" id="document" name="document" accept=".pdf,.doc,.docx" required>
            <button type="submit">Upload Document</button>
        </form>
        <div id="documentList"></div>
    </div>
    <script src="javascript/doc-upload.js"></script>
</body>
</html>