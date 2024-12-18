// ----------------------------------------------------------------------------------------------------FUNCTIONS SECTION-----------------------------------------------------------------------------------------------------------
// -----------------------------------------------------PHASE 1 VALIDATION -------------------------------------------------------------
function validatePhaseOne(field) {
    var value = field.value.trim(); // Get the trimmed value of the input field
    var id = field.id; // Get the ID of the input field
    var isValid = true;
    var errorMessage = '';

    if (value === '') { 
        field.style.borderBottom = '1px solid #ddd'; // Reset input border style if empty
        return false;
    }

    // Validate based on the input field ID
    switch (id) {
        case 'first-name':
        case 'last-name':
            ({ isValid, errorMessage } = validateNameField(value)); // Validate name field
            break;
        case 'email':
            ({ isValid, errorMessage } = validateEmailField(value)); // Validate email field
            break;
        case 'voip':
            ({ isValid, errorMessage } = validateVoipField(value)); // Validate voip field
            break;
        case 'direcao':
        case 'secretaria':
            ({ isValid, errorMessage } = validateSelectField(value)); // Validate select field
            break;
        case 'request-date':
            ({ isValid, errorMessage } = validateDateField(value)); // Validate date field
            break;
        default:
            ({ isValid, errorMessage } = validateDefaultField(value)); // Default validation for other fields
            break;
    }

    // Update the input border style based on validity
    field.style.borderBottom = isValid ? '2px solid green' : '2px solid red'; 
    return { isValid, errorMessage };
}
// -----------------------------------------------------PHASE 2 VALIDATION -------------------------------------------------------------
function validatePhaseTwo(field) {
    var value = field.value.trim(); // Get the trimmed value of the input field

    var isValid = true;
    var errorMessage = '';

    if (value === '') { 
        field.style.borderBottom = '1px solid #ddd'; // Reset input border style if empty
        return false;
    }

    // Check the class of the field to validate based on item type
    if (field.classList.contains('item-code')) { 
        ({ isValid, errorMessage } = validateItemCode(value)); // Validate item code
    } else if (field.classList.contains('item-name')) { 
        ({ isValid, errorMessage } = validateItemName(value)); // Validate item name
    } else if (field.classList.contains('quantity')) { 
        ({ isValid, errorMessage } = validateQuantity(value)); // Validate quantity
    } else if (field.classList.contains('destino')) { 
        ({ isValid, errorMessage } = validateDestino(value)); // Validate destination
    } else if (field.classList.contains('justification')) { 
        ({ isValid, errorMessage } = validateJustification(value)); // Validate justification
    } else {
        field.style.borderBottom = '2px solid #ddd'; // Reset default style if no validation class matches
    }

    // Update the input border style based on validity
    field.style.borderBottom = isValid ? '2px solid green' : '2px solid red'; 
    return { isValid, errorMessage };
}
// -----------------------------------------------------NAME VALIDATION  -------------------------------------------------------------
function validateNameField(value) {
    let errorMessage = '';
    let isValid = true;

    // Check if name length is valid and matches character requirements
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
    const regex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/; // Email regex pattern
    let errorMessage = '';
    let isValid = true;

    // Check if email is valid using regex and length restrictions
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

    // Check if VoIP number is a 6-digit number within a specific range
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

    // Ensure a value is selected (field is not empty)
    if (!value) {
        errorMessage = "Este campo é obrigatório.";
        isValid = false;
    }
    return { isValid, errorMessage };
}
// -----------------------------------------------------DIR/SECRETARIA VALIDATION  -------------------------------------------------------------
// Function to validate both direcao and secretaria
function validateDirecaoAndSecretaria() {
    const direcaoSelect = document.getElementById('direcao');
    const secretariaSelect = document.getElementById('secretaria');

    // Validate direcao
    let direcaoResult = validateSelectField(direcaoSelect.value);
    let direcaoErrorElement = document.getElementById(direcaoSelect.id + '-error');
    if (direcaoErrorElement) {
        direcaoErrorElement.textContent = direcaoResult.errorMessage;
        direcaoErrorElement.style.display = direcaoResult.isValid ? 'none' : 'block';
    }
    direcaoSelect.style.borderBottom = direcaoResult.isValid ? '2px solid green' : '2px solid red';

    // Validate secretaria
    let secretariaResult = validateSelectField(secretariaSelect.value);
    let secretariaErrorElement = document.getElementById(secretariaSelect.id + '-error');
    if (secretariaErrorElement) {
        secretariaErrorElement.textContent = secretariaResult.errorMessage;
        secretariaErrorElement.style.display = secretariaResult.isValid ? 'none' : 'block';
    }
    secretariaSelect.style.borderBottom = secretariaResult.isValid ? '2px solid green' : '2px solid red';
	secretariaSelect.style.color = "black";
}
// -----------------------------------------------------DATE VALIDATION  -------------------------------------------------------------
function validateDateField(value) {
    const selectedDate = new Date(value);
    const minDate = new Date('2024-01-01');
    const maxDate = new Date('2024-12-31');
    let errorMessage = '';
    let isValid = true;

    // Validate that the date is within the allowed range in 2024
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

    // Validate that the item code is a number between 1 and 5000
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

    // Ensure the item name has at least 2 characters
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

    // Find the stock value in the span next to the quantity input
    let hiddenStockInput = event.target.closest('.form-row').querySelector('.quantity-group input[type="hidden"]');  // Find the quantity error message span
    let stock = null; // Default value in case qtyErrorMessage is null

	// Check if qtyErrorMessage is not null and then proceed
	if (hiddenStockInput) {
		stock = parseInt(hiddenStockInput.value, 10);
	}

    // Ensure the quantity is a number and does not exceed the available stock
    if (quantityValue < 1 || (stock !== null && quantityValue > stock)) {	
        errorMessage = `Qtd inválida.`;
        isValid = false;
    }
    return { isValid, errorMessage };
}
// -----------------------------------------------------DESTINO VALIDATION  -------------------------------------------------------------
function validateDestino(value) {
    let errorMessage = '';
    let isValid = true;

    // Ensure a destination is selected
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

    // Ensure justification is at least 10 characters long
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

    // Default validation: value must be at least 2 characters
    if (value.length < 2) {
        isValid = false;
    }

    return { isValid, errorMessage };
}
// -----------------------------------------------------QUANTITY INPUT HANDLING  -------------------------------------------------------------
function handleQuantityInput() {
    document.querySelectorAll('.quantity').forEach(function(element) {
        // When focused, change input type to number
        element.addEventListener('focus', function() {
            element.type = 'number';
        });

        // When blurred, revert input type to text if empty
        element.addEventListener('blur', function() {
            if (element.value === '') {
                element.type = 'text';
                element.placeholder = 'Quantidade';
            }
        });
    });
}
// -----------------------------------------------------DATE INPUT HANDLING  -------------------------------------------------------------
function handleDateInput() {
    var dateInput = document.getElementById('request-date');
    dateInput.addEventListener('focus', function() {
        dateInput.type = 'date'; // Change input type to date on focus
    });

    dateInput.addEventListener('blur', function() {
        if (dateInput.value === '') {
            dateInput.type = 'text'; // Revert input type to text if empty
            dateInput.placeholder = 'Data do Pedido';
        }
    });
}

