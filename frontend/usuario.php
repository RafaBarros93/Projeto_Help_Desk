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
        <div class="panel-heading">Usuários</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista_registros">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Grupo de Usuário</th>
                            <th>Ativo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="lista_registros_corpo">
                        <?php  
                            require_once("rotinas/config.php");

                            $ch = curl_init();
                            curl_setopt($ch, CURLOPT_URL, BASE_URL_SERVICO."/usuario");
                            //para nao imprimir o curl apos a execucao
                            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                            $data = curl_exec($ch);
                            curl_close($ch);
                            //prepara o json
                            $data = json_decode($data, true);
                            $dados = $data["result"];
                            for($i=0;$i<count($dados); $i++){
                                echo '<tr id="linha'.$dados[$i]['CodigoUsuario'].'">';
                                    echo '<td>'.$dados[$i]['Nome'].'</td>';
                                    echo '<td>'.$dados[$i]['Email'].'</td>';
                                    echo '<td>'.$dados[$i]['GrupoUsuario'].'</td>';
                                    echo '<td>'.$dados[$i]['Ativo'].'</td>';
                                    echo '<td>';
                                        echo '<button class="btn btn-primary btn-xs" onclick="editar('.$dados[$i]['CodigoUsuario'].')">Editar</button>&nbsp;';
                                        echo '<button class="btn btn-danger btn-xs" onclick="excluir('.$dados[$i]['CodigoUsuario'].')">Excluir</button>';
                                    echo '</td>';
                                    echo '<td hidden>'.$dados[$i]['CodigoGrupoUsuario'].'</td>';
                                    echo '<td hidden>'.$dados[$i]['VisualizarTodosProcessos'].'</td>';
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
                    <h4 class="modal-title" id="modal-titulo">Usuário</h4>
                </div>
                <div class="modal-body">
                    <form class="formulario" name="form">
                        <input type="text" id="txtCodigo" hidden>
                        <div class="form-group form-group-sm" id="mensagem">
                            <div class="alert alert-warning" role="alert">
                                <strong>Atenção!</strong> O nome, email, senha e grupo de usuário são obrigatórios.
                            </div>
                        </div>
                        <div class="form-group form-group-sm" id="mensagemSenha">
                            <div class="alert alert-warning" role="alert">
                                <strong>Atenção!</strong> As senhas não conferem.
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtNome">Nome</label>
                            <input type="text" id="txtNome" class="form-control" placeholder="Insira um nome">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtEmail">Email</label>
                            <input type="email" id="txtEmail" class="form-control" placeholder="Insira um email">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtSenha">Senha</label>
                            <input type="password" id="txtSenha" class="form-control" placeholder="Insira uma senha">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtConfirmarSenha">Confirmar Senha</label>
                            <input type="password" id="txtConfirmarSenha" class="form-control" placeholder="Insira a confirmacao da senha">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selGrupoUsuario">Grupo Usuário</label>
                            <select id="selGrupoUsuario" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" id="chbAtivo"> Ativo
                            </label>&nbsp;
                            <label>
                                <input type="checkbox" id="chbVisualizarTodosProcessos"> Visualizar Todos Processos
                            </label>
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
<script src="js/formularios/usuario.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>