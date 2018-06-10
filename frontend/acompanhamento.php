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
        <div class="panel-heading">Acompanhamentos</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista_registros">
                    <thead>
                        <tr>
                            <th>Nome Processo</th>
                            <th>Dono Processo</th>
                            <th>Impacta SapBexs</th>
                            <th>Sistema</th>
                            <th>Analista</th>
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
            <div class="panel-heading">Acompanhamento</div>
            <div class="panel-body">
                <div class="form-group row">
                    <input type="text" name="txtCodigo" id="txtCodigo" hidden>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="selProcesso">Processo</label>
                        <select id="selProcesso" class="form-control" required onchange="preencheDadosProcesso(this.value)">
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtDonoProcesso">Dono Processo</label>
                        <input type="text" id="txtDonoProcesso" class="form-control" placeholder="Dono Processo" disabled>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtImpactaSapbexs">Impacta SapBexs</label>
                        <input type="text" id="txtImpactaSapbexs" class="form-control" placeholder="Impacta SapBexs" disabled>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-6">
                        <label class="control-label" for="txtSistema">Sistema</label>
                        <input type="text" id="txtSistema" class="form-control" placeholder="Sistema" disabled>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-6">
                        <label class="control-label" for="txtAnalista">Analista</label>
                        <input type="text" id="txtAnalista" class="form-control" placeholder="Analista" disabled>
                    </div>
                </div>
                <hr>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <caption><button type="button" class="btn btn-success btn-sm" onclick="modalItem()">Inserir Item</button></caption>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Data Entrega Prevista</th>
                                <th>Data Entrega Real</th>
                                <th>Status</th>
                                <th>Responsável</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody id="lista_item">
                        </tbody>
                    </table>
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

    <!-- Modal para edição e inserção de itens -->
    <div class="modal fade" id="modal_item" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h5 class="modal-title">Item</h5>
                </div>
                <div class="modal-body">
                    <form id="form_item">
                        <div class="form-group row">
                            <div class="form-group-sm col-sm-12 col-md-12" id="mensagem_item" hidden>
                                <div class="alert alert-warning" role="alert">
                                    <strong>Atenção!</strong>
                                    <div id="msg_alerta">
                                        <p>Os campos abaixos são obrigatórios:</p>
                                        <ul>
                                            <li>Item</li>
                                            <li>Data Entrega Prevista</li>
                                            <li>Status</li>
                                            <li>Responsável</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group-sm col-sm-12 col-md-6">
                                <input type="text" id="txtIndiceItem" hidden>
                                <label class="control-label" for="selItem">Item</label>
                                <select id="selItem" class="form-control" required>
                                    <option value=""></option>
                                    <option value="1">Benchmarking / Macro Proposta de Solução</option>
                                    <option value="2">Mapa de Processos(Bizagi)</option>
                                    <option value="3">PDD</option>
                                    <option value="4">Validação dos Itens da RFP</option>
                                    <option value="5">Plano Ação</option>
                                    <option value="6">Planilha de Problemas</option>
                                    <option value="7">Diagrama de Escopo</option>
                                    <option value="8">Indicadores</option>
                                </select>
                            </div>
                            <div class="form-group-sm col-sm-12 col-md-3">
                                <label class="control-label" for="txtDataEntregaPrevista">Data Entrega Prevista</label>
                                <input type="Date" id="txtDataEntregaPrevista" class="form-control" required>
                            </div>
                            <div class="form-group-sm col-sm-12 col-md-3">
                                <label class="control-label" for="txtDataEntregaReal">Data Entrega Real</label>
                                <input type="Date" id="txtDataEntregaReal" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="form-group-sm col-sm-12 col-md-4">
                                <label class="control-label" for="selStatus">Status</label>
                                <select id="selStatus" class="form-control" required>
                                    <option value=""></option>
                                    <option value="E">Em Andamento</option>
                                    <option value="C">Concluído</option>
                                    <option value="N">Não Iniciado</option>
                                </select>
                            </div>
                            <div class="form-group-sm col-sm-12 col-md-8">
                                <label class="control-label" for="txtResponsavel">Responsável</label>
                                <input type="text" id="txtResponsavel" class="form-control" placeholder="Responsável" required>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success" onclick="salvarItem()">Salvar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

</div>

<script src="js/mask.js"></script> 
<script src="js/mask_money.js"></script>
<script src="js/config.js"></script>
<script src="js/formularios/acompanhamento.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>