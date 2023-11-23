<?php
//connect to database class
require dirname (__FILE__)."/../credentials/db_class.php";

class cart_class extends db_connection
{
	//--INSERT--//
	function checkout(){}
	function showItem(){}
	function addItem(){}
	function removeItem(){}
	function clearCart(){}
	function calcTotalPrice(){}
	function changeProductQuantity(){}
}	
?>