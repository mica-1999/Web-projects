// ----------------------------------------------------------------------------------------------------FUNCTIONS SECTION--------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------PHASE 1 VALIDATION -------------------------------------------------------------
function validatePhaseOne(field) {
    var value = field.val().trim();
    var id = field.attr('id');
    var isValid = true;
    var errorMessage = '';

    if (value === '') {
        field.css('border-bottom', '1px solid #ddd');
        return false;
    }

    switch (id) {
        case 'first-name':
        case 'last-name':
            ({ isValid, errorMessage } = validateNameField(value));
            break;
        case 'email':
            ({ isValid, errorMessage } = validateEmailField(value));
            break;
        case 'voip':
            ({ isValid, errorMessage } = validateVoipField(value));
            break;
        case 'direcao':
        case 'secretaria':
            ({ isValid, errorMessage } = validateSelectField(value));
            break;
        case 'request-date':
            ({ isValid, errorMessage } = validateDateField(value));
            break;
        default:
            ({ isValid, errorMessage } = validateDefaultField(value));
            break;
    }
    field.css('border-bottom', isValid ? '2px solid green' : '2px solid red');
    return { isValid, errorMessage };
}
// -----------------------------------------------------PHASE 2 VALIDATION -------------------------------------------------------------
function validatePhaseTwo(field) {
    var value = field.val().trim();
    var isValid = true;
    var errorMessage = '';

    if (value === '') {
        field.css('border-bottom', '1px solid #ddd');
        return false;
    }

    if (field.hasClass('item-code')) {
        ({ isValid, errorMessage } = validateItemCode(value));
    } else if (field.hasClass('item-name')) {
        ({ isValid, errorMessage } = validateItemName(value));
    } else if (field.hasClass('quantity')) {
        ({ isValid, errorMessage } = validateQuantity(value));
    } else if (field.hasClass('destino')) {
        ({ isValid, errorMessage } = validateDestino(value));
    } else if (field.hasClass('justification')) {
        ({ isValid, errorMessage } = validateJustification(value));
    } else {
        field.css('border-bottom', '2px solid #ddd');
    }
    field.css('border-bottom', isValid ? '2px solid green' : '2px solid red');
    return { isValid, errorMessage };
}
// -----------------------------------------------------NAME VALIDATION  -------------------------------------------------------------

