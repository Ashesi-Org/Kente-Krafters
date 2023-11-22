<?php
require dirname (__FILE__)."/../controllers/appointments_controller.php";


if (isset($_POST['assignAppointment'])) {
	echo "Assigning Appointment!";

	$nurseID = 'NR5';
	$patientID = $_POST['patientID'];
	$doctorID = $_POST['selectDoctor'];
	$app_date = $_POST['selectTaskDate'];
	$app_start_time = $_POST['selectStartTime'];
	$description = $_POST['taskDescr'];

	assignAppointment_cntrl($nurseID, $doctorID, $patientID, $app_date, 
	$app_start_time, $app_start_time, $description, 'N');
	}
	else{
		//
	}
?>