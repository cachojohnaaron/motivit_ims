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

function clean($value){
    $value = trim($value);
    $value = stripsslashes($value);
    $value = strip_tags($value);

    return $value;
}

if($action=='addlicense'){
    $softName=clean($_POST['softName']);
    $softCategory=clean($_POST['softCategory']);
    $softKey=clean($_POST['softKey']);
    $softToName=clean($_POST['softToName']);
    $softToEmail=clean($_POST['softToEmail']);
    $softManufacturer=clean($_POST['softManufacturer']);
    $softTotal=clean($_POST['softTotal']);
    $softAvailable=clean($_POST['softAvailable']);
    $softDate=clean($_POST['softDate']);
    $softExpired=clean($_POST['softExpired']);

    $testquery = "SELECT * FROM `license` WHERE `softName` = '$softName' AND `visibility`= 'true'";
    $testresult = $conn->query($testquery);
    $num=mysqli_num_rows($testresult);
    if ($num > 0) {
        $res['error']=true;
        $res['message'] = "This license already exist!";
    } else {
        $sql="INSERT INTO `license`(`softID`, `softName`, `softCategory`, `softKey`, `softToName`, `softToEmail`, `softManufacturer`, `softTotal`, `softAvailable`, `softDate`, `softExpired`, `visibility`, `status`) VALUES(NULL,'$softName','$softCategory','$softKey','$softToName','$softToEmail','$softManufacturer','$softTotal','$softAvailable','$softDate','$softExpired','true','Ready to Deploy')";
        $result=$conn->query($sql);
            if($result===true){
                $res['error']=false;
                $res['message']="License added successfully.";
            } else {
                $res['error']=true;
                $res['message']="Something went wrong!";
            }
    }
}
if($action=='addcategory'){
    $softCategory=clean($_POST['softCategory']);

    $testquery = "SELECT * FROM `license_category` WHERE `category`  = '$softCategory'";
    $testresult = $conn->query($testquery);
    $num=mysqli_num_rows($testresult);
    if ($num > 0) {
        $res['error']=true;
        $res['message'] = "Category already exist!";
    } else {
        $sql="INSERT INTO `license_category`(`id`, `category`) VALUES (NULL,'$softCategory')";
        $result=$conn->query($sql);
            if($result===true){
                $res['error']=false;
                $res['message']="Category added successfully";
            } else {
                $res['error']=true;
                $res['message']="Something went wrong";
            }
    }
}
if($action=='getemployee'){
    $sql="SELECT * FROM `employee` WHERE visibility = 'true'";
    $result=$conn->query($sql);
    $num=mysqli_num_rows($result);
    $licenseEmployee=array();
    if($num >0){
        while($row=$result->fetch_assoc()){
            array_push($licenseEmployee,$row);
        }
        $res['error']=false;
        $res['license_Employee']=$licenseEmployee;
    } else {
        $res['error']=false;
        $res['message']="No Data Found!";
    }
}
if($action=='getdeptemployee'){
    $sql="SELECT * FROM `employee` WHERE visibility = 'true'";
    $result=$conn->query($sql);
    $num=mysqli_num_rows($result);
    $deptEmployee=array();
    if($num >0){
        while($row=$result->fetch_assoc()){
            array_push($deptEmployee,$row);
        }
        $res['error']=false;
        $res['dept_Employee']=$deptEmployee;
    } else {
        $res['error']=true;
        $res['message']="No Data Found!";
    }
}
if($action=='getlicensecat'){
    $sql="SELECT `category` FROM `license_category`";
    $result=$conn->query($sql);
    $num=mysqli_num_rows($result);
    $licenseCategory=array();
    if($num >0){
        while($row=$result->fetch_assoc()){
            array_push($licenseCategory,$row);
        }
        $res['error']=false;
        $res['license_Category']=$licenseCategory;
    } else {
        $res['error']=false;
        $res['message']="No Data Found!";
    }
}
if($action=='getlicenseloc'){
    $sql="SELECT * FROM `license_location`";
    $result=$conn->query($sql);
    $num=mysqli_num_rows($result);
    $licenseLocation=array();
    if($num >0){
        while($row=$result->fetch_assoc()){
            array_push($licenseLocation,$row);
        }
        $res['error']=false;
        $res['license_Location']=$licenseLocation;
    } else {
        $res['error']=false;
        $res['message']="No Data Found!";
    }
}
if($action=='addlocation'){
    $softLocation=clean($_POST['softLocation']);

    $testquery = "SELECT * FROM `license_location` WHERE `location`  = '$softLocation'";
    $testresult = $conn->query($testquery);
    $num=mysqli_num_rows($testresult);
    if ($num > 0) {
        $res['error']=true;
        $res['message'] = "Location already exist!";
    } else {
        $sql="INSERT INTO `license_location`(`location`) VALUES ('$softLocation')";
        $result=$conn->query($sql);
            if($result===true){
                $res['error']=false;
                $res['message']="Location added successfully";
            }else{
                $res['error']=true;
                $res['message']="Something went wrong";
            }
    }
}
if($action=='getlicenseinfo'){
    $sql="SELECT * FROM `license` WHERE visibility = 'true' ORDER BY license.softID DESC";
    $result=$conn->query($sql);
    $num=mysqli_num_rows($result);
    $licenseData=array();
    if($num >0){
        while($row=$result->fetch_assoc()){
            array_push($licenseData,$row);
        }
        $res['error']=false;
        $res['license_Data']=$licenseData;
    } else {
        $res['error']=false;
        $res['message']="No Data Found!";
    }
}
//Query for CheckOut/Deploy License
if($action=='addassign'){
    $softID=clean($_POST['softID']);
    $emp_id = clean($_POST['emp_id']);
    $loc_id=clean($_POST['loc_id']);
    $al_date=clean($_POST['al_date']);
 
    $testquery = "SELECT * FROM `deploy_license` WHERE `softID` = '$softID' AND `emp_id` = '$emp_id'";
    $testresult = $conn->query($testquery);
    $num=mysqli_num_rows($testresult);
    if ($num > 0) {
        $res['error']=true;
        $res['message'] = "The license had been previously assigned to this employee!";
    } else {
        $sql="INSERT INTO `deploy_license`(`assign_license_id`, `softID`, `emp_id`, `transaction_type`, `loc_id`, `al_date`, `visibility`, `status`) VALUES(NULL,'$softID','$emp_id','checkout','$loc_id','$al_date','true','Deployed');";
        $updatequery = "UPDATE `license` SET softAvailable = softAvailable-1 WHERE softAvailable>0 AND `softID` = $softID";
        $result=$conn->query($sql);
        if($result===true){
            $updResult = $conn->query($updatequery);
            if ($updResult === true) {
            $res['error']=false;
            $res['message']="The license has been checked out!";
            }
        }else{
            $res['error']=true;
            $res['message']="Something went wrong. Try again!";
        }
    }
}//End Query
//Query for calling all deployed license and employee info
if($action=='getdeployedlicense'){
	$sql="SELECT * FROM deploy_license, employee, license, license_location 
		WHERE (employee.emp_id = deploy_license.emp_id 
		AND deploy_license.softID = license.softID
        AND deploy_license.loc_id = license_location.id)
		AND deploy_license.visibility = 'true' 
		AND deploy_license.status = 'Deployed'";
	$result=$conn->query($sql);
	$num=mysqli_num_rows($result);
	$deployedData=array();
	if($num >0){
		while($row=$result->fetch_assoc()){
			array_push($deployedData,$row);
		}
		$res['error']=false;
        $res['deployed_Data']=$deployedData;

	}else{
		$res['error']=false;
        $res['message']="No Data Found!";
	}	
}
//Query for CheckIn/Return License
if($action=='checkin'){
    $assign_license_id=$_POST['assign_license_id'];
    $softID=$_POST['softID'];
    $emp_id = $_POST['emp_id'];
    $loc_id=$_POST['loc_id'];

    $sql="UPDATE `deploy_license` SET `status`= 'Undeployed',`transaction_type`='checkin' WHERE `assign_license_id`='$assign_license_id'";
    $returnquery = "UPDATE `license` SET softAvailable = softAvailable+1 WHERE softAvailable>0 AND `softID` = '$softID'";
    // `status` = 'Ready To Deploy'
    $result=$conn->query($sql);
    if($result===true){
        $checkinResult = $conn->query($returnquery);
        if($checkinResult===true){
            $res['error']=false;
            $res['message']="The license had been checked in!";
        }
    } else {
        $res['error']=true;
        $res['message']="Something went wrong. Try again!";
    }
} //End Query
if($action=='updatedeployed'){
    $assign_license_id=clean($_POST[`assign_license_id`]);
    $softID=clean($_POST['softID']);
    $emp_id = clean($_POST['emp_id']);
    $loc_id=clean($_POST['loc_id']);
    $al_date=clean($_POST['al_date']);

    $sql = "UPDATE `deploy_license` SET `emp_id`='$emp_id',`loc_id`='$loc_id',`al_date`='$al_date' WHERE `softID`='$softID' AND assign_license_id='$assign_license_id'" ;
    $result=$conn->query($sql);
    if($result===true){
        $res['error']=false;
        $res['message']="Record Has Been Updated!";
    } else {
        $res['error']=true;
        $res['message']="Something went wrong. Try Again!";
    }
}
if($action=='updatelicense'){
    $softID=clean($_POST['softID']);
    $softName=clean($_POST['softName']);
    $softCategory=clean($_POST['softCategory']);
    $softKey=clean($_POST['softKey']);
    $softToName=clean($_POST['softToName']);
    $softToEmail=clean($_POST['softToEmail']);
    $softManufacturer=clean($_POST['softManufacturer']);
    $softTotal=clean($_POST['softTotal']);
    $softAvailable=clean($_POST['softAvailable']);
    $softDate=clean($_POST['softDate']);
    $softExpired=clean($_POST['softExpired']);

    $sql = "UPDATE license SET softName='$softName',softCategory='$softCategory',softKey='$softKey',softToName='$softToName',softToEmail='$softToEmail',softManufacturer='$softManufacturer',softTotal='$softTotal',softAvailable='$softAvailable',softDate='$softDate',softExpired='$softExpired' WHERE softID='$softID'" ;
    //update assign_license(license ID, license Name, license category, license key) AND ((edit)location) AND ((edit)employee)
    $result=$conn->query($sql);
    if($result===true){
        $res['error']=false;
        $res['message']="Updated Successfully!";
    } else {
        $res['error']=true;
        $res['message']="Something went wrong. Try again!";
    }
}
//For Remove and Show Removed of Deployed License Table
if($action=='removedeployed'){
    $assign_license_id=$_POST['assign_license_id'];
    $softID=$_POST['softID'];
    $emp_id = $_POST['emp_id'];
    $loc_id = $_POST['loc_id'];

    $sql="UPDATE `deploy_license` SET `visibility`= 'false' WHERE `assign_license_id`='$assign_license_id'";
    $result=$conn->query($sql);
    if($result===true){
        $res['error']=false;
        $res['message']="Record has been removed!";
    } else {
        $res['error']=true;
        $res['message']="Something went wrong. Try again!";
    }
}
if($action=='getdeletedinfo'){
    $sql="SELECT * FROM deploy_license, employee, license, license_location 
    WHERE (employee.emp_id = deploy_license.emp_id 
    AND deploy_license.softID = license.softID
    AND deploy_license.loc_id = license_location.id)
    AND deploy_license.visibility = 'false'";
    $result=$conn->query($sql);
    $num=mysqli_num_rows($result);
    $deployedData=array();
    if($num >0){
        while($row=$result->fetch_assoc()){
            array_push($deployedData,$row);
        }
        $res['error']=false;
        $res['deployed_Data']=$deployedData;
    } else {
        $res['error']=false;
        $res['message']="No Data Found!";
    }
}
//End Remove and Show Removed of Deployed License Table
if($action=='getcheckinrecords'){
    $sql="SELECT * FROM deploy_license, employee, license, license_location 
    WHERE (employee.emp_id = deploy_license.emp_id 
    AND deploy_license.softID = license.softID
    AND deploy_license.loc_id = license_location.id)
    AND deploy_license.status = 'Undeployed'";
    // SELECT * FROM deploy_license WHERE deploy_license.status = 'Undeployed'";
    $result=$conn->query($sql);
    $num=mysqli_num_rows($result);
    $checkInData=array();
    if($num >0){
        while($row=$result->fetch_assoc()){
            array_push($checkInData,$row);
        }
        $res['error']=false;
        $res['checkIn_Data']=$checkInData;
    } else {
        $res['error']=false;
        $res['message']="No Data Found!";
    }
}


$conn -> close();
header("Content-type: application/json");
echo json_encode($res);
die();
?>