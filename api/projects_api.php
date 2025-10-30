<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../class/database.php';
include_once '../class/Project.php';

$database = new Database();
$db = $database->connect();
$project = new Project($db);

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Get all projects
    $result = $project->read();
    $num = $result->rowCount();

    if ($num > 0) {
        $projects_arr = array();
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $project_item = array(
                'id' => $id,
                'title' => $title,
                'description' => $description,
                'project_url' => $project_url,
                'repo_url' => $repo_url,
                'project_date' => $project_date,
                'image_url' => $image_url
            );
            array_push($projects_arr, $project_item);
        }
        http_response_code(200);
        echo json_encode($projects_arr);
    } else {
        http_response_code(404);
        echo json_encode(array('message' => 'No projects found.'));
    }
} else {
    // Add other methods (POST for add, update, delete)
    // following the pattern from skills_api.php
    http_response_code(405);
    echo json_encode(array('message' => 'Method Not Allowed (GET only for this example)'));
}
?>

