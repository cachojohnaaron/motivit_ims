<?php
$conn = new mysqli("localhost","root", "", "motivit");
if(!$conn){
    echo "Error. Database not found.";
}

?>