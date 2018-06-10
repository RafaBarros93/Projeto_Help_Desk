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
            </form>
        </div>
    </div>

    <!--Cria o formulario modal de cadastro de premissas -->
    <div class="modal fade" id="modal_premissas" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="modal-titulo">Premissas</h4>
                </div>
                <div class="modal-body">
                    <form class="formulario form-horizontal">
                        <fieldset disabled="disabled">
                            <div class="form-group form-group-sm">
                                <input type="text" id="txtCodigoColigada"  hidden>
                                <label class="col-sm-5 control-label" for="txtColigada">Coligada</label>
                                <div class="col-sm-7">
                                    <input type="text" id="txtColigada" class="form-control" placeholder="Coligada">
                                </div>
                            </div>
                        </fieldset>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-5 control-label" for="txtPlanoSaude">Plano Saúde</label>
                            <div class="col-sm-7">
                                <input type="text" id="txtPlanoSaude" class="form-control valor" placeholder="Plano Saúde">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-5 control-label" for="txtValeRefeicao">Vale Refeição</label>
                            <div class="col-sm-7">
                                <input type="text" id="txtValeRefeicao" class="form-control valor" placeholder="Vale Refeição">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-5 control-label" for="txtSeguroVida">Seguro Vida</label>
                            <div class="col-sm-7">
                                <input type="text" id="txtSeguroVida" class="form-control percentual" placeholder="Seguro Vida">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-5 control-label" for="txtValeTransporte">Vale Transporte</label>
                            <div class="col-sm-7">
                                <input type="text" id="txtValeTransporte" class="form-control percentual" placeholder="Vale Transporte">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-5 control-label" for="txtAjudaCusto">Ajuda de Custo</label>
                            <div class="col-sm-7">
                                <input type="text" id="txtAjudaCusto" class="form-control valor" placeholder="Ajuda de Custo">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-5 control-label" for="txtAuxilioCreche">Auxílio Creche</label>
                            <div class="col-sm-7">
                                <input type="text" id="txtAuxilioCreche" class="form-control valor" placeholder="Auxílio Creche">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-5 control-label" for="txtContribuicaoSindical">Contribuição Sindical</label>
                            <div class="col-sm-7">
                                <input type="text" id="txtContribuicaoSindical" class="form-control valor" placeholder="Contribuição Sindical">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-5 control-label" for="txtCursosTreinamentos">Cursos e Treinamentos</label>
                            <div class="col-sm-7">
                                <input type="text" id="txtCursosTreinamentos" class="form-control valor" placeholder="Cursos e Treinamentos">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-5 control-label" for="txtMedicinaOcupacional">Medicina Ocupacional - Exames</label>
                            <div class="col-sm-7">
                                <input type="text" id="txtMedicinaOcupacional" class="form-control valor" placeholder="Medicina Ocupacional - Exames">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-5 control-label" for="txtRecrutamento">Recrutamento</label>
                            <div class="col-sm-7">
                                <input type="text" id="txtRecrutamento" class="form-control valor" placeholder="Recrutamento">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-5 control-label" for="txtUniformesEpi">Uniformes e Epi</label>
                            <div class="col-sm-7">
                                <input type="text" id="txtUniformesEpi" class="form-control valor" placeholder="Uniformes e Epi">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-5 control-label" for="txtBonus">Bônus</label>
                            <div class="col-sm-7">
                                <input type="text" id="txtBonus" class="form-control valor" placeholder="Bônus">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="salvarPremissas()">Salvar mudanças</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Cria a lista de coligadas -->
    <div class="panel panel-primary">
        <div class="panel-heading">Coligadas</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista-coligadas">
                    <thead>
                        <tr>
                            <th>Coligada</th>
                            <!-- <th>Nome</th> -->
                            <th>CNPJ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php  
                            require_once("rotinas/config.php");
                            
                            $ch = curl_init();
                            curl_setopt($ch, CURLOPT_URL, BASE_URL_SERVICO."/coligadas");
                            //para nao imprimir o curl apos a execucao
                            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                            $data = curl_exec($ch);
                            curl_close($ch);
                            //prepara o json
                            $data = json_decode($data, true);
                            $coligadas = $data["result"];
                            for($i=0;$i<count($coligadas); $i++){
                                echo '<tr id="linha'.($i +1).'">';
                                    // echo '<td>'.$coligadas[$i]['Sigla'].'</td>';
                                    echo '<td>'.$coligadas[$i]['Nome'].'</td>';
                                    echo '<td>'.mask($coligadas[$i]['CNPJ'],'##.###.###/####-##').'</td>';
                                    echo '<td><button class="btn btn-primary btn-xs" onclick="editarPremissas('.($i+1).')">Premissas</button></td>';
                                    echo '<td hidden>'.$coligadas[$i]['Codigo'].'</td>';
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
<script src="js/formularios/cadastro_premissa.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>