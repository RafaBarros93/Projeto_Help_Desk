const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoPlanoAcao = ';
    
    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT *
                  FROM VW_PORTAL_PLANO_ACAO (NOLOCK) ${parametro}`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(planoAcao){
    
    let campos = "";
    let valores = "";

    for (key in planoAcao) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof planoAcao[key] !== 'object') {
            if (key !== 'CodigoPlanoAcao'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + planoAcao[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + planoAcao[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO PlanoAcao (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(planoAcao){
    
    let valores = "";

    for (key in planoAcao) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof planoAcao[key] !== 'object') {
            if (key !== 'CodigoPlanoAcao'){
                if (valores === ""){
                    valores += key + " ='" + planoAcao[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + planoAcao[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE PlanoAcao SET ${valores}
                        WHERE CodigoPlanoAcao = ${planoAcao.CodigoPlanoAcao}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM PlanoAcao WHERE CodigoPlanoAcao = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};