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

if($action=="login"){

    $_username=$_POST['username'];
    $_password=$_POST['password'];

	$username = filter_var($_username, FILTER_SANITIZE_STRING);
	$password = filter_var($_password, FILTER_SANITIZE_STRING);

	$sql = "SELECT id from login where username = '$username'";
	$result=$conn->query($sql);
	$num=mysqli_num_rows($result);
	$userData=array();
    
	$stmt = $conn->prepare("SELECT id,username,password FROM login where username = ?");
	$stmt->bind_param("s", $username);

	$stmt->execute();
	$stmt->store_result();

	$stmt->bind_result($userid, $uname, $pw);

	if($stmt->num_rows == 1) {
		//echo "found 1 person with that username";
		$stmt->fetch();
		if(password_verify($password, $pw)) {
			//echo "<br>password match";
			
			
			if($num >0){
				while($row=$result->fetch_assoc()){
					array_push($userData,$row);
				}
				$res['error']=false;
				$res['user_Data']=$userData;

				$res['message']="Login Succesfully";
		
			}
		}
		else {
			$res['error']=true;
        	$res['message']="Your Email or Password is invalid!";
		}
	}
	else {
		$res['error']=true;
        $res['message']="Your Email or Password is invalid!";
	}


}


if($action=='getalladmin'){
	$sql="SELECT * FROM `login` WHERE type='admin' AND visibility='true'  ORDER BY id desc";
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
}

if($action=='getcurrentadmin'){
    $id = $_POST['id'];

	$sql="SELECT * FROM `login` WHERE id = $id";
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
		$res['error']=true;
        $res['message']="No Data Found!";
	}	
}

if($action=='updateusername'){

	$id = $_POST['id'];
    $_new_username = $_POST['new_username'];

	$new_username = filter_var($_new_username, FILTER_SANITIZE_STRING);

    $sql = "UPDATE `login` SET `username` = '$new_username' WHERE `login`.`id` = $id";
    $result=$conn->query($sql);
    if($result===true){
        $res['error']=false;
        $res['message']="Updated Successfully!";
    } else {
        $res['error']=true;
        $res['message']="Something went wrong. Try Again!";
    }
}

if($action=='updatepassword'){

	$id = $_POST['id'];
    $new_password = $_POST['new_password'];

	$hash = password_hash($new_password, PASSWORD_DEFAULT);

    $sql = "UPDATE `login` SET `password` = '$hash' WHERE `login`.`id` = $id";
    $result=$conn->query($sql);
    if($result===true){
        $res['error']=false;
        $res['message']="Updated Successfully!";
    } else {
        $res['error']=true;
        $res['message']="Something went wrong. Try Again!";
    }
}

if($action=='disableAdmin'){
    $id = $_POST['id'];
	 
	$sql="UPDATE `login` SET visibility = 'false' WHERE `login`.`id` = $id";
	$result=$conn->query($sql);
	if($result===true){
		$res['error']=false;
        $res['message']="Admin Account Disabled";
	}else{
		$res['error']=true;
        $res['message']="Somthing Went Wrong";
	}

}

if($action=='updateadmininfo'){

	$id = $_POST['id'];
	$fname = $_POST['fname'];
	$lname = $_POST['lname'];
    $username = $_POST['username'];

    $sql = "UPDATE `login` SET `username` = '$username', `fname` = '$fname', `lname` = '$lname' WHERE `login`.`id` = $id";
    $result=$conn->query($sql);
    if($result===true){
        $res['error']=false;
        $res['message']="Updated Successfully!";
    } else {
        $res['error']=true;
        $res['message']="Something went wrong. Try Again!";
    }
}

if($action=='addadmin'){

	$fname = $_POST['fname'];
	$lname = $_POST['lname'];
	$username = $_POST['username'];
	$password = $_POST['password'];

	$hash = password_hash($password, PASSWORD_DEFAULT);

	$sql="INSERT INTO `login` (`id`, `type`, `fname`, `lname`, `username`, `password`, `visibility`) VALUES (NULL, 'admin', '$fname', '$lname', '$username', '$hash', 'true')";
	$result=$conn->query($sql);
	if($result===true){
		$res['error']=false;
		$res['message']="Addmin Account Created";
	}else{
		$res['error']=true;
		$res['message']="Somthing Went Wrong";
	}
}



$conn -> close();
header("Content-type: application/json");
echo json_encode($res);
die();

?>