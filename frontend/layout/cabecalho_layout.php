<?php
    require_once("rotinas/verifica_sessao_ativa.php");
?>

<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-114392756-1"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());

			gtag('config', 'UA-114392756-1');
		</script>
        
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	    <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Sistema Help Desk </title>
        <link rel="shortcut icon" href="images/helpdesk4.png">
        
        <!-- CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link href="css/toastr.css" rel="stylesheet"/>
        <link rel="stylesheet" href="css/main.css">
        <!-- JS -->
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>		
        <script src="js/jquery.cookie.js"></script>
        
    </head>
    <body>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <div class="navbar-brand">
                        <img src="images/helpdesk.png" width="" height="30">
                    </div>      
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li><a href="principal.php">Home</a></li>
                        <?php
                            //captura o cookie de sessao
                            // if(isset($_COOKIE['VP6_Patrimar_Session'])) {
                            //     $teste = $_COOKIE['VP6_Patrimar_Session'];
                            //     $user = (array) json_decode($teste);
                            //     $usuarioLogado = $user['CodigoUsuario'];
                            //     $codigoGrupoUsuario = $user['CodigoGrupoUsuario'];
                            // }
                            
                            if(isset($_SESSION['VP6_Controle_Acesso'])) {
                                $controleAcesso = $_SESSION['VP6_Controle_Acesso'];
                                $menu = (array) json_decode($controleAcesso, true);
                                for($i = 0; $i < count($menu); $i++){
                                    $pagina = $menu[$i]['Paginas'];
                                    if(count($pagina) > 0){
                                        echo '<li class="dropdown">';
                                            echo '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'.$menu[$i]['Menu'].'<span class="caret"></span></a>';
                                            echo '<ul class="dropdown-menu">';
                                                for($x=0;$x<count($pagina); $x++){
                                                    echo '<li><a href="'.$pagina[$x]['Arquivo'].'">'.$pagina[$x]['Nome'].'</a></li>';
                                                }
                                            echo '</ul>';
                                        echo '</li>';
                                    }
                                    else {
                                        echo '<li><a href="'.$menu[$i]['Arquivo'].'">'.$menu[$i]['Menu'].'</a></li>';
                                    }
                                }
                            }
                        ?>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">                        
                        <?php                             
                            //captura o cookie de sessao
                            if(isset($_SESSION['VP6_Patrimar_Session'])) {
                                $ckeVP6PatrimarSession = $_SESSION['VP6_Patrimar_Session'];
                                $user = (array) json_decode($ckeVP6PatrimarSession);
                                // echo '<li class="dropdown">';
                                //     echo '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">';
                                //     echo  '<strong>'.$user['Nome'].'</strong>';                                        
                                //     echo ' <span class="caret"></span></a>';
                                //     echo '<ul class="dropdown-menu">';                                                
                                //         echo '<li><a href="rotinas/logout.php">Sair</a></li>';                                                
                                //     echo '</ul>';
                                // echo '</li>';                                        
                                echo '<li><a href="javascript:void();"><span class="glyphicon glyphicon glyphicon-user"></span> '.$user['Nome'].'</a></li>';
                                echo '<li><a href="rotinas/logout.php" title="Sair"><span class="glyphicon glyphicon-log-out"></span></a></li>';

                                //echo '<pre>';print_r($user);echo '</pre>';                        
                            }
                            else {
                                echo '<li><a href="rotinas/logout.php">Sair</a></li>';
                            }
                        ?>                        
                    </ul>
                </div>
            </div>
        </nav>