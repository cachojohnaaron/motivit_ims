<?php
include "./db.php";
if (isset($_SERVER['HTTP_ORIGIN'])) {
	// Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
	// you want to allow, and if so:
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 1000');
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
			// may also be using PUT, PATCH, HEAD etc
			header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
	}

	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
			header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
	}
	exit(0);
}
$res = array('error' => false);
$action='';

if (isset($_GET['action'])){

    $action=$_GET['action'];
}

//fncn start

if($action=='ddDepartment'){
	$sql="SELECT * FROM `dropdown` WHERE title = 'department'";		
}

if($action=='ddCategory'){
	$sql="SELECT * FROM `dropdown` WHERE title = 'category'";		
}

if($action=='ddStatus'){
	$sql="SELECT * FROM `dropdown` WHERE title = 'asset_status'";		
}

if($action=='ddEmployee'){
	$sql="SELECT * FROM `employee` WHERE visibility = 'true' ORDER BY emp_id desc";		
}

if($action=='ddAccessoryCategory'){
	$sql="SELECT * FROM `dropdown` WHERE title = 'acs_category'";		
}






$result=$conn->query($sql);
$num=mysqli_num_rows($result);
$userData=array();
if($num >0){
    while($row=$result->fetch_assoc()){
        array_push($userData,$row);
    }
    $res['error']=false;
    $res['user_Data']=$userData;

}else{
    $res['error']=false;
    $res['message']="No Data Found!";
}

$conn -> close();
header("Content-type: application/json");
echo json_encode($res);
die();

?>