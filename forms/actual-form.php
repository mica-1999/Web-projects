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
	<link href="https://fonts.googleapis.com/css2?family=Convergence&display=swap" rel="stylesheet">
</head>
<body>


<div class="form-container">
	<div class="info-section">
		<h1 class="title">PEDIDOS BCII</h1>

		<h3 class="equipment" style="display:none">Informações</h3>
		<div class="lign-well">
			<p class="form-description" style="display:none">Use este formulário para solicitar novos equipamentos para o seu departamento. Siga os passos e forneça as informações necessárias para garantir um processamento eficaz.</p>
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
			<div class="important-notes">
				<h3>Notas Importantes:</h3>
				<ul>
					<li>Forneça informações completas para evitar atrasos.</li>
					<li>Receberá uma confirmação por email após a submissão.</li>
					<li>Em caso de dúvidas, contacte a equipa de suporte.</li>
					<li><strong>Suporte:</strong> support@example.com</li>
					<li><strong>Telefone:</strong> +55 (11) 91234-5678</li>
				</ul>
			</div>
		</div>
	</div>
	
	<div class="form-section">
		<div class="steps">
			<div class="step active">01</div>
			<div class="step">02</div>
			<div class="step">03</div>
		</div>

		
		<form action="#" id="multi-step-form">
			<input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
			<div class="form-content">
				<div id="dados-gerais">
					<h4 class="subtitle"><i class="feather icon-user"></i> Dados Pessoais</h4>
					<div class="form-row">
						<div class="form-group">
							<input type="text" id="first-name" placeholder="Digite o primeiro nome" required />
							<label for="first-name">Primeiro Nome</label>
							<span class="error-message" id="first-name-error"></span>
						</div>
						<div class="form-group">
							<input type="text" id="last-name" placeholder="Digite o último nome" required />
							<label for="last-name">Último Nome</label>
							<span class="error-message" id="last-name-error"></span>
						</div>
					</div>
					
					

					<div class="form-row">
						<div class="form-group">
							<input type="email" id="email" placeholder="Digite o e-mail" required />
							<label for="email">E-mail</label>
							<span class="error-message" id="email-error"></span>
						</div>
						<div class="form-group">
							<input type="text" id="voip" placeholder="Digite o número VoIP" required />
							<label for="voip">VoIP</label>
							<span class="error-message" id="voip-error"></span>
						</div>
					</div>
					
					<div class="form-group">
						<select name="direcao[]" id="direcao" required>
							<option value=""></option>
							<?php echo $direcao_options; ?>
						</select>
						<label for="direcao">Direção</label>
						<span class="error-message" id="direcao-error"></span>
					</div>
					
					
					<div class="form-group">

						<select name="secretaria[]" id="secretaria" required>
							<option value=""></option>
							<?php echo $secretarias_options; ?>
						</select>
						<label for="secretaria">Secretária</label>
						<span class="error-message" id="secretaria-error"></span>
					</div>
					
					<div class="form-row">
						<div class="form-group">
							<input type="text" id="request-date" required placeholder="Data do Pedido" />
							<label for="request-date">Data do Pedido</label>
							<span class="error-message" id="request-date-error"></span>
						</div>
					</div>
					
					<button type="button" class="submit-btn" id="proximo-equipamentos" style="background-color: #06C597;">Próximo</button>
				</div>
				<div id="equipamentos" style="display: none">
					<h4 class="subtitle"><i class="feather icon-user"></i> Equipamento a Pedir</h4>

					<div id="items-container">
						<div class="form-row" id="item-row">
							<div class="form-group item-code">
								<input type="number" class="item-code" id="item-code" placeholder="#Num" required />
								<label for="item-code">#</label>
								<span class="error-message" id="item-code-error"></span>
							</div>
							<div class="form-group equip-name">
								<input type="text" class="item-name" id="item-name" placeholder="Digite o nome do item" required />
								<label for="item-name">Nome do Item</label>
								<span class="error-message" id="item-name-error"></span>
							</div>
							<div class="form-group quantity-group">
								<input type="text" class="quantity" id="quantity" placeholder="Digite a Quantidade" required />
								<label for="quantity">Quantidade</label>
								<span class="error-message" id="quantity-error"></span>
							</div>

							<!-- Clean field button to clear the row fields -->
							<button type="button" class="clean-btn" id="icon">
								<i class="fa">&#xf021;</i>
							</button>

							<!-- Trash icon button to delete the row -->
							<button type="button" class="delete-btn" id="icon">
								<i class="fa fa-trash"></i>
							</button>
						</div>
					</div>
					
						<img src="../assets/images/icn-plus-circle.svg" data-cmp-info="10" id="add-new-item" style="margin-top:20px;float: left;width: 30px;cursor: pointer;">
						<span class="add-item-text">Add Item</span>
						
					<div class="form-group justificacao">
						<select name="destino[]" class="destino" id="destino" required>
							<option value=""></option>
							<?php echo $direcao_options; ?>
						</select>
						<label for="destino">Local de Destino</label>
						<span class="error-message" id="destino-error"></span>
					</div>
					
					<div class="form-group">
							<textarea id="justification"  class="justification" rows="4" placeholder="Please insert why you need this equipment" required></textarea>
							<label for="justification">Justificação</label>
							<span class="error-message" id="justification-error"></span>
					</div>
					<div class="form-row" id="button-row">
						<button type="button" class="submit-btn anterior" id="anterior-dados-gerais" style="background-color: #6c757d;">Anterior</button>
						<button type="button" class="submit-btn proximo" id="proximo-revisao" style="background-color: #00AA6D;">Próximo</button>
					</div>
				</div> 
				
				<div id="revisao" style="display: none">this is just testing</div>
			</div>
			
			
			<button type="submit" class="submit-btn" style="background-color: #06C597; display:none">Enviar Pedido</button>
		</form>
	</div>
</div>
	<!-- jQuery library (optional, but recommended if you don't already include it) -->
	
<script>
document.addEventListener('DOMContentLoaded', function () {
  var dateInput = document.getElementById('request-date');

  dateInput.addEventListener('focus', function() {
    dateInput.type = 'date';
  });

  dateInput.addEventListener('blur', function() {
    if (dateInput.value === '') {
      dateInput.type = 'text';
      dateInput.placeholder = 'Data do Pedido';
    }
  });
});
</script>
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
<script src="../assets/js/form-wizard-native.js"></script>
</body>
</html>