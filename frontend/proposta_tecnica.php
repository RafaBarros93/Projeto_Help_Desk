<?php
    require_once("layout/cabecalho_layout.php");
?>

<div class="container">

    <!-- Filtro da proposta -->
    <div class="panel panel-primary" id="filtros">
        <div class="panel-heading">Propostas de Orçamento</div>
        <div class="panel-body">
            <div class="form-group row justify-content-center">
                <div class="form-group-sm col-sm-12 col-md-3">
                    <label class="control-label" for="selFiltroEmpreendimento">Empreendimento</label>
                    <select id="selFiltroEmpreendimento" class="form-control" required>
                        <option value=""></option>
                    </select>
                </div>
                <div class="form-group-sm col-sm-12 col-md-3">
                    <label class="control-label" for="selFiltroFornecedor">Fornecedor</label>
                    <select id="selFiltroFornecedor" class="form-control" required>
                        <option value=""></option>
                    </select>
                </div>
                <div class="form-group-sm col-sm-12 col-md-3">
                    <label class="control-label" for="selFiltroMaterialServico">Material ou Serviço</label>
                    <select id="selFiltroMaterialServico" class="form-control" required>
                        <option value=""></option>
                    </select>
                </div>
                <div class="form-group-sm col-sm-12 col-md-3">
                    <label class="control-label" for="selFiltroValor">Filtrar valor</label>
                    <select id="selFiltroValor" class="form-control" required>
                        <option value="0"></option>
                        <option value="1">0 a R$500.000,00</option>
                        <option value="2">R$500.000,00 a R$ 1.500.000,00</option>
                        <option value="3">R$1.500.000,00 a R$ 2.000.000,00</option>
                        <option value="4">Acima de R$ 2.000.000,00</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="panel-footer">
            <button type="button" class="btn btn-primary btn-sm" onclick="listarRegistros()">Pesquisar</button>
            <button type="button" class="btn btn-success btn-sm" onclick="novoRegistro()">Adicionar Cotação</button>
        </div>
    </div>

    <!-- tabela dos registros -->
    <div class="panel panel-primary" id="lista">
        <div class="panel-heading">Cotações</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista_registros">
                    <thead>
                        <tr>
                            <th>Empreendimento</th>
                            <th>Fornecedor</th>
                            <th>Material/Serviço</th>
                            <th>Valor Total</th>
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

    <!-- formulario de inclusao de propostas -->
    <form onsubmit="salvarRegistro()" id="formulario" method="post" hidden>
        <div class="panel panel-primary">
            <div class="panel-heading">Proposta</div>
            <div class="panel-body">
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <input type="text" name="txtCodigo" id="txtCodigo" hidden>
                        <label class="control-label" for="selEmpreendimento">Empreendimento</label>
                        <select id="selEmpreendimento" class="form-control" required>
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="selFornecedor">Fornecedor</label>
                        <select id="selFornecedor" class="form-control" required>
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="selMaterialServico">Material ou serviço</label>
                        <select id="selMaterialServico" class="form-control" required>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtPesoMaterial">Peso:</label>
                        <input type="number" id="txtPesoMaterial" class="form-control" placeholder="Peso material" required>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtValorMaterial">Material:</label>
                        <input type="text" id="txtValorMaterial" class="form-control valor" placeholder="Valor material" required>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtMaoDeObra">Mão de obra:</label>
                        <input type="text" id="txtMaoDeObra" class="form-control valor" placeholder="Valor mão de obra">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="chbNaoSeAplica" value="option1">
                            <label class="form-check-label" for="chbNaoSeAplica">Não se aplica</label>
                        </div>
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
<script src="js/formularios/proposta_tecnica.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>