// -----------------------------------------------------VALIDATE ITEM-CODE AND ITEM-NAME  -------------------------------------------------------------
// Function to validate item-code and item-name
function validateItemCodeAndName(itemCodeInput) {
    const itemCode = itemCodeInput.value.trim();
    const formRow = itemCodeInput.closest('.form-row');
    const itemNameInput = formRow ? formRow.querySelector('.item-name') : null;

    if (itemNameInput) {
		itemNameInput.style.borderColor = "#ddd"; // Reset border color to default
		itemNameInput.style.color = "#3A3F48"; // Reset border color to default
        if (itemCode.length > 0 && !isNaN(itemCode)) {
            if (itemNameInput.value.length > 0) {
                itemNameInput.style.borderBottom = "2px solid green"; // Change border color to blue

            } else {
                itemNameInput.style.borderBottom = "2px solid red"; // Indicate an error if item-name is empty
            }
        } else {
            itemNameInput.style.borderBottom = ""; // Reset border color
        }
    }
}
// -----------------------------------------------------~RESET INPUT STYLES AND ERRORS  -------------------------------------------------------------
function resetInputStyles(input) {
    input.style.borderBottom = '1px solid #ddd'; // Reset input border style
    const formRow = input.closest('.form-row'); // Find the closest form row container
    const errorMessages = formRow ? formRow.querySelectorAll('.error-message') : []; // Get error messages within the form row

    errorMessages.forEach(function(errorMessage) {
        errorMessage.textContent = ''; // Clear the error message
        errorMessage.style.display = 'none'; // Hide the error message
    });
}

