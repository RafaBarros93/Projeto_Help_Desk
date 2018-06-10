<html>
    <head>
        <style>
	    body {
		    margin: 0;
	    }
            .left-footer {
                left: 0;
                bottom: 0;
                width: 200px;
                height: 35px;
                background: #eaeaea;
                position: absolute;
            }

            .rigth-footer {
                right: 0;
                bottom: 0;
                width: 200px;
                height: 35px;
                background: #eaeaea;
                position: absolute;
            }
        </style>
    </head>
    <body>
        <?php
            require_once("config.php");
            //captura o id do dashboard
            $id = utf8_encode(htmlspecialchars($_GET['id']));

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, BASE_URL_SERVICO."/dashboards/".$id);
            //para nao imprimir o curl apos a execucao
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $data = curl_exec($ch);
            curl_close($ch);
            //prepara o json
            $data = json_decode($data, true);
            $url = $data["result"];
            $urlPowerBI = $url[0]["URLPowerBI"];
        ?>
        <iframe id="dashboard" width="100%" height="100%" src="<?php echo $urlPowerBI ?>" frameborder="0" allowFullScreen="true"></iframe>
        <div class="left-footer"></div>
        <div class="rigth-footer"></div>
    </body>
</html>
