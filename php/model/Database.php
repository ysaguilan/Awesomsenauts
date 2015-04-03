<?php
/*A class is a collection of variables and functions working with these variables 
we use class to oraginize or hide variables. we use class to access later to make a new instance of the object*/
class Database {
/*private means we cant access these variables any where else only in this file*/
private $connection;
private $host;
private $username;
private $password;
private $database;

public $error;
/*constructors are important because it allows us to build objects of type Database
its public because it needs to be able to be access from where ever in any file*/
public function __construct($host, $username, $password, $database){
/*helps us store these in our global variables so we can have access them through out our project*/
$this->host = $host;
$this->username = $username;
$this->password = $password;
$this->database = $database;

$this->connection = new mysqli($host, $username, $password);

if ($this->connection->connect_error) {
	die("<p>Error: " . $this->connect_error . "</p>");
}

$exist = $this->connection->select_db($database);

if (!exist) {
	$query = $this->connection->query("CREATE DATABASE $database");

	if ($query) {
		echo "<p>successfully created database:" . $database . "</p>";
	}
}
	else{
		echo "database already exists";
	}
}
/*opens connection*/
public function openConnection() {
	/*establishes new connection*/
	$this ->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

	/*checks for connection error for connection thats created above, closes connection if theres error, if no returns NULL */
	if($this->connection->connect_error) {
		/*paragraph tags help oraganize echos under one another*/
		die("<p>Error: " . $this->connection->connect_error . "</p>");
											}
								}
/*closes connection*/
public function closeConnection() {
	/*checks if variable has been set, checkecks there's any information present in the variable, if yes returns true*/
	if (isset($this->connection)) {
		$this->connection->close();
        
        }
        }
/*runs query*/
public function query($string) {
/*calls on open connection function*/
$this->openConnection();
/*queries connection, excutes a query in database*/
$query = $this->connection->query($string);
/*is query is false turns it to true*/
if(!$query){
	$this->error = $this->connection->error;
}
/*closes connection*/
$this->closeConnection();
/*returns results of $query*/
return $query;
}
}