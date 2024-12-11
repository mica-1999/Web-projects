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
		</div>

		
		<form action="#">
			<input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
			<div class="form-content">
				<div id="dados-gerais">
					<h4 class="subtitle"><i class="feather icon-user"></i> Dados Pessoais</h4>
					<div class="form-row">
						<div class="form-group">
							<input type="text" id="first-name" placeholder="Digite o primeiro nome" required />
							<label for="first-name">Primeiro Nome</label>
						</div>
						<div class="form-group">
							<input type="text" id="last-name" placeholder="Digite o último nome" required />
							<label for="last-name">Último Nome</label>
						</div>
					</div>
					
					

					<div class="form-row">
						<div class="form-group">
							<input type="email" id="email" placeholder="Digite o e-mail" required />
							<label for="email">E-mail</label>
						</div>
						<div class="form-group">
							<input type="text" id="voip" placeholder="Digite o número VoIP" required />
							<label for="voip">VoIP</label>
						</div>
					</div>
					
					<div class="form-group">
						<select name="direcao[]" id="direcao" required>
							<option value=""></option>
							<?php echo $direcao_options; ?>
						</select>
						<label for="direcao">Direção</label>
					</div>
					<div class="form-group">

						<select name="secretaria[]" id="secretaria" required>
							<option value=""></option>
							<?php echo $secretarias_options; ?>
						</select>
						<label for="secretaria">Secretária</label>
					</div>
					
					<div class="form-row">
						<div class="form-group">
							<input type="date" id="request-date" required />
							<label for="request-date">Data do Pedido</label>
						</div>
					</div>
					
					<button type="button" class="submit-btn" id="proximo-equipamentos" style="background-color: #06C597;">Próximo</button>
				</div>
				<div id="equipamentos" style="display: none">
					<h4 class="subtitle"><i class="feather icon-user"></i> Equipamento a Pedir</h4>

					<div id="items-container">
						<div class="form-row" id="item-row">
							<div class="form-group item-code">
								<input type="text" id="item-code" placeholder="#Num" required />
								<label for="item-code">#</label>
							</div>
							<div class="form-group equip-name">
								<input type="text" id="item-name" placeholder="Digite o nome do item" required />
								<label for="item-name">Nome do Item</label>
							</div>
							<div class="form-group quantity-group">
								<input type="number" id="quantity" value="0" min="1" required />
								<label for="quantity">Quantidade</label>
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
					
					<button type="button" class="add-item-button" id="add-item-btn">
						<i class="plus-icon">+</i>
					</button>
					<span class="add-item-text">Add Item</span>

					<div class="form-group">
							<textarea id="justification" rows="4" placeholder="Digite a justificação" required></textarea>

					</div>
				</div> 
			</div>
			
			
			<button type="submit" class="submit-btn" style="background-color: #06C597; display:none">Enviar Pedido</button>
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
	
	
$("#proximo-equipamentos").click(function(e) {
    e.preventDefault(); // Prevent form submission (if any)
	
	    // Validate required fields in "Dados Pessoais"
    let isValid = true;

    // Check if all required fields are filled
    $("#dados-gerais input[required], #dados-gerais select[required]").each(function() {
        if (!$(this).val()) {
            isValid = false;
            $(this).css('border-bottom', '2px solid red'); // Red bottom border for empty fields
        } else {
            $(this).css('border-bottom', '2px solid green'); // Green bottom border for filled fields
        }
    });

    if (!isValid) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return; // Stop the function if validation fails
    }

    // Hide the "Dados Gerais" section
    $("#dados-gerais").fadeOut(500);  // Fade out for smooth transition

    // Show the "Equipamentos" section after a short delay (to match fadeOut duration)
    setTimeout(function() {
        $("#equipamentos").fadeIn(500);  // Fade in with a smooth transition
    }, 500); // Match the duration of the fadeOut effect
	
	// Update the step indicators to show the second step as active
    $(".step").removeClass("active"); // Remove 'active' class from all steps
    $(".step:nth-child(2)").addClass("active");
});
	
	
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

<script>
const openModalButtons = document.querySelectorAll('.open-modal'),
      modal = document.querySelector('.modal'),
      closeModalButtons = document.querySelectorAll('.close-modal');

openModalButtons.forEach(openBtn => {
  openBtn.addEventListener('click', openModal)
});

closeModalButtons.forEach(closeBtn => {
  closeBtn.addEventListener('click', closeModal)
});

function openModal() {
  modal.classList.add('visible');
}

function closeModal() {
  modal.classList.remove('visible');
}



</script>

</body>
</html>