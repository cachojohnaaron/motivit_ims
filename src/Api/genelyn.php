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


/*admin functions*/

//working 3-7-22 sample
if($action=="sample1234"){
    $username=$_POST['username'];
    $password=$_POST['password'];
    $sql="Select * from login where username='$username' AND password='$password' AND visibility = 'true'";
    $result=$conn->query($sql);
    $num=mysqli_num_rows($result);
    if($num > 0){
        $res['message']="Login Succesfully";
    }
    else{
        $res['error']=true;
        $res['message']="Your Email or Password is invalid!";  
    }
}



//insert your if statements below


#code here

$conn -> close();
header("Content-type: application/json");
echo json_encode($res);
die();

?>