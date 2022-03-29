<?php
$conn = new mysqli("localhost","root", "", "motivit_ims");
if(!$conn){
    echo "Error. Database not found.";
}

?>