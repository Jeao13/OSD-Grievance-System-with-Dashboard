<?php
header('Access-Control-Allow-Origin: http://localhost:8100');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$xmlFile = 'ionic-form-ui/src/assets/data.xml'; // Replace with the path to your XML file

// Retrieve the new element data from the request payload
$data = json_decode(file_get_contents('php://input'), true);
$newUsername = $data['srcode'];
$newUsername1 = $data['dept'];
$newMessage = $data['violation'];
$newMessage1 = $data['report'];
$time = $data ['timestamp'];
$status = $data ['status'];



// Load the XML file
$doc = new DOMDocument();
$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;
$doc->load($xmlFile);

// Create a new <data> element if there are values for username and message
if (!empty($newUsername) || !empty($newMessage)) {
    $newData = $doc->createElement('data');

    if (!empty($newUsername)) {
        $usernameElement = $doc->createElement('srcode', $newUsername);
        $newData->appendChild($usernameElement);
    }
    
    if (!empty($newUsername1)) {
        $usernameElement = $doc->createElement('dept', $newUsername1);
        $newData->appendChild($usernameElement);
    }

    if (!empty($newMessage)) {
        $messageElement = $doc->createElement('violation', $newMessage);
        $newData->appendChild($messageElement);
    }

    if (!empty($newMessage1)) {
        $messageElement = $doc->createElement('report', $newMessage1);
        $newData->appendChild($messageElement);
    }

    if (!empty($time)) {
        $messageElement = $doc->createElement('timestamp', $time);
        $newData->appendChild($messageElement);
    }

    if (!empty($status)) {
        $messageElement = $doc->createElement('status', $status);
        $newData->appendChild($messageElement);
    }

    // Append the new <data> element to the root element
    $root = $doc->documentElement;
    $root->appendChild($newData);
}

// Save the modified XML back to the file
$doc->save($xmlFile);

// Send a response indicating success
header('Content-Type: application/json');
echo json_encode(['message' => 'Element added successfully']);
?>
