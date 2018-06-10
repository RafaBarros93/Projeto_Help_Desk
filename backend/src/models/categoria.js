const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE Codigo = ';
    
    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT *
                  FROM Categoria (NOLOCK) ${parametro}`;


                
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};