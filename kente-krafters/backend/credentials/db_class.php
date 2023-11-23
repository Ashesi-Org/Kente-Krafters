<?php
require dirname (__FILE__).'/./db_cred.php';

class db_connection
{
	//properties
	public $database;
	public $result;

	function db_connect() {
		//Connect to database
		$this->database = mysqli_connect(SERVERNAME, HOSTNAME, PASSWD, DATABASE);

		//Check if connection is successful
		if(mysqli_connect_errno()) 
			return false;
		else 
			return true;
	}

	function run_query($query) {
		if(!$this->db_connect() || $this->database == null)
			return false;
		$this->result = mysqli_query($this->database, $query);
		if($this->result == false)
			return false;
		else
			return true;
	}

	function fetch() {
		if($this->result == null || $this->result == false)
			return false;

		return mysqli_fetch_assoc($this->result);
	}	
}
?>