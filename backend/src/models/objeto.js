const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoObjeto = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM Objeto (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(objeto){
    
    let script = `INSERT INTO Objeto (Descricao) VALUES ('${objeto.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(objeto){
    
    let script = `UPDATE Objeto 
                SET Descricao = '${objeto.Descricao}'
                WHERE CodigoObjeto = ${objeto.CodigoObjeto}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Objeto WHERE CodigoObjeto = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};