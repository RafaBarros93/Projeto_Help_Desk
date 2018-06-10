const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoOrigem = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM Origem (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(origem){
    
    let script = `INSERT INTO Origem (Descricao) VALUES ('${origem.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(origem){
    
    let script = `UPDATE Origem 
                SET Descricao = '${origem.Descricao}'
                WHERE CodigoOrigem = ${origem.CodigoOrigem}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Origem WHERE CodigoOrigem = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};