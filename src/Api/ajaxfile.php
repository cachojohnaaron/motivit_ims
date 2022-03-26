<?php
header('Access-Control-Allow-Origin: *'); // add this to .htaccess file

include "db.php";

    $deptData = mysqli_query($con,"select * from dropdown"); // from motivit_ims db -> tbl_dropdown
    $deptResponse = array();
        while($row = mysqli_fetch_assoc($deptData)){
            $deptResponse[] = $row;
        }
    echo json_encode($deptResponse);
    

exit;