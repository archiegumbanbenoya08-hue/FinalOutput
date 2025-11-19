<?php
// Explicit, robust CORS handling so preflight responses include required headers
$allowedOrigins = [
    'http://localhost:3000',
    'http://localhost'
];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: *");
}
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight (OPTIONS) — respond early with the same CORS headers
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chie_inventory";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check DB connection
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// ----------- GET (READ) -----------
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT id, name, quantity, price FROM items");
    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
    exit();
}

// ----------- POST (CREATE) -----------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input) {
        echo json_encode(["error" => "Invalid JSON"]);
        exit();
    }

    if (!isset($input['name'], $input['quantity'], $input['price'])) {
        echo json_encode(["error" => "Missing required fields"]);
        exit();
    }

    $name = $conn->real_escape_string($input['name']);
    $quantity = (int)$input['quantity'];
    $price = (float)$input['price'];

    $sql = "INSERT INTO items (name, quantity, price)
            VALUES ('$name', '$quantity', '$price')";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
    exit();
}

// ----------- PUT (UPDATE) -----------
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input || !isset($input['id'])) {
        echo json_encode(["error" => "Missing ID or invalid JSON"]);
        exit();
    }

    $id = (int)$input['id'];
    $name = $conn->real_escape_string($input['name']);
    $quantity = (int)$input['quantity'];
    $price = (float)$input['price'];

        $sql = "UPDATE items SET 
            name='$name', 
            quantity=$quantity, 
            price=$price
            WHERE id=$id";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
    exit();
}

// ----------- DELETE (REMOVE) -----------
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str($_SERVER['QUERY_STRING'], $query);
    $id = $query['id'] ?? null;

    if (!$id) {
        echo json_encode(["error" => "Missing ID"]);
        exit();
    }

    $sql = "DELETE FROM items WHERE id=$id";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
    exit();
}

$conn->close();
?>
