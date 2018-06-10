<?php
   require_once("layout/cabecalho_layout.php");
?>

    <main role="main" class="container">
        <br>
        <div class="panel panel-primary">
            <div class="panel-heading"style="height:40px;" >
                <h4 class="calendario">Calendário Contábil</h4>
            </div>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr id="cabecalho_contabil">
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="dados_contabil">
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--Calendário Fiscal  -->
        <br>
        <div class="panel panel-primary">
            <div class="panel-heading" style="height:40px;">
                <h4 class="calendario">Calendário Fiscal</h4>
            </div>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr id="cabecalho_fiscal">
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="dados_fiscal">
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--Caléndario Interno  -->
        <br>
        <div class="panel panel-primary">
            <div class="panel-heading" style="height:40px;">
                <h4 class="calendario">Caléndario Interno</h4>
            </div>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr id="cabecalho_interno">
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="dados_interno">
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>

<script src="js/mask.js"></script> 
<script src="js/mask_money.js"></script>
<script src="js/config.js"></script>
<script src="js/formularios/calendario.js"></script>

<?php 
   require_once( "layout/rodape_layout.php"); 
?>