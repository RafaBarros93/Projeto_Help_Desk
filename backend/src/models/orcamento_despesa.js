const configDB = require('../../config/config_DB');

module.exports.get = async function(coligada, centroCusto, grupo, contaOrcamento, contaContabil, ano){
    
    let script = `SELECT *
                  FROM VW_PORTAL_ORCAMENTO_DESPESA
                  WHERE (CodigoColigada = ${coligada})
                    AND (CentroCusto = '${centroCusto}')
                    AND (Grupo = '${grupo}')
                    AND (ContaOrcamento = '${contaOrcamento}')
                    AND (ContaContabil = '${contaContabil}')
                    AND (Ano = ${ano})
                  ORDER BY CONVERT(INT,Mes), Ano `;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(orcamento){
    
    let campos = "";
    let valores = "";

    for (key in orcamento) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof orcamento[key] !== 'object') {
            if (key !== 'CodigoOrcamentoDespesa'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + orcamento[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + orcamento[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO OrcamentoDespesa (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(orcamento){
    
    let valores = "";

    for (key in orcamento) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof orcamento[key] !== 'object') {
            if (key !== 'CodigoOrcamentoDespesa'){
                if (valores === ""){
                     valores += key + " ='" + orcamento[key] + "'";
                }
                else {
                    valores += ", " + key + " ='" + orcamento[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE OrcamentoDespesa SET ${valores}
                        WHERE CodigoOrcamentoDespesa = ${orcamento.CodigoOrcamentoDespesa}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM OrcamentoDespesa WHERE CodigoOrcamentoDespesa = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.valorRazao = async function(coligada, centroCusto, grupo, contaOrcamento, contaContabil){

    //monta a consulta
    let script = `SELECT ISNULL(Valor,0) AS Valor
                FROM VW_ORCDESPESAS_RAZAO
                WHERE CodColigada = ${coligada}
                AND CodCCUSTO = '${centroCusto}'
                AND GrupoContabil = '${grupo}'
                AND ContaOrcamento = '${contaOrcamento}'
                AND CodConta = '${contaContabil}'`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};