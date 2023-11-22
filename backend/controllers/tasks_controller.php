<?php
//connect to the user account class
require dirname (__FILE__)."/../models/tasks_class.php";

//--SELECT--//
function getFreeNurses_cntrl($date, $start_time, $end_time){
    $crud = new task_class;
    $request = $crud->getFreeNurses($date, $start_time, $end_time);

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



function viewDailyTasks_cntrl($nurseID, $date){
    $crud = new task_class;
    $request = $crud->viewDailyTasks($nurseID, $date);
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

function assignTask_cntrl($assigneeID, $nurse_ID, $task_date, $start_time, $end_time, $description, $task_status){
    $crud = new task_class;
    $request = $crud->assignTask($assigneeID,  $nurse_ID, $task_date, $start_time, $end_time, $description, $task_status);

}

?>