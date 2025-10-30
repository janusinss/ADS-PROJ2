<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../class/database.php';
include_once '../class/Hobby.php';

$database = new Database();
$db = $database->connect();
$hobby = new Hobby($db);

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Get all hobbies
    $result = $hobby->read();
    $num = $result->rowCount();

    if ($num > 0) {
        $hobbies_arr = array();
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $hobby_item = array(
                'id' => $id,
                'name' => $name,
                'description' => $description
            );
            array_push($hobbies_arr, $hobby_item);
        }
        http_response_code(200);
        echo json_encode($hobbies_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'No hobbies found.'));
    }
} else {
    // Add other methods (POST for add, update, delete)
    // following the pattern from skills_api.php
    http_response_code(405);
    echo json_encode(array('message' => 'Method Not Allowed (GET only for this example)'));
}
?>

