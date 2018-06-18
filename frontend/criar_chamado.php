<?php
    require_once("layout/cabecalho_layout.php");
?>

    <div class="container">

       

        <!-- Formulario para manipulacao dos registros -->
        <form onsubmit="salvarRegistro()" id="formulario" method="post">
            <div class="panel panel-primary">
                <div class="panel-heading">Abertura de chamado</div>
                <div class="panel-body">
                    <div class="form-group row">
                        <input type="text" name="txtCodigo" id="txtCodigo" hidden>
                        <div class="form-group-sm col-sm-12 col-md-4">
                            <label class="control-label" for="txtTitulo">Título</label>
                            <input type="text" id="txtTitulo" class="form-control" placeholder="Título" required>
                        </div>
                        <div class="form-group-sm col-sm-12 col-md-4">
                            <label class="control-label" for="selCategoria">Categoria</label>
                            <select id="selCategoria" class="form-control" required>
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
                            <label class="control-label" for="txtLocalizacao">Localização</label>
                            <input type="text" id="txtLocalizacao" class="form-control" placeholder="Localização" required>
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
                            <label class="control-label" for="selStatusPrioridade">Prioridade</label>
                            <select id="selStatusPrioridade" class="form-control" required>
                                <option value=""></option>
                                <option value="B">Baixa</option>
                                <option value="M">Média</option>
                                <option value="A">Alta</option>

                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
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
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
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
    <script src="js/formularios/chamado.js"></script>

    <?php
    require_once("layout/rodape_layout.php");
?>