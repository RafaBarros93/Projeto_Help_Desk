<?php
    require_once("layout/cabecalho_layout.php");
?>

<div class="container">

    <!-- formulario filtro -->
    <div class="panel panel-primary" id="filtros">
        <div class="panel-heading">Filtros</div>
        <div class="panel-body">
            <form class="form-inline">
                <label class="control-label" for="txtBuscar">Pesquise na tabela por:</label>
                <input type="text" id="txtBuscar" placeholder="Buscar por" class="form-control input-sm">&nbsp;
                <button type="button" class="form-control btn btn-success btn-sm" onclick="novoRegistro()">Inserir</button>
            </form>
        </div>
    </div>

    <!-- tabela dos registros -->
    <div class="panel panel-primary" id="lista">
        <div class="panel-heading">Atividades Calendário Contábil</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista_registros">
                    <thead>
                        <tr>
                            <th>Atividade</th>
                            <th>Tipo</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="lista_corpo">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Formulario para manipulacao dos registros -->
    <form onsubmit="salvarRegistro()" id="formulario" method="post" hidden>
        <div class="panel panel-primary">
            <div class="panel-heading">Atividade Calendário Contábil</div>
            <div class="panel-body">
                <div class="form-group row">
                    <input type="text" name="txtCodigo" id="txtCodigo" hidden>
                    <div class="form-group-sm col-sm-12 col-md-8">
                        <label class="control-label" for="txtDescricao">Descrição</label>
                        <input type="text" id="txtDescricao" class="form-control" placeholder="Descrição" required>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-2">
                        <label class="control-label" for="selTipo">Tipo</label>
                        <select id="selTipo" class="form-control" required>
                            <option value=""></option>
                            <option value="C">Contábil</option>
                            <option value="F">Fiscal</option>
                            <option value="I">Interno</option>
                        </select>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-2">
                        <label class="control-label" for="txtData">Data</label>
                        <input type="date" id="txtData" class="form-control" placeholder="Data" required>
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <button type="submit" class="btn btn-primary btn-sm">Salvar</button>
                <button type="button" class="btn btn-default btn-sm" onclick="cancelarRegistro()">Cancelar</button>
            </div>
        </div>
    </form>

    <!-- Formulario modal de confirmacao-->
    <div class="modal fade" id="modal_confirmar" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h5 class="modal-title">Confirmar</h5>
                </div>
                <div class="modal-body">
                    <p id="mensagem_modal_confirmar"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btnModalConfirmar">Sim</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Não</button>
                </div>
            </div>
        </div>
    </div>

</div>

<script src="js/mask.js"></script> 
<script src="js/mask_money.js"></script>
<script src="js/config.js"></script>
<script src="js/formularios/atividade_calendario_contabil.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>