<?php
    session_start();

    if(empty($_SESSION['VP6_Patrimar_Session'])){
        header("Location:../patrimar/index.php");
        die();
    }
?>