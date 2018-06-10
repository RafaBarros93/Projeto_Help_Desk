const configDB = require('../../config/config_DB');

module.exports.get = async function(){
    
    // let parametro = 'WHERE CodigoEsfera = ';

    // prepara  o parametro
    // if(id === null)
    //     parametro = '';
    // else 
    //     parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM Fornecedor (NOLOCK) 
                ORDER BY Nome`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};