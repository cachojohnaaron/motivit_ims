<?php
header('Access-Control-Allow-Origin: *'); // add this to .htaccess file

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "motivit_ims";
$mysqli = new mysqli($hostName, $username, $password, $dbname);
  
    switch ($_GET['request']) {
 
        case 'department':
            $sql = "SELECT * FROM `dropdown` WHERE `title` = 'department'";
            break;
         
        default:
            break;
    } 

    $result = $mysqli->query($sql); 
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

    //echo json_encode($response); 
?>
	