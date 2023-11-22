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
	function updateBusinessName(){}
	function updateMomoNumber(){}
	function updateEmail(){}


	//Deleting Profile
	function deleteProfile(){}


	//Product Management
	function addNewProduct(){}
	function deleteProduct(){}
	function viewAllProducts(){}
	function viewProduct(){}
	function editProduct(){}
	function editProductName(){}
	function editProductPrice(){}
	function editProductDescription(){}
	function editProductQuantity(){}
	function editProductImage(){}

	//Order Management
	function viewAllOrders(){}
	function viewAOrder(){}

	
	//Shipping
	function createShipment(){}
	function cancelShipment(){}
	function pauseShipment(){}
	function displayShipmentInfo(){}
	function trackShipment(){}
	function claimAPayment(){}
	function getShippingInfo(){}
	function getDeliveryStatus(){}


	//General Order Details
	function viewProductOrder(){}
	function viewOrderQuantity(){}
	function viewOrderUnitPrice(){}
		
	//Stole Order Details
	function viewStoleOrderDetails(){}
	function viewStoleOrderTexture(){}
	function viewStoleOrderColor(){}
	function viewStoleOrderWidth(){}
	function viewStoleOrderLength(){}
	function viewStoleOrderLogo(){}
	function viewStoleOrderFinalDesign(){}
	
	
	//Custom Fabric Order
	function viewCustFabricOrderDetails(){}
	function viewCustFabricOrderTexture(){}
	function viewCustFabricOrderFinalDesign(){}
	function viewCustFabricWidth(){}
	function viewCustFabricLength(){}

}	

?>