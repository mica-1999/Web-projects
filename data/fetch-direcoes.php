<?php
function fetchDirecao($conn) {
    // Prepare the SQL statement
    $stmt = $conn->prepare("SELECT ID_Direcao, Name FROM dir_regional");

    // Execute the prepared statement
    $stmt->execute();

    // Fetch all results as an associative array
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $options = "";

    // Check if there are any rows returned
    if (!empty($results)) {
        // Loop through the results and create option elements
        foreach ($results as $row) {
            $options .= '<option value="' . htmlspecialchars($row["ID_Direcao"]) . '">' . htmlspecialchars($row["Name"]) . '</option>';
        }
    } else {
        $options .= '<option value="">Sem direções disponíveis</option>';
    }

    return $options;
}
?>