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



/* Asset Report Start */

if($action=='filterAsset'){
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];

	//$start_date = '2018-01-01';
	//$end_date = '2022-12-01';

	$sql="SELECT * FROM asset 
		WHERE (purchase_date >= '$start_date' AND purchase_date <= '$end_date') 
		AND visibility = 'true'
		ORDER BY asset_id DESC";
	//$sql="select * from asset";
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

if($action=='filterLicense'){
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];

	$sql="SELECT * FROM license
		WHERE (softDate >= '$start_date' AND softDate <= '$end_date') 
		AND visibility = 'true'
		ORDER BY softID DESC";
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

if($action=='filterAssetByDeployDate'){
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];

	//$start_date = '2018-01-01';
	//$end_date = '2022-12-01';

	$sql="SELECT * FROM assign_asset, employee, asset 
		WHERE (employee.emp_id = assign_asset.emp_id 
		AND assign_asset.asset_id = asset.asset_id)
		AND asset.visibility = 'true'
		AND assign_asset.transaction_type = 'checkout'
		AND assign_asset.transaction_status = 'deployed'
		AND (assign_asset.transaction_date >= '$start_date' AND assign_asset.transaction_date <= '$end_date')
		ORDER by assign_asset.assign_asset_id DESC";
	//$sql="select * from asset";
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

if($action=='filterLicenseByDeployDate'){
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];
	 
	$sql="SELECT * FROM deploy_license, employee, license, license_location 
		WHERE (employee.emp_id = deploy_license.emp_id 
		AND deploy_license.softID = license.softID
		AND deploy_license.loc_id = license_location.id
		AND deploy_license.visibility = = 'true'
		AND deploy_license.status = 'Deployed'
		AND (deploy_license.al_date >= '$start_date' AND deploy_license.al_date <= '$end_date')
		ORDER by deploy_license.assign_license_id DESC";
	//$sql="select * from asset";
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

if($action=='getAllAssetTransactions_dash'){

	$sql="SELECT * FROM assign_asset, employee, asset 
		WHERE (employee.emp_id = assign_asset.emp_id 
		AND assign_asset.asset_id = asset.asset_id)
		AND asset.visibility = 'true'
		ORDER by assign_asset.assign_asset_id DESC LIMIT 0,10";
	//$sql="select * from asset";
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

if($action=='getAllAssetTransactions'){

	$sql="SELECT * FROM assign_asset, employee, asset 
		WHERE (employee.emp_id = assign_asset.emp_id 
		AND assign_asset.asset_id = asset.asset_id)
		AND asset.visibility = 'true'
		ORDER by assign_asset.assign_asset_id DESC";
	//$sql="select * from asset";
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

if($action=='filterAssetTransactions'){
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];

	//$start_date = '2018-01-01';
	//$end_date = '2022-12-01';

	$sql="SELECT * FROM assign_asset, employee, asset 
		WHERE (employee.emp_id = assign_asset.emp_id 
		AND assign_asset.asset_id = asset.asset_id)
		AND asset.visibility = 'true'
		AND (assign_asset.transaction_date >= '$start_date' AND assign_asset.transaction_date <= '$end_date')
		ORDER by assign_asset.assign_asset_id DESC";
	//$sql="select * from asset";
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

/*Asset Report End */


/*Accessories Report Start */
if($action=='filterAccessoriesByDeployDate'){
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];

	//$start_date = '2018-01-01';
	//$end_date = '2022-12-01';

	$sql="SELECT * FROM assign_accessory, employee, accessory 
		WHERE (employee.emp_id = assign_accessory.emp_id 
		AND assign_accessory.acs_id = accessory.acs_id)
		AND accessory.visibility = 'true' 
		AND assign_accessory.transaction_type = 'checkout'
		AND assign_accessory.transaction_status = 'deployed'
		AND (assign_accessory.transaction_date >= '$start_date' AND assign_accessory.transaction_date <= '$end_date')
		ORDER by assign_accessory.assign_accessory_id DESC";
	//$sql="select * from asset";
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

if($action=='getAllAccessoryTransactions_dash'){

	$sql="SELECT * FROM assign_accessory, employee, accessory 
		WHERE (employee.emp_id = assign_accessory.emp_id 
		AND assign_accessory.acs_id = accessory.acs_id)
		AND accessory.visibility = 'true'
		ORDER by assign_accessory.acs_id DESC LIMIT 0,10";
	//$sql="select * from asset";
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

if($action=='getAllAccessoryTransactions'){

	$sql="SELECT * FROM assign_accessory, employee, accessory 
		WHERE (employee.emp_id = assign_accessory.emp_id 
		AND assign_accessory.acs_id = accessory.acs_id)
		AND accessory.visibility = 'true'
		ORDER by assign_accessory.acs_id DESC";
	//$sql="select * from asset";
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


if($action=='filterAccessoryTransactions'){
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];

	//$start_date = '2018-01-01';
	//$end_date = '2022-12-01';

	$sql="SELECT * FROM assign_accessory, employee, accessory 
		WHERE (employee.emp_id = assign_accessory.emp_id 
		AND assign_accessory.acs_id = accessory.acs_id)
		AND accessory.visibility = 'true'
		AND (assign_accessory.transaction_date >= '$start_date' AND assign_accessory.transaction_date <= '$end_date')
		ORDER by assign_accessory.assign_accessory_id DESC";
	//$sql="select * from asset";
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

if($action=='getAllLicenseTransactions'){

	$sql="SELECT * FROM deploy_license, employee, license, license_location 
	WHERE (employee.emp_id = deploy_license.emp_id 
	AND deploy_license.softID = license.softID
	AND deploy_license.loc_id = license_location.id)
	ORDER by deploy_license.softID DESC";
	$result=$conn->query($sql);
	$num=mysqli_num_rows($result);
	$licenseData=array();
	if($num >0){
		while($row=$result->fetch_assoc()){
			array_push($licenseData,$row);
		}
		$res['error']=false;
        $res['license_Data']=$licenseData;

	}else{
		$res['error']=false;
        $res['message']="No Data Found!";
	}	
}

if($action=='getAllLicenseTransactions_dash'){

	$sql="SELECT * FROM deploy_license, employee, license, license_location 
	WHERE (employee.emp_id = deploy_license.emp_id 
	AND deploy_license.softID = license.softID
	AND deploy_license.loc_id = license_location.id)
	ORDER by deploy_license.softID DESC LIMIT 0,10";
	$result=$conn->query($sql);
	$num=mysqli_num_rows($result);
	$licenseData=array();
	if($num >0){
		while($row=$result->fetch_assoc()){
			array_push($licenseData,$row);
		}
		$res['error']=false;
        $res['license_Data']=$licenseData;

	}else{
		$res['error']=false;
        $res['message']="No Data Found!";
	}	
}



$conn -> close();
header("Content-type: application/json");
echo json_encode($res);
die();

?>