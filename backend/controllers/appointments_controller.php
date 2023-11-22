<?php
//connect to the user account class
require dirname (__FILE__)."/../models/appointments_class.php";

//--SELECT--//
function getFreeDoctors_cntrl($date, $start_time, $end_time){
    $crud = new appointments_class;
    $request = $crud->getFreeDoctors($date, $start_time, $end_time);

    if($request){
        $posts = array();
        while($record = $crud->fetch()){
            $posts[] = $record;
        }
        return $posts;
    }else{
        return false;
    }
}
function assignAppointment_cntrl($assigneeID, $doctorID, $patientID, 
$app_date, $app_start_time, $app_end_time, $app_description, $app_status){
    $crud = new appointments_class;
    $request = $crud->assignAppointment($assigneeID, $doctorID, $patientID, 
    $app_date, $app_start_time, $app_end_time, $app_description, $app_status);

}
function viewAppointments_cntrl($doctorID, $date){
    $crud = new appointments_class;
    $request = $crud->viewAppointments($doctorID, $date);
    if($request){
        $posts = array();
        while($record = $crud->fetch()){
            $posts[] = $record;
        }
        return $posts;
    }else{
        return false;
    }
}
?>