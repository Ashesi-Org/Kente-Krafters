<?php
//connect to database class
require dirname (__FILE__)."/db_class.php";

class appointments_class extends db_connection
{
	//--INSERT--//
	function getFreeDoctors($date, $app_start_time, $app_end_time){
        $sql =  "SELECT emplyee_id, FirstName, LastName FROM employee, doctors_appointments WHERE emp_role ='d' 
		AND doctor_id NOT IN (
			SELECT doctor_id FROM doctors_appointments WHERE appointment_date='$date'
			AND start_time='$app_start_time'
			AND end_time='$app_end_time')";
        return $this->run_query($sql);
    }


	function assignAppointment($assigneeID, $doctorID, $patientID, 
	 $app_date, $app_start_time, $app_end_time, $app_description, $app_status){
		$sql =  "INSERT INTO doctors_appointments (
			assignee_id, doctor_id, patient_id, appointment_date, start_time, end_time, description, appointment_status)
		VALUES ('$assigneeID', '$doctorID', '$patientID', '$app_date', 
		'$app_start_time', '$app_end_time', '$app_description', '$app_status')";
        return $this->run_query($sql);
	}


	function viewAppointments($doctorID, $date){
		$sql = "SELECT * FROM doctors_appointments
		WHERE doctor_id = '$doctorID' 
		AND appointment_date = '$date' 
		AND appointment_status='N'
		ORDER BY start_time ASC";
		return $this->run_query($sql);
	}

	function markAppointmentAsDone($doctorID, $start_time, $end_time){
		$sql = "UPDATE doctors_appointments
		SET appointment_status = 'Y' 
		WHERE doctor_ID = '$doctorID'
		AND start_time = '$start_time'
		AND end_time = '$end_time'";
		return $this->run_query($sql);
	}
}	

?>