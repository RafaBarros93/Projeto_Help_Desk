const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoRegiaoRegional = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM RegiaoRegional (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(regiaoRegional){
    
    let script = `INSERT INTO RegiaoRegional (Descricao) VALUES ('${regiaoRegional.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(regiaoRegional){
    
    let script = `UPDATE RegiaoRegional 
                SET Descricao = '${regiaoRegional.Descricao}'
                WHERE CodigoRegiaoRegional = ${regiaoRegional.CodigoRegiaoRegional}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM RegiaoRegional WHERE CodigoRegiaoRegional =  ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};