<?php
$conn = new mysqli("localhost","root", "root", "motivit");
if(!$conn){
    echo "Error. Database not found.";
}

?>