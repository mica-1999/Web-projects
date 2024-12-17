<?php
// Database connection details
$host = 'localhost';
$dbname = 'digitalsignature';
$username = 'root';
$password = '';

try {
    // Initialize the PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Enable error reporting
} catch (PDOException $e) {
    // Handle connection error
    echo 'Connection failed: ' . $e->getMessage();
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['direcao'])) {
    $direcao = $_POST['direcao'];
	ini_set('error_log', '../error_log/custom-error.log');
	error_log('direcao: ' . $direcao);  // Logs the value to the custom file
    try {
        // Prepare the query to fetch the Secretaria based on the selected Direção
        $stmt = $pdo->prepare("SELECT s.Secretaria 
                               FROM secretarias s 
                               INNER JOIN dir_regional d 
                               ON s.ID_Secretaria = d.ID_Secretaria 
                               WHERE d.Name = :direcao");
        $stmt->bindParam(':direcao', $direcao);
        $stmt->execute();

        // Fetch the result
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo $result['Secretaria'];  // Return the matching Secretaria
        } else {
            echo '';  // No matching Secretaria found
        }
    } catch (PDOException $e) {
        // Handle any database errors
        echo 'Error: ' . $e->getMessage();
    }
} else {
    echo 'Invalid request';  // Handle invalid requests
}
?>
