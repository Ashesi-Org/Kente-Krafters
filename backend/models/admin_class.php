<?php
//connect to database class
require dirname (__FILE__)."/../credentials/db_class.php";

class admin_class extends db_connection
{
	//Updating Profile
	function updateProfile(){}
	function updateTelNo(){}
	function updateFirstName(){}
	function updateLastName(){}
	function updateEmail(){}
	function changePassword(){}


	//Deleting Profile
	function deleteProfile(){}


	//Admin Job
	function suspendUser(){}
	function activateUser(){}
	function suspendProduct(){}
	function activateProduct(){}
	function flagProduct(){}
	function flagAccount(){}
	function sendWarningEmail(){}


	//Product Management
	function getAllProducts(){}
	function getSellersCatalogue(){}
	function getAProduct(){}
}	

?>