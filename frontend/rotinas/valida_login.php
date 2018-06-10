<?php
    session_start();

    require_once("config.php");

    $origem = basename($_SERVER['HTTP_REFERER']);
	if ((count($_POST) <= 0) && ($origem != '../index.php')){
		die();
	}
	else {
        $login = utf8_encode(htmlspecialchars($_POST['email']));
        $senha = utf8_encode(htmlspecialchars($_POST['senha']));

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, BASE_URL_SERVICO."/login");
        //para nao imprimir o curl apos a execucao
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //passando os parametros para o cabecalho da requisicao
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('email: '.$login, 'senha: '.$senha));
        $data = curl_exec($ch);
        curl_close($ch);
        //prepara o json
        $data = json_decode($data, true);

        ini_set( 'display_errors', true );
        error_reporting( E_ALL );
        
        if ($data["result"][0]["CodigoUsuario"] > 0){

            $usuario = json_encode($data["result"][0]);
            setcookie('VP6_Patrimar_Session', $usuario, time()+60*60*24*90, "/", "localhost");
            $_SESSION['VP6_Patrimar_Session'] = $usuario;

            //gera o log de acesso
            $log = array("CodigoUsuario" => $data["result"][0]["CodigoUsuario"]);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, BASE_URL_SERVICO."/usuarioLogAcesso");
            curl_setopt($ch, CURLOPT_POST, true);
            //para nao imprimir o curl apos a execucao
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($log));
            $result = curl_exec($ch);
            curl_close($ch);

            //captura o controle de acesso do usuario
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, BASE_URL_SERVICO."/montaMenu/".$data["result"][0]["CodigoGrupoUsuario"]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
            $data = curl_exec($ch);
            curl_close($ch);
            //prepara o json
            $data = json_decode($data, true);
            $acesso = json_encode($data["result"]);
            $_SESSION['VP6_Controle_Acesso'] = $acesso; 
            
            header("Location:../principal.php");
        } else {
            header("Location:../index.php");
        }
    }
?>
