<?php
    require_once("layout/cabecalho_layout.php");
?>

<div class="container">

    <!-- Filtro da proposta -->
    <div class="panel panel-primary" id="filtros">
        <div class="panel-heading">Propostas de Orçamento</div>
        <div class="panel-body">
            <div class="form-group row">
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
            <button type="button" id="finalizarCotacao" class="btn btn-primary btn-sm" onclick="finalizarCotacao()" disabled>Finalizar Cotação</button>
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
                            <th>Peso</th>
                            <th>Peso / M²</th>
                            <th>Material R$</th>
                            <th>Material R$/Peso</th>
                            <th>Mão de Obra R$</th>
                            <th>Mão de Obra R$/Peso</th>
                            <th>Total R$</th>
                            <th>Total R$/Peso</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="lista_corpo">
                    </tbody>
                </table>
            </div>
        </div>
        <div class="panel-footer">
            <label id="lblFornecedorMenorPrecoMaterial"></label></br>
            <label id="lblFornecedorMenorPrecoMaoDeObra"></label></br>
            <label id="lblFornecedorMenorPrecoTotal"></label>
        </div>
    </div>

</div>

<script src="js/mask.js"></script> 
<script src="js/mask_money.js"></script>
<script src="js/config.js"></script>
<script src="js/formularios/cotacao_tecnica.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>