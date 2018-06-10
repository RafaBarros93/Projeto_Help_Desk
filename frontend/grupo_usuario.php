<?php
    require_once("layout/cabecalho_layout.php");
?>

<div class="container">
    <div class="panel panel-primary">
        <div class="panel-heading">Filtros</div>
        <div class="panel-body">
            <form class="form-inline">
                <label class="control-label" for="txtBuscar">Pesquise na tabela por:</label>
                <input type="text" id="txtBuscar" placeholder="Buscar por" class="form-control input-sm">&nbsp;
                <button type="button" class="form-control btn btn-success btn-sm" onclick="inserir()">Inserir</button>
            </form>
        </div>
    </div>

    <!-- Cria a lista de registros -->
    <div class="panel panel-primary">
        <div class="panel-heading">Grupos de Usuários</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista_registros">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Ativo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="lista_registros_corpo">
                        <?php  
                            require_once("rotinas/config.php");

                            $ch = curl_init();
                            curl_setopt($ch, CURLOPT_URL, BASE_URL_SERVICO."/grupoUsuario");
                            //para nao imprimir o curl apos a execucao
                            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                            $data = curl_exec($ch);
                            curl_close($ch);
                            //prepara o json
                            $data = json_decode($data, true);
                            $dados = $data["result"];
                            for($i=0;$i<count($dados); $i++){
                                echo '<tr id="linha'.$dados[$i]['CodigoGrupoUsuario'].'">';
                                    echo '<td>'.$dados[$i]['Descricao'].'</td>';
                                    echo '<td>'.$dados[$i]['Ativo'].'</td>';
                                    echo '<td>';
                                        echo '<button class="btn btn-primary btn-xs" onclick="editar('.$dados[$i]['CodigoGrupoUsuario'].')">Editar</button>&nbsp;';
                                        echo '<button class="btn btn-danger btn-xs" onclick="excluir('.$dados[$i]['CodigoGrupoUsuario'].')">Excluir</button>';
                                    echo '</td>';
                                echo '</tr>';
                            }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Cria o formulario modal -->
    <div class="modal fade" id="formulario" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="modal-titulo">Grupo de Usuário</h4>
                </div>
                <div class="modal-body">
                    <form class="formulario" name="form">
                        <input type="text" id="txtCodigo" hidden>
                        <div class="form-group form-group-sm" id="mensagem">
                            <div class="alert alert-warning" role="alert">
                                <strong>Atenção!</strong> A descrição é obrigatória.
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtDescricao">Descrição</label>
                            <input type="text" id="txtDescricao" class="form-control" placeholder="Insira uma descrição">
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" id="chbAtivo"> Ativo
                            </label>
                        </div>
                        <div class="list-group">
                            <a href="#" class="list-group-item active">Paginas</a>
                            <?php  
                                require_once("rotinas/config.php");

                                $ch = curl_init();
                                curl_setopt($ch, CURLOPT_URL, BASE_URL_SERVICO."/pagina");
                                //para nao imprimir o curl apos a execucao
                                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                                $data = curl_exec($ch);
                                curl_close($ch);
                                //prepara o json
                                $data = json_decode($data, true);
                                $dados = $data["result"];
                                for($i=0;$i<count($dados); $i++){
                                    echo '<a href="#" class="list-group-item" onclick="marcarDesmarcar('.$dados[$i]['CodigoPagina'].')">'.$dados[$i]['Nome'].' <input type="checkbox" class="pull-right" id="chb'.$dados[$i]['CodigoPagina'].'"></a>';
                                }
                            ?>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="salvar()">Salvar mudanças</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="js/config.js"></script>
<script src="js/formularios/grupo_usuario.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>