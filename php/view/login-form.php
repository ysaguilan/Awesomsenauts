
<?php
require_once(__DIR__ . "/../model/config.php");
?>
<link rel="stylesheet" type="text/css" href="/../Blog/bootstrap/bootstrap.min.css">
<meta name="viewport" content="minimal-ui, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"> 
<link rel="stylesheet" type="text/css" href="/../Blog/css/loginform.css">
<a href="/../Blog/amit1.php"> Back </a>
<h1>Log In</h1>

<form method="post" action="<?php echo $path . "controller/login-user.php";?>">
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
	<div class="login">
		<button type="submit">Submit</button>
	</div>
</form>