function applyFocusAndInputStyles(elements) {
    elements.forEach(function(element) {
        // Apply border color and text color when the element is focused
        element.addEventListener('focus', function() {
            element.style.borderBottom = '1px solid #007bff';
			
            element.style.color = '#007bff';
        });

        element.addEventListener('input', function() {
            element.style.color = '#007bff'; // Change text color when typing
        });

        // Revert to original styles after input is blurred and display validation errors
        element.addEventListener('blur', function() {
            element.style.color = '#3A3F48';
            var result = validatePhaseTwo(element); // Validate after blur
            document.getElementById(element.id + '-error').textContent = result.errorMessage; // Show the error message
            document.getElementById(element.id + '-error').style.display = 'block';
        });
    });
}


// ----------------------------------------------------------------------------------------------------(MAIN) FORM NAVIGATION---------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
	var itemCounter = 2; // Counter for item rows
    applyFocusAndInputStyles(document.querySelectorAll("#dados-gerais input[required], #dados-gerais select[required]"));
    applyFocusAndInputStyles(document.querySelectorAll("#equipamentos input[required], #equipamentos select[required], #equipamentos textarea[required]"));
    handleDateInput(); // Initialize date input handling
    handleQuantityInput(); // Initialize quantity input handling
	const direcaoSelect = document.getElementById('direcao'); // Get the 'direcao' select element
	const secretariaSelect = document.getElementById('secretaria'); // Get the 'secretaria' select element
	
	// Get all step elements
	const steps = document.querySelectorAll('.step');

	// Get all sections
	const sections = document.querySelectorAll('.section');

	
	
// -----------------------------------------------------~PHASE 1 OF FORM   -------------------------------------------------------------
	document.querySelectorAll("#dados-gerais input[required], #dados-gerais select[required]").forEach(function(element) {
		element.addEventListener('blur', function() {
			element.style.color = '#3A3F48'; // Reset color on blur
			var result = validatePhaseOne(element); // Validate Phase 1
			document.getElementById(element.id + '-error').textContent = result.errorMessage; // Display error
			document.getElementById(element.id + '-error').style.display = 'block'; // Show error message
			
			// If the blurred element is direcao, validate secretaria as well
			if (element.id === 'direcao') {
				validateDirecaoAndSecretaria();
			}
		});
	});
	
	// Add focus event listener to direcaoSelect to highlight both fields
	direcaoSelect.addEventListener('focus', function() {
		direcaoSelect.style.borderBottom = '1px solid #007bff'; // Blue border for direcao
		direcaoSelect.style.color = '#007bff'; // Blue text for direcao

		secretariaSelect.style.borderBottom = '1px solid #007bff'; // Blue border for secretaria
		secretariaSelect.style.color = '#007bff'; // Blue text for secretaria
	});

	// Add change event listener to direcaoSelect to update and validate secretaria
	direcaoSelect.addEventListener('change', function() {
		const selectedOption = direcaoSelect.options[direcaoSelect.selectedIndex];  // Get the selected <option>
		const direcao = selectedOption.text;  // Get the text inside the selected <option>
		
		if (direcao) {
			// Perform an AJAX request to fetch the Secretaria based on the selected 'direcao'
			fetch('../data/sel-secretaria.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `direcao=${encodeURIComponent(direcao)}`
			})
			.then(response => response.text()) // Get the response from PHP
			.then(data => {
				const secretariaSelect = document.getElementById('secretaria'); // Get the 'secretaria' select element
				const options = secretariaSelect.options;
				let found = false;

				for (let i = 0; i < options.length; i++) {
					if (options[i].text === data) {  // If the option text matches the fetched Secretaria
						options[i].selected = true;  // Mark the option as selected
						found = true;
						break;
					}
				}

				// If no matching Secretaria is found, clear the select or set default
				if (!found) {
					secretariaSelect.value = '';  // Clear the select if no matching option
				}
			})
			.catch(error => {
				console.error('Error:', error); // Handle any errors that occurred during the fetch
			});
		}
	});
	document.getElementById("proximo-equipamentos").addEventListener("click", function(e) {
		e.preventDefault(); // Prevent default behavior

		let isValid = true;

		// Validate all required fields in "dados-gerais" section
		const requiredFields = document.querySelectorAll("#dados-gerais input[required], #dados-gerais select[required]");
		requiredFields.forEach(function(field) {
			let fieldValid = validatePhaseOne(field); // Check validity

			// If invalid or empty, mark it with a red border
			if (!fieldValid.isValid || field.value.trim() === '') {
				field.style.borderBottom = '2px solid red'; // Mark invalid fields
				isValid = false; // Set form as invalid
			}
		});

		if (!isValid) {
			alert("Por favor, preencha todos os campos obrigatórios."); // Alert if invalid
			return; // Stop if validation fails
		}

		// Smooth transition between sections
		const dadosGerais = document.getElementById("dados-gerais");
		const equipamentos = document.getElementById("equipamentos");

		dadosGerais.style.transition = 'opacity 0.5s ease-out'; // Transition out
		equipamentos.style.transition = 'opacity 0.5s ease-in'; // Transition in

		dadosGerais.style.opacity = 0; // Fade out "Dados Gerais"
		equipamentos.style.opacity = 1; // Fade in "Equipamentos"

		setTimeout(function() {
			// Set display style after fade-out
			dadosGerais.style.display = 'none';
			equipamentos.style.display = 'block';
		}, 500); // Delay for transition duration

		// Update the step indicators to mark the second step
		const steps = document.querySelectorAll(".step");
		steps.forEach(function(step) {
			step.classList.remove("active"); // Remove active class
		});
		steps[1].classList.add("active"); // Mark second step as active
	});

