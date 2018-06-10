const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoEsfera = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM Esfera (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(esfera){
    
    let script = `INSERT INTO Esfera (Descricao) VALUES ('${esfera.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(esfera){
    
    let script = `UPDATE Esfera 
                SET Descricao = '${esfera.Descricao}'
                WHERE CodigoEsfera = ${esfera.CodigoEsfera}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Esfera WHERE CodigoEsfera = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};