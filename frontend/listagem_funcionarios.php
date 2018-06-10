<?php
    require_once("layout/cabecalho_layout.php");
?>

<div class="container">
    <div class="panel panel-primary">
        <div class="panel-heading">Filtros</div>
        <div class="panel-body">
            <form class="form-inline">
                <label class="control-label" for="txtBuscar">Pesquise na tabela por:</label>
                <input type="text" id="txtBuscar" placeholder="Buscar por" class="form-control input-sm">
                <button type="button" class="btn btn-primary btn-sm" onclick="novoFuncionario()">Novo Funcionário</button>
            </form>
        </div>
    </div>

    <!--Cria o formulario modal para criar um novo funcionario -->
    <div class="modal fade" id="novo_funcionario" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="modal-titulo">Novo Funcionário</h4>
                </div>
                <div class="modal-body">
                    <form class="formulario form-horizontal">
                        <fieldset disabled="disabled">
                            <div class="form-group form-group-sm">
                                <label class="col-sm-2 control-label" for="txtNovoNome">Nome</label>
                                <div class="col-sm-10">
                                    <input type="text" id="txtNovoNome" class="form-control" placeholder="Nome">
                                </div>
                            </div>
                        </fieldset>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="selNovoColigada">Coligada</label>
                            <div class="col-sm-10">
                                <select id="selNovoColigada" class="form-control" placeholder="Coligada">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <!-- <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="selNovoDiretoria">Diretoria</label>
                            <div class="col-sm-10">
                                <select id="selNovoDiretoria" class="form-control" placeholder="Diretoria">
                                    <option></option>
                                </select>
                            </div>
                        </div> -->
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="selNovoCentroCusto">Centro Custo</label>
                            <div class="col-sm-10">
                                <select id="selNovoCentroCusto" class="form-control" placeholder="Centro Custo">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="selNovoCargo">Cargo</label>
                            <div class="col-sm-10">
                                <select id="selNovoCargo" class="form-control" placeholder="Cargo">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="selNovoStatus">Status</label>
                            <div class="col-sm-10">
                                <select id="selNovoStatus" class="form-control" placeholder="Status">
                                    <option></option>
                                    <option>ATIVO</option>
                                    <option>DEMITIDO</option>
                                    <option>NOVO COLABORADOR</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="txtNovoSalario">Salário</label>
                            <div class="col-sm-10">
                                <input type="text" id="txtNovoSalario" class="form-control valor" placeholder="Salário">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="txtNovoDataAdmissao">Data Admissão</label>
                            <div class="col-sm-10">
                                <input type="text" id="txtNovoDataAdmissao" class="form-control data">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="salvarNovoFuncionario()">Salvar mudanças</button>
                </div>
            </div>
        </div>
    </div>

    <!--Cria o formulario modal para edicao do funcionario -->
    <div class="modal fade" id="editar_funcionario" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="modal-titulo">Editar Funcionário</h4>
                </div>
                <div class="modal-body">
                    <form class="formulario form-horizontal">
                        <input type="text" id="txtCodigoID" hidden>
                        <fieldset disabled="disabled">
                            <!-- <div class="form-group form-group-sm">
                                <label class="col-sm-2 control-label" for="txtMatricula">Matrícula</label>
                                <div class="col-sm-10">
                                    <input type="text" id="txtMatricula" class="form-control" placeholder="Matrícula">
                                </div>
                            </div> -->
                            <div class="form-group form-group-sm">
                                <label class="col-sm-2 control-label" for="txtNome">Nome</label>
                                <div class="col-sm-10">
                                    <input type="text" id="txtNome" class="form-control" placeholder="Nome">
                                </div>
                            </div>
                        </fieldset>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="selColigada">Coligada</label>
                            <div class="col-sm-10">
                                <select id="selColigada" class="form-control" placeholder="Coligada">
                                </select>
                            </div>
                        </div>
                        <!-- <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="selDiretoria">Diretoria</label>
                            <div class="col-sm-10">
                                <select id="selDiretoria" class="form-control" placeholder="Diretoria">
                                </select>
                            </div>
                        </div> -->
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="selCentroCusto">Centro Custo</label>
                            <div class="col-sm-10">
                                <select id="selCentroCusto" class="form-control" placeholder="Centro Custo">
                                </select>
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="selCargo">Cargo</label>
                            <div class="col-sm-10">
                                <select id="selCargo" class="form-control" placeholder="Cargo">
                                </select>
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="selStatus">Status</label>
                            <div class="col-sm-10">
                                <select id="selStatus" class="form-control" placeholder="Status">
                                    <option>ATIVO</option>
                                    <option>DEMITIDO</option>
                                    <option>NOVO COLABORADOR</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="txtSalario">Salário</label>
                            <div class="col-sm-10">
                                <input type="text" id="txtSalario" class="form-control valor" placeholder="Salário">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="txtDataAdmissao">Data Admissão</label>
                            <div class="col-sm-10">
                                <input type="text" id="txtDataAdmissao" class="form-control data">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="txtDataAlteracaoSalario">Data Alteração Sálario</label>
                            <div class="col-sm-10">
                                <input type="text" id="txtDataAlteracaoSalario" class="form-control data">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="txtDataDemissao">Data Demissão</label>
                            <div class="col-sm-10">
                                <input type="text" id="txtDataDemissao" class="form-control data">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="txtAumentoSalario2">Aumento Salário 2</label>
                            <div class="col-sm-10">
                                <input type="text" id="txtAumentoSalario2" class="form-control valor" placeholder="Aumento Salário 2">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="txtDataAlteracaoSalario2">Data Alteração Sálario 2</label>
                            <div class="col-sm-10">
                                <input type="text" id="txtDataAlteracaoSalario2" class="form-control data">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-2 control-label" for="txtSalarioAtual">Salário Atual</label>
                            <div class="col-sm-10">
                                <input type="text" id="txtSalarioAtual" class="form-control valor" disabled>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="salvarEdicaoFuncionario()">Salvar mudanças</button>
                </div>
            </div>
        </div>
    </div>


    <!-- Cria a lista de funcionarios -->
    <div class="panel panel-primary">
        <div class="panel-heading">Funcionários</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista-funcionarios">
                    <thead>
                        <tr>
                            <th>Coligada</th>
                            <!-- <th>Matrícula</th> -->
                            <th>Nome</th>
                            <th>Data Admissão</th>
                            <th>Salário</th>
                            <th>Centro Custo</th>
                            <!-- <th>Diretoria</th> -->
                            <th>Cargo</th>
                            <th>Status</th>
                            <th>Data Demissão</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="listagem_funcionarios">
                        <?php  
                            require_once("rotinas/config.php");

                            $ch = curl_init();
                            curl_setopt($ch, CURLOPT_URL, BASE_URL_SERVICO."/funcionarios");
                            //para nao imprimir o curl apos a execucao
                            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                            $data = curl_exec($ch);
                            curl_close($ch); 
                            //prepara o json
                            $data = json_decode($data, true);
                            $funcionarios = $data["result"];
                            for($i=0;$i<count($funcionarios); $i++){
                                echo '<tr id="linha'.($i +1).'">';
                                    echo '<td>'.$funcionarios[$i]['Coligada'].'</td>';
                                    // echo '<td>'.$funcionarios[$i]['Matricula'].'</td>';
                                    echo '<td>'.$funcionarios[$i]['Nome'].'</td>';
                                    echo '<td>'.$funcionarios[$i]['DataAdmissao'].'</td>';
                                    echo '<td>R$ '.number_format($funcionarios[$i]['Salario'],2, ',','.').'</td>';
                                    echo '<td>'.$funcionarios[$i]['CentroCusto'].'</td>';
                                    // echo '<td>'.$funcionarios[$i]['Diretoria'].'</td>';
                                    echo '<td>'.$funcionarios[$i]['Cargo'].'</td>';
                                    echo '<td>'.$funcionarios[$i]['Status'].'</td>';
                                    echo '<td>'.$funcionarios[$i]['DataDemissao'].'</td>';
                                    echo '<td style="white-space: nowrap">';
                                    echo '<button class="btn btn-primary btn-xs" onclick="editarFuncionario('.($i+1).')">Editar</button>';
                                    if ($funcionarios[$i]['Nome'] == 'NOVO COLABORADOR') {
                                        echo '<button class="btn btn-danger btn-xs" onclick="deletarFuncionario('.($i+1).')">Excluir</button>';
                                    }
                                    echo '</td>';
                                    echo '<td hidden>'.$funcionarios[$i]['DataSalario'].'</td>';//data alteracao salario
                                    echo '<td hidden>'.$funcionarios[$i]['CPF'].'</td>';
                                    echo '<td hidden>R$ '.number_format($funcionarios[$i]['AumentoSalario2'],2, ',','.').'</td>';
                                    echo '<td hidden>'.$funcionarios[$i]['DataAumentoSalario2'].'</td>';
                                    echo '<td hidden>R$ '.number_format($funcionarios[$i]['SalarioAtual'],2, ',','.').'</td>';
                                echo '</tr>';
                            }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<script src="js/mask.js"></script> 
<script src="js/mask_money.js"></script>
<script src="js/config.js"></script>
<script src="js/formularios/cadastro_funcionario.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>