
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
include "Items.php";
include "Furniture.php";
include "DVD.php";
include "Book.php";

$method = $_SERVER['REQUEST_METHOD'] ?? "GET";

if ($method == "OPTIONS") {
    http_response_code(200);
    exit();
}


require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
// Connecting to db
$url = $_ENV["DATABASE_URL"];
$databasename = $_ENV["DATABASE_NAME"];
$username = $_ENV["USERNAME"];
$password = $_ENV["DATABASE_PASSWORD"];

$objectDb = new DbConnect($url, $databasename, $username, $password);
$conn = $objectDb->connect();

//Seperating request behavior
switch ($method) {
    case "POST":
        $item_sku = $_POST['item_sku'] ?? null;
        $item_name = $_POST['item_name'] ?? null;
        $item_price = $_POST['item_price'] ?? null;
        $item_type = $_POST['item_type'] ?? null;
        $item_feature = $_POST['item_feature'] ?? null;
        //Just if conditions for error handling, and not for the logic of the products
        if (!$item_sku || !$item_name || !$item_price || !$item_type || !$item_feature) {
            echo json_encode(['status' => 'error', 'message' => 'Missing product data', 'type' => $item_type]);
            exit();
        }
        if (class_exists($item_type)) {
            $product = new $item_type($item_sku, $item_name, $item_price, $item_feature);
            if ($product->checkExists($conn, $item_sku)) {
                echo json_encode(['status' => 'error', 'message' => 'Item SKU already exists']);
                exit();
            }
            $product->save($conn);
            echo json_encode(['status' => 'success', 'message' => 'POST received', 'item_name' => $product->getName(), 'item_price' => $item_price, 'item_sku' => $item_sku, 'item_type' => $item_type]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid product type']);
        }
        break;

    case "GET":
        $items_class = new Furniture(null,null,null,null);
        $items_class->getItems($conn);
        exit();

    case "DELETE":
        $inputs = json_decode(file_get_contents('php://input'), true);
        $seperated = implode(', ', $inputs);
        $items_class = new Furniture(null,null,null,null);
        $items_class->deleteItems($conn, $seperated);
        break;

    default:
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
        break;
}

