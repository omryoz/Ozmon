<?php

//require __DIR__.'../vendor/autoload.php';

//$app = new Slim\Slim();
//use \Slim\Slim AS Slim;
//$app = new Slim();


require __DIR__.'/../vendor/autoload.php';
use \Slim\Slim AS Slim;


$app = new Slim();
//$app = new Slim\Slim();

$app->get('/contacts', 'getContacts'); //returns all contacts
$app->get('/contacts/getAttributes', 'getAttributes');
$app->get('/contacts/:id', 'getContact');
$app->post('/add_contact', 'addContact');
$app->put('/contacts/:id', 'updateContact');
$app->delete('/contacts/:id', 'deleteContact');
$app->get('/test', 'getContacts2');
$app->run();

function getContacts() {

	try {
		$contacts = Contact::all();

		echo ($contacts);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getContacts2() {

	try {
		$contacts = Contact::all();

		echo ($contacts);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

}
function getAttributes() {

    try {
		$contact = new Contact();
		$columns= $contact->getColumns();
    		echo json_encode($columns);
    	} catch(PDOException $e) {
    		echo '{"error":{"text":'. $e->getMessage() .'}}';
    	}
}
function getContact($id) {
    try {
		$contact = Contact::find($id);
		echo ($contact);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addContact() {
	$request = Slim::getInstance()->request();
	$contactData = json_decode($request->getBody(),true);

	try {
		$contact = Contact::create($contactData);
		echo $contact;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateContact($id) {
	$request = Slim::getInstance()->request();
	$contactData = json_decode($request->getBody());
	try {
		$contact = Contact::find($id);
		foreach ($contactData as $key => $value) {
			if ($key != 'id' || $value!=$contact->id) {
				$contact->$key = $value;
			}
		}
		$contact->save();
		echo json_encode($contact);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteContact($id) {

	try {
		$contact = Contact::find($id);
		echo $contact->delete();
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="ozmon";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}
?>