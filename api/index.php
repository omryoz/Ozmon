<?php

//require __DIR__.'../vendor/autoload.php';

//$app = new Slim\Slim();
//use \Slim\Slim AS Slim;
//$app = new Slim();


require __DIR__.'/../vendor/autoload.php';
use \Slim\Slim AS Slim;
$app = new Slim();
//$app = new Slim\Slim();


$app->get('/users', 'getUsers');
$app->get('/users/:id', 'getUser');
$app->post('/add_user', 'addUser');
$app->put('/users/:id', 'updateUser');
$app->delete('/users/:id', 'deleteUser');
$app->get('/test', 'getUsers2');
$app->run();


function getUsers() {

	try {
		$contacts = User::all();

		echo ($contacts);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getUsers2() {

    try {
        $contacts = User::all();


    		echo $contacts;
    	} catch(PDOException $e) {
    		echo '{"error":{"text":'. $e->getMessage() .'}}';
    	}
}
function getUser($id) {
    try {
		$contact = User::find($id);
		echo ($contact);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addUser() {
	$request = Slim::getInstance()->request();
	$userData = json_decode($request->getBody(),true);

	try {
		$user = User::create($userData);
		echo $user;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateUser($id) {
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	$sql = "UPDATE users SET username=:username, first_name=:first_name, last_name=:last_name, address=:address WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("username", $user->username);
		$stmt->bindParam("first_name", $user->first_name);
		$stmt->bindParam("last_name", $user->last_name);
		$stmt->bindParam("address", $user->address);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($user);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteUser($id) {

	try {
		$user = User::find($id);
		echo $user->delete();
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