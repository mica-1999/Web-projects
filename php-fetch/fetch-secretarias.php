<?php
function fetchSecretarias($conn) {
    // Prepare the SQL statement
    $stmt = $conn->prepare("SELECT ID_Secretaria, Secretaria FROM secretarias");

    // Execute the prepared statement
    $stmt->execute();

    // Fetch all results as an associative array
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $options = "";

    // Check if there are any rows returned
    if (!empty($results)) {
        // Loop through the results and create option elements
        foreach ($results as $row) {
            $options .= '<option value="' . htmlspecialchars($row["ID_Secretaria"]) . '">' . htmlspecialchars($row["Secretaria"]) . '</option>';
        }
    } else {
        $options .= '<option value="">Sem secretárias disponíveis</option>';
    }

    return $options;
}
?>