function validateNameField(value) {
    let errorMessage = '';
    let isValid = true;

    if (value.length < 2 || value.length > 20) {
        errorMessage = "O nome deve ter entre 2 e 20 caracteres.";
        isValid = false;
    } else if (!/^[a-zA-ZÀ-ÿ-' ]+$/.test(value)) {
        errorMessage = "Somente letras, espaços, hífens e apóstrofos.";
        isValid = false;
    } else if (value !== value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()) {
        errorMessage = "O nome deve começar com uma letra maiúscula.";
        isValid = false;
    }
    return { isValid, errorMessage };
}
// -----------------------------------------------------EMAIL VALIDATION  -------------------------------------------------------------
function validateEmailField(value) {
    const regex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    let errorMessage = '';
    let isValid = true;

    if (!regex.test(value) || value.length > 320 || value.split('@')[0].length > 64 || /\.{2,}/.test(value.split('@')[0]) || value.startsWith('.') || value.endsWith('.')) {
        errorMessage = "Por favor, insira um e-mail válido.";
        isValid = false;
    }
    return { isValid, errorMessage };
}
// -----------------------------------------------------VOIP VALIDATION  -------------------------------------------------------------
function validateVoipField(value) {
    const voipNumber = parseInt(value, 10);
    let errorMessage = '';
    let isValid = true;

    if (!/^\d{6}$/.test(value) || voipNumber < 400000 || voipNumber > 499999) {
        errorMessage = "Número de 6 dígitos, entre 400000 e 499999.";
        isValid = false;
    }
    return { isValid, errorMessage };
}
// -----------------------------------------------------DIR/SECRETARIA VALIDATION  -------------------------------------------------------------
function validateSelectField(value) {
    let errorMessage = '';
    let isValid = true;

    if (!value) {
        errorMessage = "Este campo é obrigatório.";
        isValid = false;
    }
    return { isValid, errorMessage };
}
// -----------------------------------------------------DATE VALIDATION  -------------------------------------------------------------
function validateDateField(value) {
    const selectedDate = new Date(value);
    const minDate = new Date('2024-01-01');
    const maxDate = new Date('2024-12-31');
    let errorMessage = '';
    let isValid = true;

    if (!value || selectedDate < minDate || selectedDate > maxDate) {
        errorMessage = "Por favor, insira uma data válida dentro de 2024.";
        isValid = false;
    }
    return { isValid, errorMessage };
}
// -----------------------------------------------------ITEM CODE VALIDATION  -------------------------------------------------------------
function validateItemCode(value) {
    const itemCodeValue = parseInt(value, 10);
    let errorMessage = '';
    let isValid = true;

    if (isNaN(itemCodeValue) || itemCodeValue < 1 || itemCodeValue > 5000) {
        errorMessage = "Código inválido";
        isValid = false;
    }
    return { isValid, errorMessage };
}
// -----------------------------------------------------ITEM NAME VALIDATION  -------------------------------------------------------------
function validateItemName(value) {
    let errorMessage = '';
    let isValid = true;

    if (value.length < 2) {
        errorMessage = "Nome do item muito curto!";
        isValid = false;
    }
    return { isValid, errorMessage };
}
// -----------------------------------------------------ITEM QUANTITY VALIDATION  -------------------------------------------------------------
function validateQuantity(value) {
    const quantityValue = parseInt(value, 10);
    let errorMessage = '';
    let isValid = true;

    if (isNaN(quantityValue) || quantityValue < 1 || quantityValue > 50) {
        errorMessage = "Qtd inválida";
        isValid = false;
    }
    return { isValid, errorMessage };
}
// -----------------------------------------------------DESTINO VALIDATION  -------------------------------------------------------------
function validateDestino(value) {
    let errorMessage = '';
    let isValid = true;

    if (value === '') {
        errorMessage = "Escolha um destino.";
        isValid = false;
    }

    return { isValid, errorMessage };
}
// -----------------------------------------------------JUSTIFICATION VALIDATION  -------------------------------------------------------------
function validateJustification(value) {
    let errorMessage = '';
    let isValid = true;

    if (value.length < 10) {
        errorMessage = "A justificação deve ter pelo menos 10 caracteres.";
        isValid = false;
    }

    return { isValid, errorMessage };
}
// -----------------------------------------------------DEFAULT VALIDATION  -------------------------------------------------------------
function validateDefaultField(value) {
    let errorMessage = '';
    let isValid = true;

    if (value.length < 2) {
        isValid = false;
    }

    return { isValid, errorMessage };
}
// -----------------------------------------------------INPUT AND FOCUS HANDLING  -------------------------------------------------------------
function applyFocusAndInputStyles(selector) {
    $(document).on('focus', selector, function() {
        $(this).css({ 'border-bottom': '1px solid #007bff', 'color': '#007bff' });
    }).on('input', selector, function() {
        $(this).css('color', '#007bff');
    }).on('blur', selector, function() {
        $(this).css('color', '#3A3F48');
        var result = validatePhaseTwo($(this));
        $('#' + $(this).attr('id') + '-error').text(result.errorMessage).show();
    });
}
// -----------------------------------------------------QUANTITY INPUT HANDLING  -------------------------------------------------------------
function handleQuantityInput() {
    $(document).on('focus', '.quantity', function() {
        $(this).attr('type', 'number');
    }).on('blur', '.quantity', function() {
        if ($(this).val() === '') {
            $(this).attr({ 'type': 'text', 'placeholder': 'Quantidade' });
        }
    });
}
// -----------------------------------------------------DATE INPUT HANDLING  -------------------------------------------------------------
function handleDateInput() {
    $('#request-date').on('focus', function() {
        $(this).attr('type', 'date');
    }).on('blur', function() {
        if ($(this).val() === '') {
            $(this).attr({ 'type': 'text', 'placeholder': 'Data do Pedido' });
        }
    });
}

// -----------------------------------------------------~RESET INPUT STYLES AND ERRORS  -------------------------------------------------------------
function resetInputStyles(input) {
    input.css('border-bottom', '1px solid #ddd').siblings('.error-message').text('').hide();
}




// ----------------------------------------------------------------------------------------------------(MAIN) FORM NAVIGATION---------------------------------------------------------------------------------------------------
$(document).ready(function() {
    var itemCounter = 1;
    applyFocusAndInputStyles("#dados-gerais input[required], #dados-gerais select[required]");
    applyFocusAndInputStyles("#equipamentos input[required], #equipamentos select[required], #equipamentos textarea[required]");
    handleDateInput();
    handleQuantityInput();

// -----------------------------------------------------~PHASE 1 OF FORM   -------------------------------------------------------------
	$("#dados-gerais input[required], #dados-gerais select[required]").on('blur', function() {
        $(this).css('color', '#3A3F48');
        var result = validatePhaseOne($(this));
        $('#' + $(this).attr('id') + '-error').text(result.errorMessage).show();
    });

	$("#proximo-equipamentos").click(function(e) {
        e.preventDefault(); // Prevent form submission (if any)
        
        let isValid = true;

        // Validate all required fields in "dados-gerais" section
        $("#dados-gerais input[required], #dados-gerais select[required]").each(function() {
            let field = $(this);
            let fieldValid = validatePhaseOne(field); // Check if the field is valid

            // Check if the field is invalid or empty and add red border if so
            if (!fieldValid.isValid || field.val().trim() === '') {
                field.css('border-bottom', '2px solid red'); // Add red border for invalid/empty fields
                isValid = false; // Mark as invalid
            }
        });

        if (!isValid) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return; // Stop the function if validation fails
        }

        // Hide the "Dados Gerais" section and show the "Equipamentos" section with smooth transitions
        $("#dados-gerais").fadeOut(500, function() {
            $("#equipamentos").fadeIn(500);
        });

        // Update the step indicators to show the second step as active
        $(".step").removeClass("active"); // Remove 'active' class from all steps
        $(".step:nth-child(2)").addClass("active"); // Add 'active' class to the second step
    });
	
	
// -----------------------------------------------------~PHASE 2 OF FORM   -------------------------------------------------------------
	// Event to reset color and show error on blur
	$("#equipamentos input[required], #equipamentos select[required],#equipamentos textarea[required]").on('blur', function() {
			$(this).css('color', '#3A3F48');  // Reset color to normal when blurred
			var result = validatePhaseTwo($(this));
			$('#' + $(this).attr('id') + '-error').text(result.errorMessage).show(); // Display the error message
	});

	// Add new item row
	$("#add-new-item").click(function() {
		const newItemRow = $("#item-row").clone();
		
		// Update the IDs of cloned inputs to ensure uniqueness
		newItemRow.find('input').each(function() {
			const originalId = $(this).attr('id');
			const newId = `${originalId}-${itemCounter}`;
			$(this).attr('id', newId).siblings('label').attr('for', newId);
			$(this).siblings('.error-message').attr('id', `${newId}-error`);
		});

		newItemRow.find('input').val(""); // Clear inputs
		itemCounter++;

		// Reset styles and error messages
		newItemRow.find('input').each(function() {
			resetInputStyles($(this));
		});

		newItemRow.appendTo("#items-container");
		newItemRow.find('#quantity').each(handleQuantityInput); // Apply specific handlers for new inputs
		applyFocusAndInputStyles(newItemRow.find('input[required], select[required]')); // Apply focus styles
	});

	// Clean button: clear input values and reset styles
	$(document).on('click', '.clean-btn', function() {
		const formRow = $(this).closest('.form-row');
		formRow.find('input').val('');
		resetInputStyles(formRow.find('input'));
	});

	// Delete button: remove the row, but only if there are more than one
	$(document).on('click', '.delete-btn', function() {
		if ($("#items-container .form-row").length > 1) {
			$(this).closest('.form-row').remove();
		}
	});

		// Previous button: transition between sections and update step indicator
	$("#anterior-dados-gerais").click(function(e) {
		e.preventDefault();

		// Hide "Equipamentos" and show "Dados Gerais" with a smooth transition
		$("#equipamentos").fadeOut(500, function() {
			$("#dados-gerais").fadeIn(500);
		});

		// Update the step indicator by removing 'active' from all steps
		// and adding it to the first step
		$(".step").removeClass("active").first().addClass("active");
	});


	// Next button for "Revisao": validate fields, transition between sections, and update step indicator
	$("#proximo-revisao").click(function(e) {
		e.preventDefault(); // Prevent form submission

		let isValid = true;

		// Validate required fields in "Equipamentos" section
		$("#equipamentos input[required], #equipamentos select[required], #equipamentos textarea[required]").each(function() {
			let field = $(this);

			// Check if the field is valid or empty and apply red border if invalid
			if (!validatePhaseTwo(field).isValid || field.val().trim() === '') {
				field.css('border-bottom', '2px solid red'); // Apply red border for invalid/empty fields
				isValid = false; // Mark as invalid
			}
		});

		if (!isValid) {
			alert("Por favor, preencha todos os campos obrigatórios.");
			return; // Stop the function if validation fails
		}

		// Hide the "Equipamentos" section and show the "Revisao" section with smooth transitions
		$("#equipamentos").fadeOut(500, function() {
			$("#revisao").fadeIn(500);
		});

		// Update the step indicators to show the third step as active
		$(".step").removeClass("active").eq(2).addClass("active"); // Add 'active' to the third step
	});	
});
