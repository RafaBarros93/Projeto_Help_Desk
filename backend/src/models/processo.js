const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE Processo.CodigoUsuario = ';
    
    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;
    
    //monta a consulta
    let script = `SELECT Processo.CodigoProcesso
                        ,Status.Descricao AS Status
                        ,Processo.NumeroProcesso
                        ,Processo.Autor
                        ,ISNULL(CONVERT(VARCHAR(10),Processo.DataRecebimento,103),'') AS DataRecebimento
                        ,ISNULL(CONVERT(VARCHAR(10),Processo.DataDistribuicao,103),'') AS DataDistribuicao
                        ,ISNULL(CONVERT(VARCHAR(10),Processo.PeriodoReclamadoInicial,103),'') AS PeriodoReclamadoInicial
                        ,ISNULL(CONVERT(VARCHAR(10),Processo.PeriodoReclamadoFinal,103),'') AS PeriodoReclamadoFinal
                        ,Processo.ValorCausaInicial
                        ,Processo.ValorAtualizado
                        ,Processo.ValorContingencia
                        ,ISNULL(Processo.Resumo,'') AS Resumo
                        ,Processo.ValorContingenciaGrupoPatrimar
                        ,Processo.PercentualContingencia
                        ,Sociedade.Descricao AS Sociedade
                        ,ISNULL(AreaDireito.Descricao,'') AS AreaDireito
                        ,SubAreaDireito.Descricao AS SubAreaDireito
                        ,Esfera.Descricao AS Esfera
                        ,RegiaoRegional.Descricao AS RegiaoRegional
                        ,Comarca.Descricao AS Comarca
                        ,TipoAcao.Descricao AS TipoAcao
                        ,Grupo.Descricao AS Grupo
                        ,ISNULL(TipoContingencia.Descricao,'') AS TipoContingencia
                        ,FuncaoAlegada.Descricao AS FuncaoAlegada
                        ,ISNULL(ObraDepartamento.Descricao,'') AS ObraDepartamento
                        ,Empresa.Descricao AS Empresa
                        ,FormaParticipacaoEmpresa.Descricao AS FormaParticipacaoEmpresa
                        ,ISNULL(ProbabilidadePerda.Descricao,'') AS ProbabilidadePerda
                        ,Origem.Descricao AS Origem
                        ,Empreiteiro.Descricao AS Empreiteiro
                        ,ISNULL(Processo.CodigoSociedade,0) AS CodigoSociedade
                        ,ISNULL(Processo.CodigoAreaDireito,0) AS CodigoAreaDireito
                        ,ISNULL(Processo.CodigoSubAreaDireito,0) AS CodigoSubAreaDireito
                        ,ISNULL(Processo.CodigoEsfera,0) AS CodigoEsfera
                        ,ISNULL(Processo.CodigoRegiaoRegional,0) AS CodigoRegiaoRegional
                        ,ISNULL(Processo.CodigoComarca,0) AS CodigoComarca
                        ,ISNULL(Processo.CodigoTipoAcao,0) AS CodigoTipoAcao
                        ,ISNULL(Processo.CodigoGrupo,0) AS CodigoGrupo
                        ,ISNULL(Processo.CodigoTipoContingencia,0) AS CodigoTipoContingencia
                        ,ISNULL(Processo.CodigoFuncaoAlegada,0) AS CodigoFuncaoAlegada
                        ,ISNULL(Processo.CodigoObraDepartamento,0) AS CodigoObraDepartamento
                        ,ISNULL(Processo.CodigoEmpresaCitada,0) AS CodigoEmpresaCitada
                        ,ISNULL(Processo.CodigoFormaParticipacaoEmpresaCitada,0) AS CodigoFormaParticipacaoEmpresaCitada
                        ,ISNULL(Processo.CodigoProbabilidadePerda,0) AS CodigoProbabilidadePerda
                        ,ISNULL(Processo.CodigoOrigem,0) AS CodigoOrigem
                        ,ISNULL(Processo.CodigoEmpreiteiro,0) AS CodigoEmpreiteiro
                        ,ISNULL(Processo.CodigoStatus,0) AS CodigoStatus
                        ,Processo.Tribunal
                        ,ISNULL(Processo.CodigoTipoFuncionario,0) AS CodigoTipoFuncionario
                        ,ISNULL(Processo.Observacao,'') AS Observacao
                        ,ISNULL(Processo.CodigoFase,0) AS CodigoFase
                        ,ISNULL(Processo.CodigoEscritorio,0) AS CodigoEscritorio
                        ,Processo.ValorContingenciaAtualizado
                        ,ISNULL(Processo.Objeto,'') AS Objeto
                    FROM Processo (NOLOCK)
                    LEFT JOIN Sociedade (NOLOCK) ON Processo.CodigoSociedade = Sociedade.CodigoSociedade
                    LEFT JOIN AreaDireito (NOLOCK) ON Processo.CodigoAreaDireito = AreaDireito.CodigoAreaDireito
                    LEFT JOIN SubAreaDireito (NOLOCK) ON Processo.CodigoSubAreaDireito = SubAreaDireito.CodigoSubAreaDireito
                    LEFT JOIN Esfera (NOLOCK) ON Processo.CodigoEsfera = Esfera.CodigoEsfera
                    LEFT JOIN RegiaoRegional (NOLOCK) ON Processo.CodigoRegiaoRegional = RegiaoRegional.CodigoRegiaoRegional
                    LEFT JOIN Comarca (NOLOCK) ON Processo.CodigoComarca = Comarca.CodigoComarca
                    LEFT JOIN TipoAcao (NOLOCK) ON Processo.CodigoTipoAcao = TipoAcao.CodigoTipoAcao
                    LEFT JOIN Grupo (NOLOCK) ON Processo.CodigoGrupo = Grupo.CodigoGrupo 
                    LEFT JOIN TipoContingencia (NOLOCK) ON Processo.CodigoTipoContingencia = TipoContingencia.CodigoTipoContingencia
                    LEFT JOIN FuncaoAlegada (NOLOCK) ON Processo.CodigoFuncaoAlegada = FuncaoAlegada.CodigoFuncaoAlegada
                    LEFT JOIN ObraDepartamento (NOLOCK) ON Processo.CodigoObraDepartamento = ObraDepartamento.CodigoObraDepartamento
                    LEFT JOIN Empresa (NOLOCK) ON Processo.CodigoEmpresaCitada = Empresa.CodigoEmpresa
                    LEFT JOIN FormaParticipacaoEmpresa (NOLOCK) ON Processo.CodigoFormaParticipacaoEmpresaCitada = FormaParticipacaoEmpresa.CodigoFormaParticipacaoEmpresa
                    LEFT JOIN ProbabilidadePerda (NOLOCK) ON Processo.CodigoProbabilidadePerda = ProbabilidadePerda.CodigoProbabilidadePerda
                    LEFT JOIN Origem (NOLOCK) ON Processo.CodigoOrigem = Origem.CodigoOrigem
                    LEFT JOIN Empreiteiro (NOLOCK) ON Processo.CodigoEmpreiteiro = Empreiteiro.CodigoEmpreiteiro
                    LEFT JOIN Status (NOLOCK) ON Processo.CodigoStatus = Status.CodigoStatus
                    ${parametro}
                    ORDER BY Processo.CodigoProcesso`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(processo){
    
    let campos = "";
    let valores = "";

    for (key in processo) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof processo[key] !== 'object') {
            if (key !== 'CodigoProcesso'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + processo[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + processo[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO Processo (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(processo){
    
    let valores = "";

    for (key in processo) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof processo[key] !== 'object') {
            if (key !== 'CodigoProcesso'){
                if (valores === ""){
                    valores += key + " ='" + processo[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + processo[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE Processo SET ${valores}
                        WHERE CodigoProcesso = ${processo.CodigoProcesso}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Processo WHERE CodigoProcesso = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};