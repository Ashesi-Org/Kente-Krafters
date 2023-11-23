<?php

if (isset($_POST['login'])) {
	echo "Login details submitted";

	$myusername = $_POST['uname'];
	$mypassword = $_POST['upass'];

	$userID;
	$userPass;
	$userName;
	$userRole;
	$userStatus;

	//database connection parameters
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "WovenAfrica";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		//stop executing the code and echo error
		header("location: login.php");
		exit();
	} else {
		$sql = "SELECT * FROM user_table WHERE user_name = '$myusername'";
		$result = mysqli_query($conn, $sql);

		if ($result) {
			if (mysqli_num_rows($result) > 0) {
				// GET DATA FOR EACH ROW
				$row = mysqli_fetch_assoc($result);
				$userID = $row["user_id"];
				$userRole = $row["user_role"];
				$userPass = $row["user_pass"];
				$userName = $row["user_name"];
				$userStatus = $row["user_status"];
			}

			//Password verification
			if (password_verify($mypassword, $userPass)) {

				//Status verification
				if ($userStatus == 1) {
					session_start();
					$_SESSION['uid'] = $userID;
					$_SESSION['uname'] = $userName;
					$_SESSION['urole'] = $userRole;
					
					//Check for user role
					if ($userRole == 1) {
						header("location: adminindex.php");
						exit();
					}
					if ($userRole == 2) {
						header("location: standardindex.php");
						exit();
					}
				}
				if ($userStatus == 2){
					header("location: inactive.php");
					exit();
				}
			} else {
				header("location: login.php");
				exit();
			}
		}
	}
}
?>