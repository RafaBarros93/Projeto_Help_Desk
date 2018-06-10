const configDB = require('../../config/config_DB');

module.exports.get = async function(macroProcesso, empresa){
    
    let parametro = '';
    // prepara  o parametro
    if(macroProcesso === null)
        parametro += `WHERE MacroProcesso = '0'`;
    else 
        parametro += `WHERE MacroProcesso = '${macroProcesso}'`;
    if(empresa === null)
        parametro += `AND Empresa = '0'`;
    else 
        parametro += `AND Empresa = '${empresa}'`;
    //monta a consulta
    let script = `SELECT *
                  FROM VW_PORTAL_RFP (NOLOCK) ${parametro}`;              

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(rfp){
    
    let valores = "";

    for (key in rfp) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof rfp[key] !== 'object') {
            if (key !== 'CodigoLancamento'){
                if (valores === ""){
                    valores += key + " ='" + rfp[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + rfp[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE RFP_Portal SET ${valores}
                        WHERE CodigoLancamento = ${rfp.CodigoLancamento}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.getEmpresa = async function(){
    
    //monta a consulta
    let script = `SELECT DISTINCT Empresa
                  FROM VW_PORTAL_RFP
                  ORDER BY Empresa`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.getMacroProcesso = async function(empresa){
    
    //monta a consulta
    let script = `SELECT DISTINCT MacroProcesso
                  FROM VW_PORTAL_RFP
                  WHERE Empresa = '${empresa}'
                  ORDER BY MacroProcesso`;
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};