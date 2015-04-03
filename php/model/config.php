<?php
require_once(__DIR__ . "/database.php");

session_start();
session_regenerate_id(true);
/*variable allows us to update files that have been moved from different server or folder*/
$path ="/YulitzaSAwesomenauts/php/";

/*variables for php database server info*/
	$host = "localhost";/*stores host*/
	$username = "root"; /*stores usernames*/
	$password = "root"; /*stores password*/
	$database = "awesomenauts_db"; /*stores info in blog database*/

	/*checks is session variable; Session variables hold database*/
	if(!isset($_SESSION["connection"])) {
		
	/*uses the mysqli to create new object: database, this is based off the class named database*/
		$connection = new Database($host, $username, $password, $database);

		$_SESSION["connection"] = $connection;

	}