<?php
// Include the configuration file to establish the database connection
session_start(); 
include '../security/CSRF-token.php';
include '../security/session_management.php';
require '../data/config.php';

// Include the data access file to fetch secretarias
include '../data/fetch-secretarias.php';
include '../data/fetch-direcoes.php';

// Fetch the secretarias options
$secretarias_options = fetchSecretarias($conn);
$direcao_options = fetchDirecao($conn);

// You don't need to explicitly close the connection, PDO handles it automatically when the script ends
// $conn->close();


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Requisition Form</title>
    <link rel="stylesheet" href="../assets/css/form-css.css">
	<link rel="stylesheet" href="../assets/css/modal.css">
</head>
<body>
<!-- Modal HTML -->
<div id="timeoutModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" onclick="closeModal()">&times;</span>
        <h2>Session Timeout</h2>
        <p>Your session has expired due to inactivity. You will be redirected to the login page.</p>
    </div>
</div>
    <div class="container">
        <h1>BCII NEW FORM(IN PROGRESS)  </h1>
        <form method="POST" action="validar-bcii.php">
		    <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
            <div class="form-section">
                <h2>Requestor Information</h2>
                <div class="form-group">
                    <label>Centro de Custo:</label>
                    <input type="text" name="centro_custo" required>
                </div>
                <div class="form-group">
                    <label>Secretaria:</label>
                    <select name="secretaria[]" id="secretaria" multiple required>
                        <?php
                            echo $secretarias_options;
                        ?>
                    </select>
                </div>
                <div class="form-group">
                    <label>Direção:</label>
                    <select name="direcao[]" id="direcao" multiple required>
                        <?php
                            echo $direcao_options;
                        ?>
                    </select>
                </div>
                <div class="form-group">
                    <label>Date:</label>
                    <input type="date" name="date" required>
                </div>
                <div class="form-group">
                    <label>Requisição nº:</label>
                    <input type="text" name="requisicao_no" required>
                </div>
                <div class="form-group">
                    <label>Bens de Capital:</label>
                    <input type="checkbox" name="bens_capital">
                </div>
                <div class="form-group">
                    <label>Bens de Consumo Inventariáveis:</label>
                    <input type="checkbox" name="bens_consumo">
                </div>
                <div class="form-group">
                    <label>Código dos Bens:</label>
                    <input type="text" name="codigo_bens" required>
                </div>
                <div class="form-group">
                    <label>Description:</label>
                    <textarea name="description" required></textarea>
                </div>
                <div class="form-group">
                    <label>Quantity:</label>
                    <input type="number" name="quantity_requested" required>
                </div>
                <div class class="form-group">
                    <label>Destiny Location:</label>
                    <input type="text" name="destiny_location" required>
                </div>
                <div class="form-group">
                    <label>Reason:</label>
                    <textarea name="reason" required></textarea>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
	
	
<script>
	var timeoutDuration = 5*60; // Session timeout in seconds

	// Get last activity time from PHP session and pass it to JavaScript
	var lastActivityTime = <?php echo isset($_SESSION['last_activity']) ? $_SESSION['last_activity'] : time(); ?>;

	// Function to check if session has expired
	function checkSessionTimeout() {
		var currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
		var inactiveTime = currentTime - lastActivityTime; // Calculate time since last activity

		if (inactiveTime > timeoutDuration) {
			// If session has expired, redirect to login page
			window.location.href = "../auth/login.php";  // Redirect to login page
		}
	}

	// Check session timeout every 5 seconds
	setInterval(checkSessionTimeout, 5000);

	// Function to show the modal
	function showModal() {
		var modal = document.getElementById("timeoutModal");
		modal.style.display = "block";
		
		// Automatically redirect after a few seconds
		setTimeout(function() {
			window.location.href = "../auth/login.php"; // Redirect to login page
		}, 5000); // Wait 5 seconds before redirect
	}

	// Function to close the modal manually (if needed)
	function closeModal() {
		var modal = document.getElementById("timeoutModal");
		modal.style.display = "none";
	}

	// Modify checkSessionTimeout to show the modal instead of redirecting immediately
	function checkSessionTimeout() {
		var currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
		var inactiveTime = currentTime - lastActivityTime; // Calculate time since last activity

		if (inactiveTime > timeoutDuration) {
			showModal(); // Show the modal
		}
	}
</script>
</body>
</html>

