<?php

    session_start();
    //limpa o vetor de sessao
    $_SESSION = array();

    //limpa o cookie
    setcookie("VP6_Patrimar_Session", '', time() - 42000);
    //Destroi a sessao
    session_destroy();
    header("Location:../index.php");
?>