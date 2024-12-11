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
    <title>BCII Request Form</title>
    <link rel="stylesheet" href="../assets/css/styles-form.css">
	<link rel="stylesheet" href="../assets/css/modal.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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


    <div class="form-container">
        <div class="info-section">
    <h1 class="title">PEDIDOS BCII</h1>

    <h3 class="equipment">Informações</h3>
    <div class="lign-well">
        <p class="form-description">Use este formulário para solicitar novos equipamentos para o seu departamento. Siga os passos e forneça as informações necessárias para garantir um processamento eficaz.</p>
        <h2>Passos para Completar a Solicitação:</h2>
        <ol>
            <li><strong>Informações Pessoais:</strong>
                <ul>
                    <li>- Digite o seu nome completo.</li>
                    <li>- Forneça o seu email e número VoIP.</li>
                    <li>- Indique o seu departamento e secretaria.</li>
                </ul>
            </li>
			<br>
            <li><strong>Detalhes do Equipamento:</strong>
                <ul>
                    <li>- Indique o código ou nome do equipamento.</li>
                    <li>- Defina a quantidade necessária.</li>
                    <li>- Forneça uma justificação para o pedido.</li>
                </ul>
            </li>
			<br>
            <li><strong>Revisão e Envio:</strong>
                <ul>
                    <li>- Revise as informações inseridas.</li>
                    <li>- Verifique se os detalhes estão corretos.</li>
                    <li>- Envie o pedido para aprovação.</li>
                </ul>
            </li>
        </ol>
        <h3>Notas Importantes:</h3>
        <ul>
            <li>Forneça informações completas para evitar atrasos.</li>
            <li>Receberá uma confirmação por email após a submissão.</li>
            <li>Em caso de dúvidas, contacte a equipa de suporte.</li>
        </ul>
    </div>
</div>
        <div class="form-section">
    <div class="steps">
        <div class="step active">01</div>
        <div class="step">02</div>
        <div class="step">03</div>
        <div class="step">04</div>
    </div>

    <h4 class="subtitle"><i class="feather icon-user"></i> Dados Pessoais</h4>
    <form action="#">
        <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">

        <div class="form-content">
            <!-- Grouping Primeiro Nome and Último Nome next to each other -->
            <div class="form-row">
                <div class="form-group">
                    <label for="first-name">Primeiro Nome</label>
                    <input type="text" id="first-name" placeholder="Digite o primeiro nome">
                </div>
                <div class="form-group">
                    <label for="last-name">Último Nome</label>
                    <input type="text" id="last-name" placeholder="Digite o último nome">
                </div>
            </div>

            <div class="form-group">
                <label for="direcao">Direção</label>
                <select name="direcao[]" id="direcao">
                    <option value="">Escolha a sua Direção</option>
                    <?php echo $direcao_options; ?>
                </select>
            </div>

            <div class="form-group">
                <label for="secretaria">Secretaria</label>
                <select name="secretaria[]" id="secretaria">
                    <option value="">Escolha a sua Secretária</option>
                    <?php echo $secretarias_options; ?>
                </select>
            </div>

            <!-- Grouping Email and VoIP next to each other -->
            <div class="form-row">
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" placeholder="Digite o e-mail">
                </div>
                <div class="form-group">
                    <label for="voip">VoIP</label>
                    <input type="text" id="voip" placeholder="Digite o número VoIP">
                </div>
            </div>

            <h4 class="subtitle"><i class="feather icon-user"></i> Equipamento a Pedir</h4>

            <div id="items-container">
                <div class="form-row" id="item-row">
                    <div class="form-group item-code">
                        <label for="item-code">Código Bens</label>
                        <input type="text" id="item-code" placeholder="#Num">
                    </div>
                    <div class="form-group equip-name">
                        <label for="item-name">Nome do Item</label>
                        <input type="text" id="item-name" placeholder="Digite o nome do item">
                    </div>
                    <div class="form-group quantity-group">
                        <label for="quantity">Quantidade</label>
                        <input type="number" id="quantity" value="0" min="1">
                    </div>
					
					<!-- Clean field button to clear the row fields -->
					<button type="button" class="clean-btn">
						<i class="fa">&#xf021;</i>
					</button>
					
					<!-- Trash icon button to delete the row -->
					<button type="button" class="delete-btn">
						<i class="fa fa-trash"></i> 
					</button>
					

                </div>
				
            </div>

            <button type="button" id="add-item-btn" class="submit-btn" style="margin-bottom: 20px">+ Adicionar Item</button>

            <div class="form-group">
                <label for="justification">Justificação</label>
                <textarea id="justification" rows="4" placeholder="Digite a justificação"></textarea>
            </div>
        </div>

        <button type="submit" class="submit-btn" style="background-color: #06C597;">Enviar Pedido</button>
    </form>
</div>
    </div>
	<!-- jQuery library (optional, but recommended if you don't already include it) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
<script>
$(document).ready(function() {
    // When the "+ Adicionar Item" button is clicked
    $("#add-item-btn").click(function() {
        // Clone the item-row form row
        var newItemRow = $("#item-row").clone();

        // Clear the inputs inside the cloned row except for the quantity input
        newItemRow.find("input").not("#quantity").val("");
		
		// Explicitly set the value of the quantity input to 0
        newItemRow.find("#quantity").val("0");

        // Append the cloned row to the form
        newItemRow.appendTo("#items-container");
    });

    // Delegate event handler for the clean button to clear inputs
    $(document).on('click', '.clean-btn', function() {
        // Find the closest form row and clear its input fields
        var formRow = $(this).closest('.form-row');
        formRow.find('input').not('#quantity').val('');
        formRow.find('#quantity').val('0'); // Reset quantity to 0
    });

    // Delegate event handler for the delete button to remove the row
    $(document).on('click', '.delete-btn', function() {
        // Only delete if there are more than one row (to prevent deleting the last row)
        if ($("#items-container .form-row").length > 1) {
            $(this).closest('.form-row').remove();
        }
    });
});

</script>
</body>
</html>