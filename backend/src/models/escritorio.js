const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoEscritorio = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM Escritorio (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(escritorio){
    
    let script = `INSERT INTO Escritorio (Descricao) VALUES ('${escritorio.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(escritorio){
    
    let script = `UPDATE Escritorio 
                  SET Descricao = '${escritorio.Descricao}'
                  WHERE CodigoEscritorio = ${escritorio.CodigoEscritorio}`;


    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Escritorio WHERE CodigoEscritorio = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};