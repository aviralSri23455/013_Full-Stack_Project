<?php
// Database connection parameters
$servername = "localhost";  // Use the appropriate server name (usually localhost for local development)
$username = "contact"; // Your database username
$password = ""; // Your database password
$database = "contact_db"; // The name of your database

// Connect to MySQL database
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form data is received via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate the input
    $user = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $pass = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

    // Further validation (e.g., password length, email format, etc.)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    if (strlen($pass) < 6) {
        echo "Password should be at least 6 characters.";
        exit;
    }

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO contact (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $user, $email, $pass);

    // Execute the statement and check for success
    if ($stmt->execute()) {
        echo "Data submitted successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>
