# Step 1: Use a Local Web Server
- If you're developing on your local machine, consider using a local development environment that bundles a web server and PHP, like XAMPP, WAMP, or MAMP (for Mac users). These platforms provide an easy way to set up a PHP development environment.

- Download and Install: Choose a local server package (e.g., XAMPP, WAMP) and install it on your machine.
- Start the Server: Once installed, open the control panel or manager for your package and start the Apache web server (and MySQL, if needed).


# Step 2: Move PHP Files to Web Server's Directory

- After setting up your local web server, you must place your PHP files in the web server's root directory. Here's where to move the contact.php and contact.html files:

- XAMPP: The web server root is typically C:/xampp/htdocs/.

- WAMP: The root is usually C:/wamp64/www/.

- Move your project folder (e.g., "Project") to the server's root directory. Your new folder structure might look like this:

``` 
C:/xampp/htdocs/Project/
  ├── Html/
  │   ├── contact.html
  ├── contact.php

```

# Step 3: Database Setup

- Here is an example MySQL command to create a simple table for storing contact form data

```sql
CREATE TABLE contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,  -- Consider hashing passwords in production
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```


# Step 4: Contact.php

```php
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

```


# Step 5: Access via Localhost

- With the web server running and your files in the correct directory, access your HTML and PHP files through localhost in your browser:

- If you moved your project to C:/xampp/htdocs/Project/, access it with the URL

- **http://localhost/Project/Html/contact.html**
