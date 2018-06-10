const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoFuncaoAlegada = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM FuncaoAlegada (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(funcaoAlegada){
    
    let script = `INSERT INTO FuncaoAlegada (Descricao) VALUES ('${funcaoAlegada.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(funcaoAlegada){
    
    let script = `UPDATE FuncaoAlegada 
                SET Descricao = '${funcaoAlegada.Descricao}'
                WHERE CodigoFuncaoAlegada = ${funcaoAlegada.CodigoFuncaoAlegada}`;


    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM FuncaoAlegada WHERE CodigoFuncaoAlegada = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};