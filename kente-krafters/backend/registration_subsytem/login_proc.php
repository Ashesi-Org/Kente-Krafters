<?php

require dirname (__FILE__)."/../credentials/db_class.php";

if (isset($_POST['login'])) {
	echo "Login details submitted";

	$myEmail = $_POST['uname'];
	$myPassword = $_POST['upass'];
	
	$userID;
	$userPass;
	$userFirstName;
	$userLastName;
	$userCountry;
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
		$sql = "SELECT * FROM User WHERE email = '$userEmail'";
		$result = mysqli_query($conn, $sql);

		if ($result) {
			if (mysqli_num_rows($result) > 0) {
				// GET DATA FOR EACH ROW
				$row = mysqli_fetch_assoc($result);
				$userID = $row["user_id"];
				$userRole = $row["user_role"];
				$userPass = $row["user_passwordhash"];
				$userFirstName = $row["first_name"];
				$userLastName = $row["last_name"];
				$userCountry = $row["country"];
				$userStatus = $row["user_status"];
			}

			//Password verification
			if (password_verify($mypassword, $userPass)) {

				//Status verification
				if ($userStatus == 'active') {
					session_start();
					$_SESSION['uid'] = $userID;
					$_SESSION['uname'] = $userFirstName;
					$_SESSION['urole'] = $userRole;
					$_SESSION['user_IP_Address']= $_SERVER['REMOTE_ADDR'];
					
					
					//Check for user role
					if ($userRole == 'seller') {
						header("location: sellerindex.php");
						exit();
					}
					if ($userRole == 'admin') {
						header("location: adminindex.php");
						exit();
					}
					if ($userRole == 'customer') {
					    header("location: customerindex.php");
					    exit();
					}
				}
				if ($userStatus == 'inactive'){
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