<?php
	session_start();
	unset($_SESSION['uid']);
	unset($_SESSION['uname']);
	unset($_SESSION['urole']);
	header("location: index.php");
	exit();
?>