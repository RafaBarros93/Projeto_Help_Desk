<?php
    require_once("layout/cabecalho_layout.php");
?>


<div class="container">

    <!-- formulario principal -->
    <form onsubmit="salvarRegistro()" id="formulario" method="post" hidden>
        <div class="panel panel-primary" id="formulario">
            <div class="panel-heading">Orçamento Despesas</div>
            <div class="panel-body">
                <div class="form-group row">
                    <input type="text" name="txtCodigo" id="txtCodigo" hidden>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="selColigada">Coligada</label>
                        <select id="selColigada" class="form-control" required>
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="selCentroCusto">Centro Custo</label>
                        <select id="selCentroCusto" class="form-control" required>
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="selGrupo">Grupo</label>
                        <select id="selGrupo" class="form-control" required>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="selContaOrcamento">Conta Orçamento</label>
                        <select id="selContaOrcamento" class="form-control" required>
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="selContaContabil">Conta Contabil</label>
                        <select id="selContaContabil" class="form-control" required>
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-4">
                        <label class="control-label" for="txtFornecedor">Fornecedor</label>
                        <input type="text" id="txtFornecedor" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-group-sm col-sm-12 col-md-11">
                        <label class="control-label" for="txtHistorico">Histórico</label>
                        <input type="text" id="txtHistorico" class="form-control">
                    </div>
                    <div class="form-group-sm col-sm-12 col-md-1">
                        <label class="control-label" for="txtAno">Ano</label>
                        <input type="number" id="txtAno" class="form-control">
                    </div>
                </div>
                
                <ul class="list-group" id="lista_valores">
                    <li class="list-group-item" id="linha1">
                        <div class="form-group row">            
                            <div class="form-group-sm col-sm-12 col-md-2">
                                <label class="control-label" for="selMes1">Mês</label>
                                <select id="selMes1" class="form-control input-sm">
                                    <option value="1">Janeiro</option> 
                                    <option value="2">Fevereiro</option>
                                    <option value="3">Março</option>
                                    <option value="4">Abril</option>
                                    <option value="5">Maio</option>
                                    <option value="6">Junho</option>
                                    <option value="7">Julho</option>
                                    <option value="8">Agosto</option>
                                    <option value="9">Setembro</option>
                                    <option value="10">Outubro</option>
                                    <option value="11">Novembro</option>
                                    <option value="12">Dezembro</option>
                                </select>
                            </div>
                            <div class="form-group-sm col-sm-12 col-md-2" id="divValor1">
                                <label class="control-label" for="txtValor1">Valor</label>
                                <input type="text" id="txtValor1" class="form-control valor" value="R$ 0,00">
                            </div>
                            <div class="form-group-sm col-sm-12 col-md-2" id="divQtdeViagem1" hidden>
                                <label class="control-label" for="txtQtdeViagem1">Qtde. de Viagens</label>
                                <input type="number" id="txtQtdeViagem1" class="form-control">
                            </div>
                            <div class="form-group-sm col-sm-12 col-md-2" id="divQtdeDiarias1" hidden>
                                <label class="control-label" for="txtQtdeDiarias1">Nº Diárias</label>
                                <input type="number" id="txtQtdeDiarias1" class="form-control">
                            </div>
                            <div class="form-group-sm col-sm-12 col-md-3" id="divDestino1" hidden>
                                <label class="control-label" for="txtDestino1">Destino</label>
                                <input type="text" id="txtDestino1" class="form-control">
                            </div>
                            <div class="form-group-sm col-sm-12 col-md-8" id="divObservacao1">
                                <label class="control-label" for="txtObservacao1">Observação</label>
                                <input type="text" id="txtObservacao1" class="form-control">
                            </div>
                        </div>            
                    </li>
                </ul>
            </div>
            <div class="panel-footer">
                <button type="submit" class="btn btn-primary btn-sm">Salvar</button>
                <button type="button" class="btn btn-default btn-sm" onclick="cancelarRegistro()">Cancelar</button>
                <!-- <button type="button" class="btn btn-success btn-sm" onclick="novoValor()">Novo Valor</button>
                <button type="button" class="btn btn-success btn-sm" onclick="exibirModalQtde()">Repetir Valor</button> -->
            </div>
        </div>
    </form>

    <!-- formulario modal -->
    <div class="modal fade" id="formulario_repetir" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="modal-titulo">Repetir</h4>
                </div>
                <div class="modal-body">
                    <label class="control-label" for="txtObservacao1">Quantidade Repetição</label>
                    <input type="number" id="txtQtde" class="form-control" max="12" min="0">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    <button type="submit" class="btn btn-primary" onclick="repetirValor()">Repetir</button>
                </div>
            </div>
        </div>
    </div>

     <!-- formulario de filtros -->
     <div class="panel panel-primary" id="filtros">
        <div class="panel-heading">Filtros</div>
        <div class="panel-body">
            <div class="form-group row">
                <div class="form-group-sm col-sm-12 col-md-4">
                    <label class="control-label" for="selColigadaP">Coligada</label>
                    <select id="selColigadaP" class="form-control" required>
                        <option value=""></option>
                    </select>
                </div>
                <div class="form-group-sm col-sm-12 col-md-4">
                    <label class="control-label" for="selCentroCustoP">Centro Custo</label>
                    <select id="selCentroCustoP" class="form-control" required>
                        <option value=""></option>
                    </select>
                </div>
                <div class="form-group-sm col-sm-12 col-md-4">
                    <label class="control-label" for="selGrupoP">Grupo</label>
                    <select id="selGrupoP" class="form-control" required>
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="form-group-sm col-sm-12 col-md-4">
                    <label class="control-label" for="selContaOrcamentoP">Conta Orçamento</label>
                    <select id="selContaOrcamentoP" class="form-control" required>
                        <option value=""></option>
                    </select>
                </div>
                <div class="form-group-sm col-sm-12 col-md-4">
                    <label class="control-label" for="selContaContabilP">Conta Contabil</label>
                    <select id="selContaContabilP" class="form-control" required>
                        <option value=""></option>
                    </select>
                </div>
                <div class="form-group-sm col-sm-12 col-md-1">
                    <label class="control-label" for="txtAnoP">Ano</label>
                    <input type="number" id="txtAnoP" class="form-control">
                </div>
            </div>
        </div>
        <div class="panel-footer">
            <button type="button" class="btn btn-primary btn-sm" onclick="carregaRegistros()">Pesquisar</button>
            <button type="button" class="btn btn-success btn-sm" onclick="novoRegistro()">Novo Registro</button>
        </div>
    </div>

    <!-- tabela dos registros -->
    <div class="panel panel-primary" id="lista">
        <div class="panel-heading">Orçamento Despesas</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista_registros">
                    <thead>
                        <tr>
                            <th>Mês</th>
                            <th>Valor</th>
                            <th>Coligada</th>
                            <th>Centro Custo</th>
                            <th>Grupo</th>
                            <th>Conta Orçamento</th>
                            <th>Conta Contábil</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="lista_corpo">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

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
<script src="js/formularios/orcamento_despesa.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>