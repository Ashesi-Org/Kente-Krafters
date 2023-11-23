<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Login Page</title>
</head>
<body>
	 
	 <h2>Login Here</h2>
	 <!-- login form -->
	 <form  action="login_proc.php" method="POST">
	  <label>User Name:</label><br>
	  <input type="text"name="uname"><br>
	  <label>User Pass:</label><br>
	  <input type="password" name="upass"><br><br>
	  <input type="submit" name="login" value="Login">
	</form> 

	<!-- link to register -->
	<a href="register.php">Go to Register Page</a>

</body>
</html>