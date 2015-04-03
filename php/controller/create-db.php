<?php
/*Objects are important because they let us store,access the information, or modify the information*/
/*gives us access to model folder checks if file is in
memory if so use the file stored in memory*/
	require_once(__DIR__ . "/../model/config.php");

/*creates table for users called users, we use session variable connection because that is where database connection is stored*/
	$query = $_SESSION["connection"]->query("CREATE TABLE users ("/*sql language allows us to send queries and executes them onto database*/
		 . "id int(11) NOT NULL AUTO_INCREMENT,"/*auto increments id*/
		 . "username varchar(30) NOT NULL,"/*for usernames, can be 30 characters or less, cant be empty*/
		 . "email varchar(50) NOT NULL,"/*for emails, can be 50 characters or less, cant be empty*/
		 . "password char(128) NOT NULL," /*for passwords, can be 128 characters or less, cant be empty*/
		 . "salt char(128) NOT NULL," /*makes it harder for hacker to inject scripts into website, up to 128 characters, cant be empty*/
		 . "exp int(4),"
		 . "exp1 int(4),"
		 . "exp2 int(4),"
		 . "exp3 int(4),"
		 . "exp4 int(4),"
		 . "PRIMARY KEY (id))");/*the way table are connected to each other, tells table primary key is id*/
	/*checks if query "users was successfully created"*/
	if ($query) {
		/*echos this if successful*/
			echo "<p>successfully created table users</p>";
	}
	else{
		/*echos connection error if not successful*/
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}	
?>