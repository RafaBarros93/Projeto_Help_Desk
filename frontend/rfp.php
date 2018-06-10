<?php
    require_once("layout/cabecalho_layout.php");
?>

<div class="container">

    <!-- formulario filtro -->
    <div class="panel panel-primary" id="filtros">
        <div class="panel-heading">Filtros</div>
        <div class="panel-body">
            <div class="form-group row">
                <div class="form-group-sm col-sm-12 col-md-6">
                    <label class="control-label" for="selEmpresa">Empresa</label>
                    <select id="selEmpresa" class="form-control">
                        <option value=""></option>
                    </select>
                </div>
                <div class="form-group-sm col-sm-12 col-md-6">
                    <label class="control-label" for="selMacroProcesso">Macro Processo</label>
                    <select id="selMacroProcesso" class="form-control">
                        <option value=""></option>
                    </select>
                </div>
            </div>
        </div>
        <div class="panel-footer">
            <button type="button" class="btn btn-primary btn-sm" onclick="carregaRFP()">Pesquisar</button>
        </div>
    </div>

    <!-- tabela dos registros -->
    <div class="panel panel-primary" id="lista">
        <div class="panel-heading">RFP</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista_registros">
                    <thead>
                        <tr>
                            <th>Macro Processo</th>
                            <th>Empresa</th>
                            <th>Pergunta</th>
                            <th>Avaliação</th>
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
            <div class="panel-heading">RFP</div>
            <div class="panel-body">
                <div class="form-group row">
                    <input type="text" name="txtCodigo" id="txtCodigo" hidden>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtMacroProcesso">Macro Processo</label>
                        <input type="text" id="txtMacroProcesso" class="form-control" placeholder="MacroProcesso">
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtEmpresa">Empresa</label>
                        <input type="text" id="txtEmpresa" class="form-control" placeholder="Empresa">
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="selAvaliacao">Avaliação</label>
                        <select id="selAvaliacao" class="form-control" required>
                            <option value=""></option>
							<option value="A">Atende</option>
                            <option value="N">Não Atende</option>
                            <option value="P">Atende Parcialmente</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-12">
                        <label class="control-label" for="txtPergunta">Pergunta</label>
                        <textarea class="form-control" id="txtPergunta" rows="5"></textarea>
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
<script src="js/formularios/rfp.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>