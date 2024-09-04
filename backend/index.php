<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_error.log');

// Set headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

include "DbConnect.php";
include "items.php";
include "Furniture.php";
include "DVD.php";
include "Book.php";

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    http_response_code(200);
    exit();
}

// Connecting to db
$objectDb = new DbConnect;
$conn = $objectDb->connect();

//Seperating request behavior
switch ($method) {
    case "POST":
        $input = json_decode(file_get_contents('php://input'), true);
        $item_sku = $input['item_sku'] ?? null;
        $item_name = $input['item_name'] ?? null;
        $item_price = $input['item_price'] ?? null;
        $item_type = $input['item_type'] ?? null;
        $item_feature = $input['item_feature'] ?? null;
        //Just if conditions for error handling, and not for the logic of the products
        if (!$item_sku || !$item_name || !$item_price || !$item_type || !$item_feature) {
            echo json_encode(['status' => 'error', 'message' => 'Missing product data', 'type' => $item_type]);
            exit();
        }
        if (class_exists($item_type)) {
            $product = new $item_type($item_sku, $item_name, $item_price, $item_feature);
            $product->save($conn);
            echo json_encode(['status' => 'success', 'message' => 'POST received', 'item_name' => $product->getName(), 'item_price' => $item_price, 'item_sku' => $item_sku, 'item_type' => $item_type]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid product type']);
        }
        break;

    case "GET":
        $sql = "SELECT * FROM items_information;";
        $statement = $conn->prepare($sql);
        if ($statement->execute()) {
            $items = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['status' => 'success', 'data' => $items]);
            exit();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Database insert failed']);
            exit();
        }

    case "DELETE":
        $inputs = json_decode(file_get_contents('php://input'), true);
        $seperated = implode(', ', $inputs);
        $query = "DELETE FROM items_information WHERE id IN ($seperated);";
        $statement = $conn->prepare($query);
        if ($statement->execute()) {
            echo json_encode(['message' => 'SUCCESS']);
            exit();
        } else {
            echo json_encode(['message' => 'FAILED']);
            exit();
        }

    default:
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
        break;
}

