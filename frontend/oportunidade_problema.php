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
        <div class="panel-heading">Oportunidade / Problema</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista_registros">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Processo</th>
                            <th>Key User</th>
                            <th>Atividade</th>
                            <th>Status</th>
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
            <div class="panel-heading">Oportunidade / Problema</div>
            <div class="panel-body">
                <div class="form-group row">
                    <input type="text" name="txtCodigo" id="txtCodigo" hidden>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtID">ID</label>
                        <input type="text" id="txtID" class="form-control" placeholder="ID" required>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="selNomeProcesso">Nome Processo</label>
                        <select id="selNomeProcesso" class="form-control" required>
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtKeyUser">Key User</label>
                        <input type="text" id="txtKeyUser" class="form-control" placeholder="Key User" required>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-6">
                        <label class="control-label" for="txtAtividade">Atividade</label>
                        <input type="text" id="txtAtividade" class="form-control" placeholder="Atividade" >
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-6">
                        <label class="control-label" for="txtProblema">Problema</label>
                        <input type="text" id="txtProblema" class="form-control" placeholder="Problema" >
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-6">
                        <label class="control-label" for="txtSolucaoProposta">Solução Proposta</label>
                        <input type="text" id="txtSolucaoProposta" class="form-control" placeholder="Solução Proposta">
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-6">
                        <label class="control-label" for="txtStatus">Status</label>
                        <input type="text" id="txtStatus" class="form-control" placeholder="Status" required>
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
<script src="js/formularios/oportunidade_problema.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>