// -----------------------------------------------------~PHASE 2 OF FORM   -------------------------------------------------------------
	let timeout;
	// Event listener for item-code inputs in dynamically added rows
	document.querySelector("#items-container").addEventListener('input', function(event) {
		// Check if the target is an item-code input
		if (event.target && event.target.classList.contains('item-code')) {
			let itemCode = event.target.value.trim();

			// Validate input (only digits in this case)
			if (itemCode.length > 0 && !isNaN(itemCode)) {
				// Clear the previous timeout to debounce
				clearTimeout(timeout);

				// Debounce the AJAX call
				timeout = setTimeout(function() {
					// Send POST request with the item code
					fetch('../data/get-item-info.php', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						body: `code=${encodeURIComponent(itemCode)}`  // Send item code as URL-encoded body
					})
					.then(response => response.json()) // Get the JSON response from PHP
					.then(data => {
						if (data.success) {
							// Find the corresponding item-name input for the current row
							let itemNameInput = event.target.closest('.form-row').querySelector('.item-name');
							let qtyInput = event.target.closest('.form-row').querySelector('.quantity');
							let qtyErrorMessage = event.target.closest('.form-row').querySelector('.quantity-group .error-message');  // Find the quantity error message span
							let hiddenStockInput = event.target.closest('.form-row').querySelector('.quantity-group input[type="hidden"]');  // Find the quantity error message span

							if (itemNameInput) {
								itemNameInput.value = data.item_name;
								itemNameInput.style.color = "#007bff"; // Set color to blue
								itemNameInput.style.borderColor = "#007bff"; // Set border color to blue
							}

							if (qtyErrorMessage) {
								// Update the error message with available stock
								let stock = data.stock;  // Retrieve the stock from the data
								qtyErrorMessage.textContent = `Available: ${stock}`;  // Display stock in the error message
								qtyErrorMessage.style.color = 'red'; // Style the message (green for availability)
								qtyErrorMessage.style.display = 'block'; // Ensure it's visible
								
								if (hiddenStockInput) {
									hiddenStockInput.value = stock;
								}
							}
						} else {
							let itemNameInput = event.target.closest('.form-row').querySelector('.item-name');
							let qtyErrorMessage = event.target.closest('.form-row').querySelector('.quantity-group .error-message');

							if (itemNameInput) {
								itemNameInput.value = '';
								itemNameInput.style.borderColor = "#ccc";
							}

							if (qtyErrorMessage) {
								qtyErrorMessage.textContent = '';  // Clear the stock message if item not found
								qtyErrorMessage.style.display = 'none';  // Hide the error message
							}
						}	
					})
					.catch(error => {
						console.error('Error:', error); // Handle any errors during fetch
					});
				}, 300);  // Wait 300ms after user stops typing
			} else {
				let itemNameInput = event.target.closest('.form-row').querySelector('.item-name');
				let qtyErrorMessage = event.target.closest('.form-row').querySelector('.quantity-group .error-message');

				if (itemNameInput) {
					itemNameInput.value = '';
					itemNameInput.style.borderColor = "#ccc";
				}

				if (qtyErrorMessage) {
					qtyErrorMessage.textContent = ''; // Clear the stock message if item code is invalid
					qtyErrorMessage.style.display = 'none';  // Hide the error message
				}
			}
		}
	});


	// Event to reset color and show error on blur for item-name validation
	document.getElementById('items-container').addEventListener('blur', function(event) {
		if (event.target && event.target.classList.contains('item-code')) {
			validateItemCodeAndName(event.target);
		}
	}, true);
	
	
	
	// Event listener for adding a new item
	document.getElementById("add-new-item").addEventListener("click", function() {
		const itemRow = document.getElementById("item-row");
		const newItemRow = itemRow.cloneNode(true); // Clone the item row
		const inputs = newItemRow.querySelectorAll('input');

		inputs.forEach(function(input) {
			const originalId = input.id;
			const baseId = originalId.replace(/-\d+$/, ''); // Remove any existing number suffix
			const newId = `${baseId}-${itemCounter}`;
			input.id = newId;

			const label = newItemRow.querySelector(`label[for='${originalId}']`);
			if (label) {
				label.setAttribute('for', newId); // Update label 'for' attribute
			}

			const errorMessage = newItemRow.querySelector(`#${originalId}-error`);
			if (errorMessage) {
				errorMessage.id = `${newId}-error`; // Update error message ID
			}
		});

		inputs.forEach(function(input) {
			input.value = ''; // Clear input values
			resetInputStyles(input); // Reset input styles and error messages
		});

		// Reset any error messages in the new row
		const errorMessages = newItemRow.querySelectorAll('.error-message');
		errorMessages.forEach(function(errorMessage) {
			errorMessage.textContent = '';  // Clear error message text
			errorMessage.style.display = 'none';  // Hide error message
		});

		itemCounter++;
		document.getElementById("items-container").appendChild(newItemRow); // Append new item row
		handleQuantityInput();  // Apply to all quantity inputs after cloning
		const requiredFields = newItemRow.querySelectorAll('input[required], select[required]');
		applyFocusAndInputStyles(requiredFields); // Apply focus and styling for validation
	});

	// Clean button: clear input values and reset styles
	document.querySelector("#items-container").addEventListener('click', function(event) {
		if (event.target && event.target.closest('.clean-btn')) {
			const formRow = event.target.closest('.form-row');
			const inputs = formRow.querySelectorAll('input');

			inputs.forEach(function(input) {
				input.value = ''; // Clear the input value
				resetInputStyles(input); // Reset the input styles (pass each input individually)
			});
		}
	});

	// Event listener for deleting an item
	document.querySelector("#items-container").addEventListener('click', function(event) {
		if (event.target && event.target.closest('.delete-btn')) {
			const formRow = event.target.closest('.form-row');
			
			// Ensure there's more than one row before allowing deletion
			const formRows = document.querySelectorAll("#items-container .form-row");

			if (formRows.length > 1) {
				formRow.remove(); // Remove the row
			}
		}
	});


	// Previous button: transition between sections and update step indicator
	document.getElementById("anterior-dados-gerais").addEventListener('click', function(e) {
		e.preventDefault(); // Prevent default action (e.g., form submission)

		// Hide "Equipamentos" and show "Dados Gerais" with a smooth transition
		const equipamentos = document.getElementById("equipamentos");
		const dadosGerais = document.getElementById("dados-gerais");

		equipamentos.style.transition = 'opacity 0.5s ease-out'; // Transition out
		dadosGerais.style.transition = 'opacity 0.5s ease-in'; // Transition in

		equipamentos.style.opacity = 0; // Fade out "Equipamentos"
		dadosGerais.style.opacity = 1; // Fade in "Dados Gerais"

		setTimeout(function() {
			// Set display style after fade-out
			equipamentos.style.display = 'none';
			dadosGerais.style.display = 'block';
		}, 500);

		// Update the step indicator by removing 'active' from all steps and adding it to the first step
		const steps = document.querySelectorAll(".step");
		steps.forEach(function(step) {
			step.classList.remove("active");
		});
		if (steps.length > 0) {
			steps[0].classList.add("active"); // Add the 'active' class to the first step
		}
	});

	// Next button for "Revisao": validate fields, transition between sections, and update step indicator
	document.getElementById("proximo-revisao").addEventListener('click', function(e) {
		e.preventDefault(); // Prevent form submission

		let isValid = true;

	// Validate required fields in "Equipamentos" section
		const equipamentosFields = document.querySelectorAll("#equipamentos input[required], #equipamentos select[required], #equipamentos textarea[required]");
		equipamentosFields.forEach(function(field) {
			const fieldValue = field.value.trim();

			// Check if the field is valid or empty and apply red border if invalid
			const result = validatePhaseTwo(field);
			if (!result.isValid || fieldValue === '') {
				field.style.borderBottom = '2px solid red'; // Apply red border for invalid/empty fields
				isValid = false; // Mark as invalid
			}
		});

		if (!isValid) {
			alert("Por favor, preencha todos os campos obrigatórios."); // Alert if invalid
			return; // Stop if validation fails
		}

		// Copy personal data
		document.getElementById('review-first-name').innerText = document.getElementById('first-name').value;
		document.getElementById('review-last-name').innerText = document.getElementById('last-name').value;
		document.getElementById('review-email').innerText = document.getElementById('email').value;
		document.getElementById('review-voip').innerText = document.getElementById('voip').value;
		document.getElementById('review-direcao').innerText = document.getElementById('direcao').options[document.getElementById('direcao').selectedIndex].text;
		document.getElementById('review-secretaria').innerText = document.getElementById('secretaria').options[document.getElementById('secretaria').selectedIndex].text;
		document.getElementById('review-request-date').innerText = document.getElementById('request-date').value;

		// Copy equipment data
		const itemsContainer = document.getElementById('items-container');
		const reviewItemsTbody = document.getElementById('review-items-tbody');
		reviewItemsTbody.innerHTML = ''; // Clear previous items

		itemsContainer.querySelectorAll('.form-row').forEach(function(row) {
			const itemCode = row.querySelector('.item-code').value;
			const itemName = row.querySelector('.item-name').value;
			const quantity = row.querySelector('.quantity').value;

			const tr = document.createElement('tr');
			tr.innerHTML = `<td>${itemCode}</td><td>${itemName}</td><td>${quantity}</td>`;
			reviewItemsTbody.appendChild(tr);
		});

		// Copy destination and justification
		document.getElementById('review-destino').innerText = document.getElementById('destino').options[document.getElementById('destino').selectedIndex].text;
		document.getElementById('review-justification').innerText = document.getElementById('justification').value;



		// Hide the "Equipamentos" section and show the "Revisao" section with smooth transitions
		const equipamentos = document.getElementById("equipamentos");
		const revisao = document.getElementById("revisao");

		equipamentos.style.transition = 'opacity 0.5s ease-out'; // Transition out
		revisao.style.transition = 'opacity 0.5s ease-in'; // Transition in

		equipamentos.style.opacity = 0; // Fade out "Equipamentos"
		revisao.style.opacity = 1; // Fade in "Revisao"

		setTimeout(function() {
			// After the fadeOut animation, set the display style to 'none' for "Equipamentos"
			equipamentos.style.display = 'none';
			revisao.style.display = 'block';
		}, 500);

		// Update the step indicators to show the third step as active
		const steps = document.querySelectorAll(".step");
		steps.forEach(function(step) {
			step.classList.remove("active"); // Remove 'active' class from all steps
		});
		if (steps.length > 2) {
			steps[2].classList.add("active"); // Add 'active' class to the third step
		}
	});
	
// -----------------------------------------------------~PHASE 3 OF FORM   -------------------------------------------------------------
	
	// Previous button: transition between sections and update step indicator
	document.getElementById("anterior-equipamentos").addEventListener('click', function(e) {
		e.preventDefault(); // Prevent default action (e.g., form submission)

		// Hide "Equipamentos" and show "Dados Gerais" with a smooth transition
		const revisao = document.getElementById("revisao");
		const equipamentos = document.getElementById("equipamentos");
		
		revisao.style.transition = 'opacity 0.5s ease-out'; // Transition out
		equipamentos.style.transition = 'opacity 0.5s ease-in'; // Transition in

		revisao.style.opacity = 0; // Fade out "Equipamentos"
		equipamentos.style.opacity = 1; // Fade in "Dados Gerais"

		setTimeout(function() {
			// Set display style after fade-out
			revisao.style.display = 'none';
			equipamentos.style.display = 'block';
		}, 500);

		// Update the step indicator by removing 'active' from all steps and adding it to the first step
		const steps = document.querySelectorAll(".step");
		steps.forEach(function(step) {
			step.classList.remove("active");
		});
		if (steps.length > 0) {
			steps[1].classList.add("active"); // Add the 'active' class to the first step
		}
	});
});