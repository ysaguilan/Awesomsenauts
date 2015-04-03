<link rel="stylesheet" type="text/css" href="/../Blog/bootstrap/bootstrap.min.css">
<meta name="viewport" content="minimal-ui, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<link rel="stylesheet" type="text/css" href="/../Blog/css/registerform.css">
<a class= "back" href="/../Blog/amit1.php"> Back </a>
<?php
/*inserts config code into this php file*/
require_once(__DIR__ . "/../model/config.php");
?>

<h1>Register</h1>
<!--creates a form for registration-->
<form method="post" action= "<?php echo $path . "controller/create-user.php";?>">

<!--creates text space for email-->
	<div>
	<label class="email" for="email">Email:</label>
	<input type="text" name="email" />
	</div>
	<!--creates textspace for username-->
	<div>
	<label class="username" for="username">Username:</label>
	<input type="text" name="username"/>
	</div>
<!--creates a text space for password-->
	<div>
	<label class="password" for="password">Password:</label>	
	<!--type is password so that little black dots appear instead of letters when user is typing a password-->
	<input type="password" name="password"/>
	</div>
<!--creates button called submit-->
	<div class="register">
	<button type="submit"><a href="/../Blog/amit1.php"></a> Submit </button>
	</div>
</form>