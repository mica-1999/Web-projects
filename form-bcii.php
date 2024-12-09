<?php
// Include the configuration file to establish the database connection
require 'php-db/config.php';

// Include the data access file to fetch secretarias
include 'php-fetch/fetch-secretarias.php';
include 'php-fetch/fetch-direcoes.php';

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
    <link rel="stylesheet" href="css/form-css.css">
</head>
<body>
    <div class="container">
        <h1>BCII NEW FORM(IN PROGRESS)</h1>
        <form method="POST" action="form.php">
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
</body>
</html>

