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
                <nav aria-label="...">
                    <ul class="pager">
                        <li class="previous"><a href="#" id="pagina_anterior" onclick="paginaAnterior()"><span aria-hidden="true">&larr;</span> Anterior</a></li>
                        <li class="next"><a href="#" id="proxima_pagina" onclick="paginaProxima()">Próxima <span aria-hidden="true">&rarr;</span></a></li>
                    </ul>
                </nav>
            </form>
        </div>
    </div>

    <!-- Cria a lista de registros -->
    <div class="panel panel-primary">
        <div class="panel-heading">Comarcas</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista_registros">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="lista_registros_corpo">
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
                    <h4 class="modal-title" id="modal-titulo">Comarca</h4>
                </div>
                <div class="modal-body">
                    <form class="formulario form-horizontal" name="form">
                        <input type="text" id="txtCodigo" hidden>
                        <div class="form-group form-group-sm" id="mensagem">
                            <div class="alert alert-warning" role="alert">
                                <strong>Atenção!</strong> A descrição é obrigatória.
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-3 control-label" for="txtDescricao">Descrição</label>
                            <div class="col-sm-9">
                                <input type="text" id="txtDescricao" class="form-control" placeholder="Insira uma descrição">
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="col-sm-3 control-label" for="selEstado">Estado</label>
                            <div class="col-sm-9">
                                <select id="selEstado" class="form-control" placeholder="Estado">
                                    <option value="0"></option>
                                </select>
                            </div>
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
<script src="js/formularios/comarca.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>