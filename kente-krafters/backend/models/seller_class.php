<?php
//connect to database class
require dirname (__FILE__)."/../credentials/db_class.php";

class seller_class extends db_connection
{
	//Updating Profile
	function updateProfile(){}
	
	function updateTelNo($seller_id, $new_tel_no){
	    $sql =  "UPDATE Seller SET seller_tel_no='$new_tel_no' WHERE seller_id = '$seller_id')";
	    return $this->run_query($sql);
	}
	
	function updateFirstName($seller_id, $new_first_name){
	    $sql =  "UPDATE Seller SET first_name='$new_first_name' WHERE seller_id = '$seller_id')";
	    return $this->run_query($sql);
	}
	
	function updateLastName($seller_id, $new_last_name){
	    $sql =  "UPDATE Seller SET last_name='$new_last_name' WHERE seller_id = '$seller_id')";
	    return $this->run_query($sql);
	}
	
	function updateBusinessName($seller_id, $new_business_name){
	    $sql =  "UPDATE Seller SET business_name='$new_business_name' WHERE seller_id = '$seller_id')";
	    return $this->run_query($sql);
	}
	function updateMomoNumber($seller_id, $new_momo_number){
	    $sql =  "UPDATE Seller SET momo_number='$new_first_name' WHERE seller_id = '$seller_id')";
	    return $this->run_query($sql);
	}
	function updateEmail($seller_id, $new_email){
	    $sql =  "UPDATE Seller SET email='$new_first_name' WHERE seller_id = '$seller_id')";
	    return $this->run_query($sql);
	}


	//Deleting Profile
	function deleteProfile(){}

	
	//Product Management
	function addNewProduct($seller_id, $product_name, $yards, $description, $price, $image_link){
	    $sql =  "INSERT INTO Product(
			seller_id, product_name, yards, description, price, image_link, approval_status)
		VALUES ('$seller_id', '$product_name', '$yards', '$description', '$price' '$image_link', 'inactive')";
	    return $this->run_query($sql);
	}
	
	//Delete Product--Rather Deactivate
	function deleteProduct(){}
	
	
	function viewActiveProducts($seller_id){
	    $sql =  "SELECT seller_id, product_name, yards, description, price, image_link FROM Product WHERE (approval_status='active' AND seller_id ='$seller_id'))";
	    return $this->run_query($sql);
	}
	
	function viewInactiveProducts($seller_id){
	    $sql =  "SELECT seller_id, product_name, yards, description, price, image_link FROM Product WHERE (approval_status='inactive' AND seller_id ='$seller_id'))";
	    return $this->run_query($sql);
	}
	
	function viewProduct($seller_id, $product_id){
	    $sql =  "SELECT seller_id, product_name, yards, description, price, image_link, approval_status FROM Product WHERE (product_id=$product_id AND seller_id ='$seller_id'))";
	    return $this->run_query($sql);
	}
	
	
	//Editing a Product
	function editProduct(){}
	function editProductName($seller_id, $product_id, $new_product_name){
	    $sql =  "UPDATE Product SET ='$new_product_name' WHERE (seller_id = '$seller_id' AND product_id='$product_id'))";
	    return $this->run_query($sql);
	}
	function editProductPrice($seller_id, $product_id, $new_product_price){
	    $sql =  "UPDATE Product SET ='$new_product_price' WHERE (seller_id = '$seller_id' AND product_id='$product_id'))";
	    return $this->run_query($sql);
	}
	function editProductDescription($seller_id, $product_id, $new_product_description){
	    $sql =  "UPDATE Product SET ='$new_product_description' WHERE (seller_id = '$seller_id' AND product_id='$product_id'))";
	    return $this->run_query($sql);
	}
	function editProductQuantity($seller_id, $product_id, $new_product_quantity){
	    $sql =  "UPDATE Product SET ='$new_product_quantity' WHERE (seller_id = '$seller_id' AND product_id='$product_id'))";
	    return $this->run_query($sql);
	}
	
	function editProductQuantity($seller_id, $product_id, $new_product_quantity){
	    $sql =  "UPDATE Product SET ='$new_product_quantity' WHERE (seller_id = '$seller_id' AND product_id='$product_id'))";
	    return $this->run_query($sql);
	}	
	
	function editProductImage($seller_id, $product_id, $new_product_image){
	    $sql =  "UPDATE Product SET ='$new_product_image' WHERE (seller_id = '$seller_id' AND product_id='$product_id'))";
	    return $this->run_query($sql);
	}
	
	//When an order is made, quantity is decreased
	function decreaseProductQuantity($seller_id, $product_id){}
	
	function addToStock(){}
	
	function reduceStock(){}

	
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