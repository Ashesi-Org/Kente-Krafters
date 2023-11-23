<?php
//connect to database class
require dirname (__FILE__)."/../credentials/db_class.php";

class seller_class extends db_connection
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


	//Product Management
	function getAllProducts(){}
	function getSellersCatalogue(){}
	function getAProduct(){}
	
	//Shipping
	function getOrderShippingInfo(){}
	function getAllShipments(){}
	function getOrderDeliveryStatus(){}


	//General Order Details
	function getOrder(){}
	function getAllOrders(){}
	function getOrderQuantity(){}
	function getOrderUnitPrice(){}
		
	//Stole Order Details
	function getStoleOrderDetails(){}
		
	//Custom Fabric Order
	function getCustFabricOrderDetails(){}
}	

?>