<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Register Page</title>
</head>
<body>



	<h2>Register Here</h2>
	<!-- register form -->
	<form>
	  <label>User Name:</label><br>
	  <input type="text"name="uname" id='uname'onfocus="validatePost()"><br>
	  <label>User Pass:</label><br>
	  <input type="password" name="upass" id='upass'><br><br>
	  <input type="button" id='register' name="register" value="Register">
	</form> 

	<!-- link to register -->
	<a href="login.php">Go to Login Page</a>

	<script>
		function validatePost(){
			alert("I am in js page");
			const date = document.getElementById('selectDate');
			const startTime = document.getElementById('selectStartTime');
			
			const userregister = document.getElementById('register');

			//Create object from XMLHttpRequesr class
			const req = new XMLHttpRequest();

			//function to handle ajax request
			function handleAjax(){
				ajax.onreadystatechange = handler;
				ajax.open("POST", 'register_proc.php');

				//define the POST parameters
				const params = `uemail=${useremail.value}&upass=${userpass.value}&register=`

				//set the header
				ajax.setRequestHeader(
					"Content-Type",
					"application/x-www-form-urlencoded"
				);

				//call our send method
				ajax.send(params);
			}

			//
			function handler(){
				//process response here
				if(ajax.readyState === XMLHttpRequest.DONE){
					//check status code
					if(ajax.status === 200){
						//Everything is fine, proceed
					}
					else{
						//Something went wrong
					}
				}

			}
		}
	</script>

</body>
</html>