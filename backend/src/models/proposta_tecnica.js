const configDB = require('../../config/config_DB');

module.exports.get = async function(empreendimento, fornecedor, material, valor){
    
    let parametro = '';
    if((empreendimento != null) && (empreendimento != '0'))
        parametro += ` AND CodigoObraDepartamento = ${empreendimento}`;
    if((fornecedor != null) && (fornecedor != '0'))
        parametro += ` AND CodigoFornecedor = '${fornecedor}'`;
    if((material != null) && (material != '0'))
        parametro += ` AND CodigoMaterial = '${material}'`;
    if(valor != null){
        switch(valor){
            case '0':
                parametro += '';
                break;
            case '1':
                parametro += ' AND ((ValorTotal >= 0) AND (ValorTotal < 500000))';
                break;
            case '2':
                parametro += ' AND ((ValorTotal >= 500000) AND (ValorTotal < 1500000))';
                break;
            case '3':
                parametro += ' AND ((ValorTotal >= 1500000) AND (ValorTotal < 2000000))';
                break;
            case '4':
                parametro += ' AND (ValorTotal >= 2000000)';
                break;
            default:
                parametro += '';
        }
    }

    //monta a consulta
    let script = `SELECT *
                  FROM VW_PORTAL_PROPOSTA_TECNICA (NOLOCK) 
                  WHERE (Validada = 'N')
                  ${parametro}
                  ORDER BY Data DESC`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(proposta){
    
    let campos = "";
    let valores = "";

    for (key in proposta) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof proposta[key] !== 'object') {
            if (key !== 'CodigoProposta'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + proposta[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + proposta[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO PropostaTecnica (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(proposta){
    
    let valores = "";

    for (key in proposta) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof proposta[key] !== 'object') {
            if (key !== 'CodigoProposta'){
                if (valores === ""){
                    valores += key + " ='" + proposta[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + proposta[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE PropostaTecnica SET ${valores}
                        WHERE CodigoProposta = ${proposta.CodigoProposta}` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM PropostaTecnica WHERE CodigoProposta = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.escolherProposta = async function(proposta){

    //monta a consulta
    let script = `UPDATE PropostaTecnica 
                    SET Escolhida = '${proposta.Escolhida}',
                        Validada = '${proposta.Validada}'
                  WHERE CodigoProposta = ${proposta.CodigoProposta}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};