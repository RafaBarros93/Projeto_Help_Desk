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
        <div class="panel-heading">Indicadores do Processo</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista_registros">
                    <thead>
                        <tr>
                            <th>Nome Processo</th>
                            <th>Gestor</th>
                            <th>Indicador</th>
                            <th>Responsável</th>
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
            <div class="panel-heading">Indicadores do Processo</div>
            <div class="panel-body">
                <div class="form-group row">
                    <input type="text" name="txtCodigo" id="txtCodigo" hidden>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtNomeProcesso">Nome Processo</label>
                        <select id="selNomeProcesso" class="form-control" required>
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-8">
                        <label class="control-label" for="txtGestor">Gestor</label>
                        <input type="text" id="txtGestor" class="form-control" placeholder="Gestor" required>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtIndicador">Indicador</label>
                        <input type="text" id="txtIndicador" class="form-control" placeholder="Indicador" required>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtObjetivo">Objetivo</label>
                        <input type="text" id="txtObjetivo" class="form-control" placeholder="Objetivo" required>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtUnidadeMedida">Unidade Medida</label>
                        <input type="text" id="txtUnidadeMedida" class="form-control" placeholder="Unidade Medida">
                    </div>                    
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtFormulaCalculo">Fórmula Cálculo</label>
                        <input type="text" id="txtFormulaCalculo" class="form-control" placeholder="Fórmula Cálculo" >
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtMeta">Meta</label>
                        <input type="text" id="txtMeta" class="form-control" placeholder="Meta" required>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtPolaridadeTolerancia">Polaridade/Tolerância</label>
                        <input type="text" id="txtPolaridadeTolerancia" class="form-control" placeholder="Unidade Medida">
                    </div>   
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtFrequenciaMedicao">Frequência de Medição</label>
                        <input type="text" id="txtFrequenciaMedicao" class="form-control" placeholder="Frequência de Medição" >
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtFonteDados">Fonte dos Dados</label>
                        <input type="text" id="txtFonteDados" class="form-control" placeholder="Fonte dos Dados" >
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtResponsavel">Responsável</label>
                        <input type="text" id="txtResponsavel" class="form-control" placeholder="Responsável" required>
                    </div>   
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtPartesInteressadas">Partes Interessadas</label>
                        <input type="text" id="txtPartesInteressadas" class="form-control" placeholder="Partes Interessadas" >
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtAnaliseFinalResultado">Análise Final de Resultado</label>
                        <input type="text" id="txtAnaliseFinalResultado" class="form-control" placeholder="Análise Final de Resultado" >
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
<script src="js/formularios/indicadores_processo.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>