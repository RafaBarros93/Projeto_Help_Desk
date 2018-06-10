const configDB = require('../../config/config_DB');

module.exports.get = async function(codigo){
    
    //monta a consulta
    let script = `SELECT AcompanhamentoItem.CodigoAcompanhamento
                        ,AcompanhamentoItem.Item
                        ,REPLACE(CONVERT(VARCHAR(10),AcompanhamentoItem.DataEntregaPrevista,102),'.','-') AS DataEntregaPrevista
                        ,REPLACE(CONVERT(VARCHAR(10),AcompanhamentoItem.DataEntregaReal,102),'.','-') AS DataEntregaReal
                        ,AcompanhamentoItem.Status
                        ,AcompanhamentoItem.Responsavel
                        ,CASE WHEN AcompanhamentoItem.Status = 'E' THEN 'Em Andamento'
                            WHEN AcompanhamentoItem.Status = 'C' THEN 'Concluído'
                            WHEN AcompanhamentoItem.Status = 'N' THEN 'Não Iniciado'
                        END AS StatusDescricao
                        ,CASE WHEN AcompanhamentoItem.Item = '1' THEN 'Benchmarking / Macro Proposta de Solução'
                            WHEN AcompanhamentoItem.Item = '2' THEN 'Mapa de Processos(Bizagi)'
                            WHEN AcompanhamentoItem.Item = '3' THEN 'PDD'
                            WHEN AcompanhamentoItem.Item = '4' THEN 'Validação dos Itens da RFP'
                            WHEN AcompanhamentoItem.Item = '5' THEN 'Plano Ação'
                            WHEN AcompanhamentoItem.Item = '6' THEN 'Planilha de Problemas'
                            WHEN AcompanhamentoItem.Item = '7' THEN 'Diagrama de Escopo'
                            WHEN AcompanhamentoItem.Item = '8' THEN 'Indicadores'
                        END AS ItemDescricao
                    FROM AcompanhamentoItem (NOLOCK)
                    WHERE (AcompanhamentoItem.CodigoAcompanhamento = ${codigo})`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(acompanhamento){
    
    let campos = "";
    let valores = "";

    for (key in acompanhamento) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof acompanhamento[key] !== 'object') {
            if ((key !== 'StatusDescricao') && (key !== 'ItemDescricao'))
            {
                if (campos === ""){
                    campos += key;
                    valores += "'" + acompanhamento[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + acompanhamento[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO AcompanhamentoItem (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;
                        
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM AcompanhamentoItem WHERE CodigoAcompanhamento = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};