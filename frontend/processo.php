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
                        <li class="previous btn-xs"><a href="#" id="pagina_anterior" onclick="paginaAnterior()"><span aria-hidden="true">&larr;</span> Anterior</a></li>
                        <li class="next btn-xs"><a href="#" id="proxima_pagina" onclick="paginaProxima()">Próxima <span aria-hidden="true">&rarr;</span></a></li>
                    </ul>
                </nav>
            </form>
        </div>
    </div>

    <!-- Cria a lista de registros -->
    <div class="panel panel-primary">
        <div class="panel-heading">Processos</div>
        <div class="panel-body">
            <div class="table-responsive">
                <table class="table table-striped" id="lista_registros">
                    <thead>
                        <tr>
                            <th>Número Processo</th>
                            <th>Autor</th>
                            <th>Probabilidade de Perda</th>
                            <th>Tipo de Contingência</th>
                            <th>Valor Contingência</th>
                            <th>Área de Direito</th>
                            <th>Obra</th>
                            <th>Ações</th>
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
                    <h4 class="modal-title" id="modal-titulo">Processo</h4>
                </div>
                <div class="modal-body">   
                    <form class="formulario" name="form">
                        <input type="text" id="txtCodigo" hidden>
                        <div class="form-group form-group-sm" id="mensagem">
                            <div class="alert alert-warning" role="alert">
                                <strong>Atenção!</strong>
                                <div id="msg_alerta">
                                    <p>Os campos abaixos são obrigatórios:</p>
                                    <ul>
                                        <li>Nº do Processo</li>
                                        <li>Área do Direito</li>
                                        <li>Status</li>
                                        <li>Autor</li>
                                        <li>Obra / Departamento</li>
                                        <li>Probabilidade Perda</li>
                                        <li>Escritório</li>
                                        <li>Esfera</li>
                                        <li>Comarca</li>
                                        <li>Tipo Contingência</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtNumeroProcesso">Número Processo</label>
                            <input type="text" id="txtNumeroProcesso" class="form-control" maxlength="16" placeholder="Insira o número de processo">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtTribunal">Tribunal</label>
                            <input type="text" id="txtTribunal" class="form-control" placeholder="Insira o tribunal">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selAreaDireito">Área Direito</label>
                            <select id="selAreaDireito" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm" id="selecao_tipo_funcionario">
                            <label class="control-label" for="selTipoFuncionario">Tipo Funcionário</label>
                            <select id="selTipoFuncionario" class="form-control">
                                <option value="0"></option>
                                <option value="1">Próprio</option>
                                <option value="2">Terceiro</option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm" id="selecao_empreiteiro">
                            <label class="control-label" for="selEmpreiteiro">Empreiteiro</label>
                            <select id="selEmpreiteiro" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selStatus">Status</label>
                            <select id="selStatus" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selFase">Fase</label>
                            <select id="selFase" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtAutor">Autor</label>
                            <input type="text" id="txtAutor" class="form-control" placeholder="Insira o autor">
                        </div>
                        <div class="form-group form-group-sm" id="selecao_periodo_reclamado_inicial">
                            <label class="control-label" for="txtPeriodoReclamadoInicial">Período Reclamado Inicial</label>
                            <input type="text" id="txtPeriodoReclamadoInicial" class="form-control data" placeholder="Insira o periodo inicial">
                        </div>
                        <div class="form-group form-group-sm" id="selecao_periodo_reclamado_final">
                            <label class="control-label" for="txtPeriodoReclamadoFinal">Período Reclamado Final</label>
                            <input type="text" id="txtPeriodoReclamadoFinal" class="form-control data" placeholder="Insira o periodo final">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selObraDepartamento">Obra Departamento</label>
                            <select id="selObraDepartamento" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtValorCausaInicial">Valor Causa Inicial</label>
                            <input type="text" id="txtValorCausaInicial" class="form-control valor" placeholder="Insira o valor da causa inicial">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtValorAtualizado">Valor Atualizado</label>
                            <input type="text" id="txtValorAtualizado" class="form-control valor" placeholder="Insira o valor atualizado" disabled>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtValorContingencia">Valor Contingência</label>
                            <input type="text" id="txtValorContingencia" class="form-control valor" placeholder="Insira o valor contingência">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtValorContingenciaAtualizado">Valor Contingência Atualizado</label>
                            <input type="text" id="txtValorContingenciaAtualizado" class="form-control valor" placeholder="Insira o valor contingência atualizado" disabled>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtPercentualContigencia">Percentual Contingência</label>
                            <input type="text" id="txtPercentualContigencia" class="form-control percentual" placeholder="Insira o percentual de contingência" disabled>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtValorContigenciaPatrimar">Valor Contingência Patrimar</label>
                            <input type="text" id="txtValorContigenciaPatrimar" class="form-control valor" placeholder="Insira o valor de contingência patrimar" disabled>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtDataRecebimento">Data Recebimento</label>
                            <input type="text" id="txtDataRecebimento" class="form-control data" placeholder="Insira a data de recebimento">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtDataDistribuicao">Data Distribuição</label>
                            <input type="text" id="txtDataDistribuicao" class="form-control data" placeholder="Insira a data de distribuiçao">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtResumo">Resumo</label>
                            <input type="text" id="txtResumo" class="form-control" placeholder="Insira o resumo">
                        </div>  
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selEscritorio">Escritório</label>
                            <select id="selEscritorio" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>  
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selSociedade">Sociedade</label>
                            <select id="selSociedade" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selEsfera">Esfera</label>
                            <select id="selEsfera" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selRegiaoRegional">Região Regional</label>
                            <select id="selRegiaoRegional" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selComarca">Comarca</label>
                            <select id="selComarca" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selTipoAcao">Tipo Ação</label>
                            <select id="selTipoAcao" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selCodigoTipoContingencia">Tipo Contingência</label>
                            <select id="selCodigoTipoContingencia" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm" id="selecao_funcao_alegada">
                            <label class="control-label" for="selFuncaoAlegada">Função Alegada</label>
                            <select id="selFuncaoAlegada" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selEmpresaCitada">Empresa Citada</label>
                            <select id="selEmpresaCitada" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selFormaParticipacaoEmpresaCitada">Forma Participação Empresa Citada</label>
                            <select id="selFormaParticipacaoEmpresaCitada" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selProbabilidadePerda">Probabilidade Perda</label>
                            <select id="selProbabilidadePerda" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtObjeto">Objeto</label>
                            <input type="text" id="txtObjeto" class="form-control" placeholder="Insira o objeto">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtObservacao">Observação</label>
                            <textarea class="form-control" id="txtObservacao" rows="3"></textarea>
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

    <!-- Tela de aditivos do processo -->
    <div class="modal fade" id="formulario_aditivo" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="modal-titulo-aditivo">Aditivos do processo</h4>
                </div>
                <div class="modal-body">   
                    <form class="formulario" name="form-aditivo">
                    <input type="text" id="txtCodigoProcesso" hidden>
                        <div class="form-group form-group-sm" id="mensagem_aditivo">
                            <div class="alert alert-warning" role="alert">
                                <strong>Atenção!</strong> O tribunal, valor atualizado são obrigatórios.
                            </div>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtNumeroProcessoAditivo">Número Processo</label>
                            <input type="text" id="txtNumeroProcessoAditivo" class="form-control" placeholder="Insira o número de processo" disabled>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtTribunalAditivo">Tribunal</label>
                            <input type="text" id="txtTribunalAditivo" class="form-control" placeholder="Insira o tribunal">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtValorAtualizadoAditivo">Valor Atualizado</label>
                            <input type="text" id="txtValorAtualizadoAditivo" class="form-control valor" placeholder="Insira o valor atualizado">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selFaseAditivo">Fase</label>
                            <select id="selFaseAditivo" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selEscritorioAditivo">Escritório</label>
                            <select id="selEscritorioAditivo" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="selProbabilidadeAditivo">Probabilidade Perda</label>
                            <select id="selProbabilidadeAditivo" class="form-control">
                                <option value="0"></option>
                            </select>
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtValorContingenciaAtualizadoAditivo">Valor Contingência Atualizado</label>
                            <input type="text" id="txtValorContingenciaAtualizadoAditivo" class="form-control valor" placeholder="Insira o valor contingência atualizado">
                        </div>
                        <div class="form-group form-group-sm">
                            <label class="control-label" for="txtObservacaoAditivo">Observação</label>
                            <textarea class="form-control" id="txtObservacaoAditivo" rows="3"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="salvarAditivo()">Salvar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Tela de historico de aditivos do processo -->
    <div class="modal fade" id="formulario_historico_aditivo" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="modal-titulo-aditivo">Histórico de Aditivos do Processo</h4>
                </div>
                <div class="modal-body">   
                    <div class="form-group form-group-sm">
                        <label class="control-label" for="txtNumeroProcessoHistoricoAditivo">Número Processo</label>
                        <input type="text" id="txtNumeroProcessoHistoricoAditivo" class="form-control" placeholder="Insira o número de processo" disabled>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped" id="lista_historico">
                            <thead>
                                <tr>
                                    <th>Tribunal</th>
                                    <th>Valor Atualizado</th>
                                    <th>Escritório</th>
                                    <th>Fase</th>
                                    <th>Probabilidade</th>
                                    <th>Observação</th>
                                    <th>Valor Contingência Atualizado</th>
                                </tr>
                            </thead>
                            <tbody id="lista_historico_aditivo">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>

</div>

<script src="js/mask.js"></script> 
<script src="js/mask_money.js"></script>
<script src="js/config.js"></script>
<script src="js/formularios/processo.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>