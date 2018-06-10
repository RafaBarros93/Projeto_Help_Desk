<?php
    //define a constante do endereco da url do servico
    define('BASE_URL_SERVICO', 'http://localhost:3002/portal_patrimar');

    /*funcao para atribuir mascaras*/
    function mask($val, $mask)
    {  
        /*
        echo mask($cnpj,'##.###.###/####-##');
        echo mask($cpf,'###.###.###-##');
        echo mask($cep,'#####-###');
        echo mask($data,'##/##/####');
        */
        $maskared = '';
        $k = 0;
        for($i = 0; $i<=strlen($mask)-1; $i++) {
            if($mask[$i] == '#') {
                if(isset($val[$k]))
                    $maskared .= $val[$k++];
            }
            else {
                if(isset($mask[$i]))
                    $maskared .= $mask[$i];
            }
        }
        return $maskared;
    }
?>