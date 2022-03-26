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

//working 3-7-22
if($action=="login"){
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

//working 3-8-22
if($action=='addemployee'){

	$name = $_POST['name'];
	$email = $_POST['email'];
	$department = $_POST['department'];
	$notes = $_POST['notes'];

    $testquery = "SELECT * FROM employee where name = '$name'";
    $testresult = $conn->query($testquery);
    $num=mysqli_num_rows($testresult);
    if ($num > 0) {
        $res['error']=true;
        $res['message'] = "Employee Already Exist";
    }
    else {
	 
        $sql="INSERT INTO `employee` (`emp_id`, `name`, `department`, `email`, `notes`, `visibility`) VALUES (NULL, '$name', '$department', '$email', '$notes', 'true')";
        $result=$conn->query($sql);
        if($result===true){
            $res['error']=false;
            $res['message']="Employee Added Successfully";
        }else{
            $res['error']=true;
            $res['message']="Somthing Went Wrong";
        }
	}
}

//working 3-8-22
if($action=='getallemployee'){
	$sql="SELECT * FROM `employee` WHERE visibility='true' ORDER BY emp_id desc";
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

if($action=='getallemployee2'){
	$sql="SELECT * FROM `employee` WHERE visibility='true' ORDER BY emp_id desc";
	$result=$conn->query($sql);
	$num=mysqli_num_rows($result);
	$userData=array();
	if($num >0){
		while($row=$result->fetch_assoc()){
			array_push($userData,$row);
		}
		$res['error']=false;
        $res['emp_Data']=$userData;

	}else{
		$res['error']=false;
        $res['message']="No Data Found!";
	}	
}

//working 3-10-22
if($action=='disableEmployee'){
    $id = $_POST['id'];
	 
	$sql="UPDATE `employee` SET visibility = 'false' WHERE emp_id = $id";
	$result=$conn->query($sql);
	if($result===true){
		$res['error']=false;
        $res['message']="Employee Disabled";
	}else{
		$res['error']=true;
        $res['message']="Somthing Went Wrong";
	}
}

//working 3-11-22
if($action=='updateEmployee'){

	$emp_id = $_POST['emp_id'];
	$name = $_POST['name'];
	$email = $_POST['email'];
	$department = $_POST['department'];
	$notes = $_POST['notes'];

    $sql = "UPDATE `employee` SET `name` = '$name', `department` = '$department', `email` = '$email', `notes` = '$notes' WHERE `employee`.`emp_id` = $emp_id";
    $result=$conn->query($sql);
    if($result===true){
        $res['error']=false;
        $res['message']="Updated Successfully!";
    } else {
        $res['error']=true;
        $res['message']="Something went wrong. Try Again!";
    }
}

//working 3-8-22
if($action=='addasset'){

	$asset_tag = $_POST['asset_tag'];
	$serialno = $_POST['serialno'];
	$model = $_POST['model'];
	$status = $_POST['status'];
	$category = $_POST['category'];
	$purchase_date = $_POST['purchase_date'];
	$supplier = $_POST['supplier'];
	$notes = $_POST['notes'];
	$asset_location = $_POST['asset_location'];
	

    $testquery = "SELECT * FROM asset where asset_tag = '$asset_tag'";
    $testresult = $conn->query($testquery);
    $num=mysqli_num_rows($testresult);
    if ($num > 0) {
        $res['error']=true;
        $res['message'] = "Asset Already Exist";
    }
    else {
        $sql="INSERT INTO `asset` (`asset_id`, `asset_tag`, `serialno`, `model`, `status`, `category`, `purchase_date`, `supplier`, `notes`, `asset_img`, `asset_location`, `visibility`) VALUES (NULL, '$asset_tag', '$serialno', '$model', '$status', '$category', '$purchase_date', '$supplier', '$notes', NULL, '$asset_location', 'true')";
		$result=$conn->query($sql);
        if($result===true){
            $res['error']=false;
            $res['message']="Asset Added Successfully";
        }else{
            $res['error']=true;
            $res['message']="Somthing Went Wrong";
        }
	}
}

//working 3-8-22
if($action=='getallasset'){
	$sql="SELECT * FROM `asset` WHERE visibility='true' ORDER BY asset_id desc";
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

//working 3-8-22
if($action=='getallassetRTD'){
	$sql="SELECT * FROM `asset` WHERE visibility='true' AND status = 'Ready to deploy' ORDER BY asset_id desc";
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


if($action=='getallassetDeployed'){
	$sql="SELECT * FROM assign_asset, employee, asset 
		WHERE (employee.emp_id = assign_asset.emp_id 
		AND assign_asset.asset_id = asset.asset_id)
		AND asset.visibility = 'true'
		AND assign_asset.transaction_type = 'checkout'
		AND assign_asset.transaction_status = 'deployed'";
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

//working 3-8-22
if($action=='disableAsset'){
    $id = $_POST['id'];
	 
	$sql="UPDATE `asset` SET visibility = 'false' WHERE asset_id = $id";
	$result=$conn->query($sql);
	if($result===true){
		$res['error']=false;
        $res['message']="Asset Disabled";
	}else{
		$res['error']=true;
        $res['message']="Somthing Went Wrong";
	}

}

//working 3-11-22
if($action=='updateAsset'){
	$asset_id = $_POST['asset_id'];
	$asset_tag = $_POST['asset_tag'];
	$serialno = $_POST['serialno'];
	$model = $_POST['model'];
	$status = $_POST['status'];
	$category = $_POST['category'];
	$purchase_date = $_POST['purchase_date'];
	$supplier = $_POST['supplier'];
	$notes = $_POST['notes'];
	$asset_location = $_POST['asset_location'];

    $sql = "UPDATE `asset` SET `asset_tag` = '$asset_tag', `serialno` = '$serialno', `model` = '$model', `status` = '$status', `category` = '$category', `purchase_date` = '$purchase_date', `supplier` = '$supplier', `notes` = '$notes', `asset_location` = '$asset_location' WHERE `asset`.`asset_id` = $asset_id";
    $result=$conn->query($sql);
    if($result===true){
        $res['error']=false;
        $res['message']="Updated Successfully!";
    } else {
        $res['error']=true;
        $res['message']="Something went wrong. Try Again!";
    }
}

//working 3-15-22 rtd.vue
if($action=='deployAsset'){

	$asset_id = $_POST['asset_id'];
	$emp_id = $_POST['emp_id'];

	$sql="INSERT INTO `assign_asset` (`assign_asset_id`, `asset_id`, `emp_id`, `transaction_type`, `transaction_date`, `transaction_status`) VALUES (NULL, '$asset_id', '$emp_id', 'checkout', NOW(), 'deployed')";
	$updatequery = "UPDATE `asset` SET `status` = 'Deployed' WHERE `asset`.`asset_id` = $asset_id";

	$result=$conn->query($sql);
	if($result===true){
		$updResult = $conn->query($updatequery);
		if ($updResult === true) {
		$res['error']=false;
		$res['message']="Asset Added Successfully";
		}
	}
	else{
		$res['error']=true;
		$res['message']="Somthing Went Wrong";
	}

}

//working
if($action=='addaccessory'){

	$acs_name = $_POST['acs_name'];
	$acs_category = $_POST['acs_category'];
	$acs_manufacturer = $_POST['acs_manufacturer'];
	$quantity = $_POST['quantity'];
	$location = $_POST['location'];

	$sql="INSERT INTO `accessory` (`acs_id`, `acs_name`, `acs_category`, `acs_manufacturer`, `quantity`, `acs_img`, `location`, `visibility`) VALUES (NULL, '$acs_name', '$acs_category', '$acs_manufacturer', '$quantity', NULL, '$location', 'true')";
	$result=$conn->query($sql);
	if($result===true){
		$res['error']=false;
		$res['message']="Asset Added Successfully";
	}else{
		$res['error']=true;
		$res['message']="Somthing Went Wrong";
	}
}

//working 3/21/22
if($action=='getallaccessory'){
	$sql="SELECT * FROM `accessory` WHERE visibility='true' ORDER BY acs_id desc";
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

if($action=='updateAccessory'){
	$acs_id = $_POST['acs_id'];
	$acs_name = $_POST['acs_name'];
	$acs_category = $_POST['acs_category'];
	$acs_manufacturer = $_POST['acs_manufacturer'];
	$quantity = $_POST['quantity'];
	$location = $_POST['location'];

	$sql = "UPDATE `accessory` SET `acs_name` = '$acs_name', `acs_category` = '$acs_category', `acs_manufacturer` = '$acs_manufacturer', `quantity` = '$quantity', `location` = '$location' WHERE `accessory`.`acs_id` = $acs_id";
    //$sql = "UPDATE `accessory` SET `acs_name` = '$acs_name', `acs_category` = '$acs_category', `acs_manufacturer` = '$acs_manufacturer', `quantity` = '$quantity', `location` = '$location', WHERE `accessory`.`acs_id` = $acs_id";
	//$sql = "UPDATE `accessory` SET `acs_name` = 'eaj', `acs_category` = 'mouse', `acs_manufacturer` = 'eaj', `quantity` = '100', `location` = 'loc' WHERE `accessory`.`acs_id` = 5";
	$result=$conn->query($sql);
    if($result===true){
        $res['error']=false;
        $res['message']="Success!";
    } else {
        $res['error']=true;
        $res['message']="Something went wrong";
    }
}

if($action=='disableAccessory'){
    $id = $_POST['id'];
	 
	$sql="UPDATE `accessory` SET visibility = 'false' WHERE acs_id = $id";
	$result=$conn->query($sql);
	if($result===true){
		$res['error']=false;
        $res['message']="Accessory Disabled";
	}else{
		$res['error']=true;
        $res['message']="Somthing Went Wrong";
	}

}

if($action=='deployAccessory'){

	$acs_id = $_POST['acs_id'];
	$emp_id = $_POST['emp_id'];

	$sql="INSERT INTO `assign_accessory` (`assign_accessory_id`, `acs_id`, `emp_id`, `transaction_type`, `transaction_date`, `transaction_status`) VALUES (NULL, '$acs_id', '$emp_id', 'checkout', NOW(), 'deployed')";
	$updatequery = "UPDATE `accessory` SET quantity = quantity-1 WHERE `accessory`.`acs_id` = $acs_id";
	$result=$conn->query($sql);
	if($result===true){
		$updResult = $conn->query($updatequery);
		if ($updResult === true) {
		$res['error']=false;
		$res['message']="Accessory Deployed Successfully";
		}
	}else{
		$res['error']=true;
		$res['message']="Somthing Went Wrong";
	}
}

if($action=='getallaccessoryDeployed'){
	$sql="SELECT * FROM assign_accessory, employee, accessory 
		WHERE (employee.emp_id = assign_accessory.emp_id 
		AND assign_accessory.acs_id = accessory.acs_id)
		AND accessory.visibility = 'true' 
		AND assign_accessory.transaction_type = 'checkout'
		AND assign_accessory.transaction_status = 'deployed'";
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

if($action=='returnAccessory') {

	$acs_id = $_POST['acs_id'];
	$emp_id = $_POST['emp_id'];

	$sql = "INSERT INTO `assign_accessory` (`assign_accessory_id`, `acs_id`, `emp_id`, `transaction_type`, `transaction_date`) VALUES (NULL, '$acs_id', '$emp_id', 'checkin', NOW())";
	$updatequery = "UPDATE `accessory` SET quantity = quantity+1 WHERE `accessory`.`acs_id` = $acs_id";
	$updatequery2 = "UPDATE `assign_accessory` SET `transaction_status` = 'returned' WHERE `assign_accessory`.`emp_id` = $emp_id AND `assign_accessory`.`acs_id` = $acs_id";
	$result=$conn->query($sql);
	if($result===true){
		$updResult = $conn->query($updatequery);
		if ($updResult === true) {
			$updResult2 = $conn->query($updatequery2);
			if($updResult2 === true) {
				$res['error']=false;
				$res['message']="Asset Returned Successfully";
			}
		}
	}else{
		$res['error']=true;
		$res['message']="Somthing Went Wrong";
	}
}

if($action=='returnAsset') {

	$asset_id = $_POST['asset_id'];
	$emp_id = $_POST['emp_id'];

	$sql = "INSERT INTO `assign_asset` (`assign_asset_id`, `asset_id`, `emp_id`, `transaction_type`, `transaction_date`) VALUES (NULL, '$asset_id', '$emp_id', 'checkin', NOW())";
	$updatequery = "UPDATE `asset` SET status = 'Ready to deploy' WHERE `asset`.`asset_id` = $asset_id";
	$updatequery2 = "UPDATE `assign_asset` SET `transaction_status` = 'returned' WHERE `assign_asset`.`emp_id` = $emp_id AND `assign_asset`.`asset_id` = $asset_id";
	$result=$conn->query($sql);
	if($result===true){
		$updResult = $conn->query($updatequery);
		if ($updResult === true) {
			$updResult2 = $conn->query($updatequery2);
			if($updResult2 === true) {
				$res['error']=false;
				$res['message']="Asset Returned Successfully";
			}
		}
	}else{
		$res['error']=true;
		$res['message']="Somthing Went Wrong";
	}
}































//jdhjdhjhjdhjdhjdhjdhdj

if($action=='getalluser'){
	$sql="SELECT * FROM `user` WHERE status='enabled' ORDER BY user_id desc";
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

if($action=='disableUser'){
    $id = $_POST['id'];
	 
	$sql="UPDATE `user` SET status = 'disabled' WHERE user_id = $id";
	$result=$conn->query($sql);
	if($result===true){
		$res['error']=false;
        $res['message']="User Disabled";
	}else{
		$res['error']=true;
        $res['message']="Somthing Went Wrong";
	}

}
























if($action=='editUser'){

	$username=$_POST['username'];
	$password=$_POST['password'];
    $id = $_POST['id'];
	 
	$sql="UPDATE `user` SET username = '$username', password = '$password' WHERE id = $id";
	$result=$conn->query($sql);
	if($result===true){
		$res['error']=false;
        $res['message']="Edit Success";
	}else{
		$res['error']=true;
        $res['message']="Somthing Went Wrong";
	}

}




if ($action == "deleteUser") {
	//$username=$_POST['username'];
	//$password=$_POST['password'];
    $id = $_POST['id'];
	 
	$sql="DELETE from user where id = $id";
	$result=$conn->query($sql);
	if($result===true){
		$res['error']=false;
        $res['message']="Data Deleted";
	}else{
		$res['error']=true;
        $res['message']="Somthing Went Wrong";
	}    
}


if($action=='getuserinfo'){
	$sql="SELECT * FROM `user` WHERE status='enabled' ORDER BY user_id desc";
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


/* user functions */

if($action=="userlogin"){
    $username=$_POST['username'];
    $password=$_POST['password'];
    $sql="Select * from user where username='$username' AND password='$password'";
    
	$result = $conn->query($sql);
	$num=mysqli_num_rows($result);

	if($num > 0){
		while($row = mysqli_fetch_array($result)){
			$res['message'] = "Logged In Succesfully!";
			$res['userid'] = $row['id'];
			$res['f1'] = $row['username'];
			$res['f2'] = $row['password'];
		}
	}
	else{
        //echo "Logged in failed!";
        $res['error']=true;
        $res['message']="Your Email or Password is invalid!";  
    }

}

if ($action == "user_deleteUser") {
	//$username=$_POST['username'];
	//$password=$_POST['password'];
    $id = $_POST['id'];
	 
	$sql="DELETE from user where id = $id";
	$result=$conn->query($sql);
	if($result===true){
		$res['error']=false;
        $res['message']="Data Deleted";
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