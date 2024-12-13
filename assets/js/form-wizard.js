function validateField(field) {
    var value = field.val().trim();  // Get the value and trim any leading/trailing spaces
    var id = field.attr('id'); // Get the id of the input field
    var isValid = true;  // Initialize the validity as true
    var regex;  // Initialize regex for validation
	var errorMessage = ''; // Initialize error message



    // If the field is empty, reset the border color and return false
    if (value === '') {
        field.css('border-bottom', '1px solid #ddd'); // Reset border to default
        return false;
    }

    // Validation based on input id
    switch (id) {
        case 'first-name':  // For the name field
        case 'last-name':  // For the last-name field
            if (value.length < 2 || value.length > 20) {
                errorMessage = "O nome deve ter entre 2 e 20 caracteres.";
				field.css('border-bottom', '2px solid red');
                isValid = false;
            } else if (!/^[a-zA-ZÀ-ÿ-' ]+$/.test(value)) {
                errorMessage = "Somente letras, espaços, hífens e apóstrofos.";
				field.css('border-bottom', '2px solid red');
                isValid = false;
            } else if (value !== value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()) {
                errorMessage = "O nome deve começar com uma letra maiúscula.";
				field.css('border-bottom', '2px solid red');
                isValid = false;
            } else {
                field.css('border-bottom', '2px solid green');
            }
            break;
        case 'email':  // For the email field
            regex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

            function isValidEmail(email) {
                if (!regex.test(email)) return false;
                if (email.length > 320) return false;

                var parts = email.split('@');
                var localPart = parts[0];
                var domainPart = parts[1];

                if (localPart.length > 64) return false;
                if (/\.{2,}/.test(localPart)) return false;
                if (localPart.startsWith('.') || localPart.endsWith('.')) return false;

                var domainLabels = domainPart.split('.');
                for (var i = 0; i < domainLabels.length; i++) {
                    if (domainLabels[i].length > 63 || !/^[a-zA-Z0-9-]+$/.test(domainLabels[i])) return false;
                }

                return true;
            }

            if (!isValidEmail(value)) {
                field.css('border-bottom', '2px solid red');
				errorMessage = "Por favor, insira um e-mail válido.";
                isValid = false;
            } else {
                field.css('border-bottom', '2px solid green');
            }
            break;
        case 'voip':  // For the voip field
            var voipNumber = parseInt(value, 10);
            if (!/^\d{6}$/.test(value) || voipNumber < 400000 || voipNumber > 499999) {
                field.css('border-bottom', '2px solid red');
				 errorMessage = "Número de 6 dígitos, entre 400000 e 499999.";
                isValid = false;
            } else {
                field.css('border-bottom', '2px solid green');
            }
            break;
        case 'direcao':  // For the 'direcao' select field
        case 'secretaria':  // For the 'secretaria' select field
            if (!value) {
                field.css('border-bottom', '2px solid red');
				errorMessage = "Este campo é obrigatório.";
                isValid = false;
            } else {
                field.css('border-bottom', '2px solid green');
            }
            break;
        case 'request-date':  // For the date field
            var selectedDate = new Date(value);
            var minDate = new Date('2024-01-01');
            var maxDate = new Date('2024-12-31');

            if (!value || selectedDate < minDate || selectedDate > maxDate) {
				errorMessage = "Por favor, insira uma data válida dentro de 2024.";
                field.css('border-bottom', '2px solid red');
                isValid = false;
            } else {
                field.css('border-bottom', '2px solid green');
            }
            break;
        default:
            if (value.length < 2) {
                field.css('border-bottom', '2px solid red');
                isValid = false;
            } else {
                field.css('border-bottom', '2px solid green');
            }
            break;
    }

    return { isValid: isValid, errorMessage: errorMessage };
}
function applyFocusAndInputStyles(selector) {
        $(document).on('focus', selector, function() {
            $(this).css('border-bottom', '1px solid #007bff');  // Apply a blue border for focus
            $(this).css('color', '#007bff');  // Change the text color to blue on focus
        });

        $(document).on('input', selector, function() {
            $(this).css('color', '#007bff');  // Change the text color to blue while typing
        });

        // Resets the color when unfocused and checks for errors
        $(document).on('blur', selector, function() {
            $(this).css('color', '#3A3F48');  // Reset color to normal when blurred
            var result = verifyStepTwo($(this));
            $('#' + $(this).attr('id') + '-error').text(result.errorMessage).show(); // Display the error message
        });
    }


function verifyStepTwo(field) {
	var value = field.val().trim();  // Get the value and trim any leading/trailing spaces
    var classes = field.attr('class').split(/\s+/); // Get the classes of the input field
    var isValid = true;  // Initialize the validity as true
    var regex;  // Initialize regex for validation
	var errorMessage = ''; // Initialize error message



    // If the field is empty, reset the border color and return false
    if (value === '') {
        field.css('border-bottom', '1px solid #ddd'); // Reset border to default
        return false;
    }
	
	if (field.hasClass('item-code')) {  // Item code field
        var itemCodeValue = parseInt(value);
        if (isNaN(itemCodeValue) || itemCodeValue < 1 || itemCodeValue > 5000) {
            field.css('border-bottom', '2px solid red');
            isValid = false;
            errorMessage = "Código inválido";
        } else {
            field.css('border-bottom', '2px solid green');
        }
    } else if (field.hasClass('item-name')) {  // Item name field
        if (value.length < 2) {  // Minimum 2 characters for item name
            field.css('border-bottom', '2px solid red');
            isValid = false;
            errorMessage = "Nome do item muito curto!";
        } else {
            field.css('border-bottom', '2px solid green');
        }
    } else if (field.hasClass('quantity')) {  // Quantity field
        var quantityValue = parseInt(value);
        if (isNaN(quantityValue) || quantityValue < 1 || quantityValue > 50) {
            field.css('border-bottom', '2px solid red');
            isValid = false;
            errorMessage = "Qtd inválida";
        } else {
            field.css('border-bottom', '2px solid green');
        }
    } else if (field.hasClass('destino')) {  // Destination field (select dropdown)
        if (value === '') {
            field.css('border-bottom', '2px solid red');
            isValid = false;
            errorMessage = "Escolha um destino.";
        } else {
            field.css('border-bottom', '2px solid green');
        }
    } else if (field.hasClass('justification')) {  // Justification field (textarea)
        if (value.length < 10) {  // Minimum 10 characters for justification
            field.css('border-bottom', '2px solid red');
            isValid = false;
            errorMessage = "A justificação deve ter pelo menos 10 caracteres.";
        } else {
            field.css('border-bottom', '2px solid green');
        }
    } else {
        field.css('border-bottom', '2px solid #ddd'); // Reset default style
    }
			
	return { isValid: isValid, errorMessage: errorMessage };
}

// Function to handle the quantity input placeholder and type switch
    function handleQuantityInput() {
        // Event delegation for quantity inputs, including clones
    $(document).on('focus', '.quantity', function() {
        $(this).attr('type', 'number');  // Change input type to 'number' when focused
    });

    $(document).on('blur', '.quantity', function() {
        if ($(this).val() === '') {
            $(this).attr('type', 'text');  // Change back to 'text' when blurred if empty
            $(this).attr('placeholder', 'Quantidade');  // Reset placeholder
        }
    });
    }

// Function to handle the date input placeholder and type switch
function handleDateInput() {
	var dateInput = $('#request-date');
	
	dateInput.on('focus', function() {
		dateInput.attr('type', 'date');
	});

	dateInput.on('blur', function() {
		if (dateInput.val() === '') {
			dateInput.attr('type', 'text');
			dateInput.attr('placeholder', 'Data do Pedido');
		}
	});
}
// ----------------------------------------------------------------------------------------------------MAIN SECTION-------- ------------------------------------------------------------------------------------------------------
$(document).ready(function() {
	var itemCounter = 1; // Counter to generate unique IDs for each item-row
	applyFocusAndInputStyles("#dados-gerais input[required], #dados-gerais select[required]");
    applyFocusAndInputStyles("#equipamentos input[required], #equipamentos select[required], #equipamentos textarea[required]");

	
// ----------------------------------------------------------------------------------------------------------STEP 1 STUFF----------------------------------------------------------------------------------------------------

// -----------------------------------------------------INPUT UNFOCUS HANDLING -------------------------------------------------------------
$("#dados-gerais input[required], #dados-gerais select[required]").on('blur', function() {
        $(this).css('color', '#3A3F48');  // Reset color to normal when blurred
        var result = validateField($(this));
		$('#' + $(this).attr('id') + '-error').text(result.errorMessage).show(); // Display the error message
    });

    // Initialize date input handling
    handleDateInput();
	handleQuantityInput();
   // -----------------------------------------------------BUTTON NEXT HANDLING -------------------------------------------------------------
	$("#proximo-equipamentos").click(function(e) {
		e.preventDefault(); // Prevent form submission (if any)
		
		let isValid = true;

		// Validate all required fields in "dados-gerais" section
		$("#dados-gerais input[required], #dados-gerais select[required]").each(function() {
			let fieldValid = validateField($(this)); // Check if the field is valid
			
			if (!fieldValid.isValid) { // If the field is invalid
				$(this).css('border-bottom', '2px solid red'); // Add red border for invalid fields
				isValid = false; // Mark as invalid
			}

			// Manually check if the field is empty, and add red border if so
			if ($(this).val().trim() === '') {
				$(this).css('border-bottom', '2px solid red'); // Add red border for empty fields
				isValid = false; // Mark as invalid
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

	
	// ----------------------------------------------------------------------------------------------------------STEP 2 STUFF----------------------------------------------------------------------------------------------------

	// Resets the color when unfocused and checks for errors
	$("#equipamentos input[required], #equipamentos select[required],#equipamentos textarea[required]").on('blur', function() {
			$(this).css('color', '#3A3F48');  // Reset color to normal when blurred
			var result = verifyStepTwo($(this));
			$('#' + $(this).attr('id') + '-error').text(result.errorMessage).show(); // Display the error message
		});
		
		
    // When the "+ Adicionar Item" button is clicked
	$("#add-new-item").click(function() {
		// Clone the item-row form row
		var newItemRow = $("#item-row").clone();


	// Update the IDs of cloned inputs to ensure uniqueness
        newItemRow.find('input').each(function() {
            var originalId = $(this).attr('id');
            var newId = originalId + '-' + itemCounter; // Create a new unique ID based on itemCounter
            $(this).attr('id', newId);
            $(this).siblings('label').attr('for', newId);
            $(this).siblings('.error-message').attr('id', newId + '-error');
        });
		// Clear the inputs inside the cloned row
		newItemRow.find("input").val("");
		
		// Increment the itemCounter to ensure the next cloned row has a unique ID
        itemCounter++;
		
		// Reset error messages and input styles for the cloned fields
        newItemRow.find('input').each(function() {
            var errorMessage = $(this).siblings('.error-message');
            errorMessage.text('').hide(); // Hide error messages
			$(this).css('border-bottom', '1px solid #ddd'); // Reset border style to default
        }); 
		// Append the cloned row to the form
		newItemRow.appendTo("#items-container");
		
		// Apply quantity and date input handlers to the new item row
		newItemRow.find('#quantity').each(handleQuantityInput);
		
		// Reapply focus and input styles to the cloned elements
        applyFocusAndInputStyles(newItemRow.find('input[required], select[required]'));
	});

    // Delegate event handler for the clean button to clear inputs
	$(document).on('click', '.clean-btn', function() {
		// Find the closest form row and clear its input fields
		var formRow = $(this).closest('.form-row');
		formRow.find('input').val('').css('border-bottom', '1px solid #ddd'); // Replace #ccc with your desired default border color;
        // Reset error messages for the cleared fields
        formRow.find('.error-message').text('').hide();
	});

    // Delegate event handler for the delete button to remove the row
    $(document).on('click', '.delete-btn', function() {
        // Only delete if there are more than one row (to prevent deleting the last row)
        if ($("#items-container .form-row").length > 1) {
            $(this).closest('.form-row').remove();
        }
    });
	
	// Click event for the "Previous" button (Anterior)
	$("#anterior-dados-gerais").click(function(e) {
		e.preventDefault(); // Prevent form submission (if any)

		// Hide the "Equipamentos" section with a fade-out effect
		$("#equipamentos").fadeOut(500); // Fade out for smooth transition

		// Show the "Dados Gerais" section after a short delay (to match fadeOut duration)
		setTimeout(function() {
			$("#dados-gerais").fadeIn(500); // Fade in with a smooth transition
		}, 500); // Delay of 500ms to match the duration of fadeOut

		// Update the step indicators to show the first step as active
		$(".step").removeClass("active"); // Remove 'active' class from all steps
		$(".step:nth-child(1)").addClass("active"); // Add 'active' class to the first step
	});
	
	$("#proximo-revisao").click(function(e) {
        e.preventDefault(); // Prevent form submission (if any)
		
        // Validate required fields in "Dados Pessoais" section
        let isValid = true;

        // Validate all required fields
		$("#equipamentos input[required], #equipamentos select[required],#equipamentos textarea[required]").each(function() {
			let fieldValid = verifyStepTwo($(this)); // Validate each field

			if (!fieldValid.isValid) {
				$(this).css('border-bottom', '2px solid red'); // Add red border for invalid fields
				isValid = false; // Mark as invalid
			}

			// Manually check if the field is empty
			if ($(this).val().trim() === '') {
				$(this).css('border-bottom', '2px solid red'); // Add red border for empty fields
				isValid = false; // Mark as invalid
			}
		});

        if (!isValid) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return; // Stop the function if validation fails
        }

        // Hide the "Dados Gerais" section
        $("#equipamentos").fadeOut(500);  // Fade out for smooth transition

        // Show the "Revisao" section after a short delay (to match fadeOut duration)
        setTimeout(function() {
            $("#revisao").fadeIn(500);  // Fade in with a smooth transition
        }, 500); // Match the duration of the fadeOut effect

        // Update the step indicators to show the second step as active
        $(".step").removeClass("active"); // Remove 'active' class from all steps
        $(".step:nth-child(3)").addClass("active");
    });
	
	
});
