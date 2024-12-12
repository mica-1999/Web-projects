$(document).ready(function() {
	// When the user clicks into the input field (focus)
	$("#dados-gerais input[required], #dados-gerais select[required]").on('focus', function() {
		// Highlight the border on focus
		$(this).css('border-bottom', '1px solid #007bff');  // Apply a blue border for focus (adjust color as needed)
	});
	
	// When the user types in an input field (change text color to blue)
	$("#dados-gerais input[required]").on('input', function() {
		$(this).css('color', '#007bff');  // Change the text color to blue while typing
	});

	
	 // ----------------------------------------------------------------------------------------STEP 1 STUFF---------------------------------------------------------------------------
	 
	 	
// Check input fields in "dados-gerais" section when the user unfocuses (blurs) from the field
$("#dados-gerais input[required], #dados-gerais select[required]").on('blur', function() {
	$(this).css('color', '#3A3F48');  // Change the text color to blue while typing
    var value = $(this).val().trim();  // Get the value and trim any leading/trailing spaces
    var id = $(this).attr('id'); // Get the id of the input field
    var regex;
	
    // If the field is empty, reset the border color
    if (value === '') {
        $(this).css('border-bottom', '1px solid #ddd'); // Reset border to transparent (or default)
        return; // Do nothing further if the value is empty
    }

    // Validation based on input id
    switch (id) {
        case 'first-name':  // For the name field
		case 'last-name':  // For the ultimo-name field
            // Check for minimum and maximum length
            if (value.length < 2 || value.length > 20) {
                $(this).css('border-bottom', '2px solid red');
            } else {
                // Allow only letters, spaces, hyphens, and apostrophes
                regex = /^[a-zA-ZÀ-ÿ-' ]+$/;
                if (!regex.test(value)) {
                    $(this).css('border-bottom', '2px solid red');
                } else {
                    // Capitalization check
                    if (value !== value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()) {
                        $(this).css('border-bottom', '2px solid red');
                    } else {
                        $(this).css('border-bottom', '2px solid green');
                    }
                }
            }
            break;
		case 'email':  // For the email field
	// Extended email validation regex
			regex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

			// Function to check additional email requirements
			function isValidEmail(email) {
				// Basic regex check
				if (!regex.test(email)) {
					return false;
				}

				// Check length requirements
				if (email.length > 320) {
					return false;
				}

				// Split local and domain parts
				var parts = email.split('@');
				var localPart = parts[0];
				var domainPart = parts[1];

				// Check local part length
				if (localPart.length > 64) {
					return false;
				}

				// Check for consecutive dots in local part
				if (/\.{2,}/.test(localPart)) {
					return false;
				}

				// Check if local part starts or ends with a dot
				if (localPart.startsWith('.') || localPart.endsWith('.')) {
					return false;
				}

				// Check domain part for length of each label and valid characters
				var domainLabels = domainPart.split('.');
				for (var i = 0; i < domainLabels.length; i++) {
					if (domainLabels[i].length > 63 || !/^[a-zA-Z0-9-]+$/.test(domainLabels[i])) {
						return false;
					}
				}

				return true;
			}

			if (!isValidEmail(value)) {
				$(this).css('border-bottom', '2px solid red');
			} else {
				$(this).css('border-bottom', '2px solid green');
			}
		break;

		case 'voip':  // For the voip field
			// Check if the value is a 6-digit number in the range 400000-499999
			var voipNumber = parseInt(value, 10);
			if (/^\d{6}$/.test(value) && voipNumber >= 400000 && voipNumber <= 499999) {
				$(this).css('border-bottom', '2px solid green');
			} else {
				$(this).css('border-bottom', '2px solid red');
			}
			break;
		
		case 'direcao':  // For the 'direcao' select field
        case 'secretaria':  // For the 'secretaria' select field
            if (value === '') {
                $(this).css('border-bottom', '2px solid red');
            } else {
                $(this).css('border-bottom', '2px solid green');
            }
            break;
			
		case 'request-date':  // For the date field
			// Check if the value is empty
			if (!value) {
				$(this).css('border-bottom', '2px solid red');
			} else {
				// Optionally, check if the date is within a specific range
				var selectedDate = new Date(value);
				var minDate = new Date('2024-01-01'); // Example minimum date
				var maxDate = new Date('2024-12-31'); // Example maximum date

				if (selectedDate >= minDate && selectedDate <= maxDate) {
					$(this).css('border-bottom', '2px solid green');
				} else {
					$(this).css('border-bottom', '2px solid red');
				}
			}
		break;
		
        default:
            // If no special validation, just check for length
            if (value.length < 2) {
                $(this).css('border-bottom', '2px solid red');
            } else {
                $(this).css('border-bottom', '2px solid green');
            }
            break;
    }
});

	
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

    // Initialize date input handling
    handleDateInput();
	
   
    $("#proximo-equipamentos").click(function(e) {
        e.preventDefault(); // Prevent form submission (if any)
		
        // Validate required fields in "Dados Pessoais" section
        let isValid = true;

        // Check if all required fields in "dados-gerais" are filled
            // Check if all required fields in "dados-gerais" are filled
		$("#dados-gerais input[required], #dados-gerais select[required]").each(function() {
			if (!$(this).val().trim()) {
				$(this).css('border-bottom', '2px solid red'); // Set border to red if empty
				isValid = false;
			} else {
				$(this).css('border-bottom', ''); // Reset border if not empty
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
	
	    // ----------------------------------------------------------------------------------------STEP 2 STUFF---------------------------------------------------------------------------

    // When the "+ Adicionar Item" button is clicked
    $("#add-new-item").click(function() {
        // Clone the item-row form row
        var newItemRow = $("#item-row").clone();

        // Clear the inputs inside the cloned row except for the quantity input
        newItemRow.find("input").not("#quantity").val("");
        newItemRow.find("#quantity").val("");

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

        // Check if all required fields in "dados-gerais" are filled
        $("#equipamentos input[required], #equipamentos select[required]").each(function() {
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
