<?php
    require_once("layout/cabecalho_layout.php");

    //Caputura o dashboard a ser exibido
    $id = utf8_encode(htmlspecialchars($_GET['id']));
?>

<div class="container">
    <iframe src="rotinas/prepara_dashboard.php?id=<?php echo $id?>" frameborder="0" allowFullScreen="true"></iframe>
</div>

<?php
    require_once("layout/rodape_layout.php");
?>