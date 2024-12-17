<?php
// Database connection details
$host = 'localhost';
$dbname = 'digitalsignature';  // Your database name
$username = 'root';  // Your database username
$password = '';  // Your database password

try {
    // Initialize the PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Enable error reporting
} catch (PDOException $e) {
    // Handle connection error
    echo 'Connection failed: ' . $e->getMessage();
    exit();
}

// Check if the request method is POST and if 'code' is set in the POST data
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['code'])) {
    $itemCode = $_POST['code'];

    // Log the item code for debugging purposes
    ini_set('error_log', '../error_log/custom-error.log');
    error_log('Item code: ' . $itemCode);  // Logs the value to the custom file

    try {
        // Prepare the query to fetch item information based on the item code
        $stmt = $pdo->prepare("SELECT item_name, stock FROM items WHERE item_code = :code");
        $stmt->bindParam(':code', $itemCode, PDO::PARAM_INT);  // Bind the item code parameter
        $stmt->execute();

        // Fetch the result
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            // Return the matching item name and stock as a JSON response
            echo json_encode([
                'success' => true,
                'item_name' => $result['item_name'],
                'stock' => $result['stock']
            ]);
        } else {
            // Return an empty response if no matching item is found
            echo json_encode(['success' => false]);
        }
    } catch (PDOException $e) {
        // Handle any database errors
        echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
    }
} else {
    // Handle invalid requests (if 'code' is not set)
    echo json_encode(['error' => 'Invalid request or missing item code']);
}
?>
