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
        <div class="panel-heading">Planos Ação</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista_registros">
                    <thead>
                        <tr>
                            <th>Frente</th>
                            <th>Nome Processo</th>
                            <th>Responsável</th>
                            <th>Ação</th>
                            <th>Data Início</th>
                            <th>Data Fim</th>
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
            <div class="panel-heading">Plano Ação</div>
            <div class="panel-body">
                <div class="form-group row">
                    <input type="text" name="txtCodigo" id="txtCodigo" hidden>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtFrente">Frente</label>
                        <input type="text" id="txtFrente" class="form-control" placeholder="Frente" required>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="selNomeProcesso">Nome Processo</label>
                        <select id="selNomeProcesso" class="form-control" required>
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtResponsavel">Responsável</label>
                        <input type="text" id="txtResponsavel" class="form-control" placeholder="Responsável" required>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtAcao">Ação</label>
                        <input type="text" id="txtAcao" class="form-control" placeholder="Ação" required>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-2">
                        <label class="control-label" for="txtDataInicio">Data Início</label>
                        <input type="text" id="txtDataInicio" class="form-control data" required>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-2">
                        <label class="control-label" for="txtDataFim">Data Fim</label>
                        <input type="text" id="txtDataFim" class="form-control data" required>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="selStatus">Status</label>
                        <select id="selStatus" class="form-control" required>
                            <option value=""></option>
							<option value="D">A Definir</option>
                            <option value="A">Andamento</option>
                            <option value="C">Cancelado</option>
                            <option value="O">Concluído</option>
                            <option value="N">Não Iniciado</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-12">
                        <label class="control-label" for="txtObservacao">Observação</label>
                        <textarea class="form-control" id="txtObservacao" rows="5"></textarea>
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
<script src="js/formularios/plano_acao.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>