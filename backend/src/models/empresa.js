const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoEmpresa = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM Empresa (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(empresa){
    
    let script = `INSERT INTO Empresa (Descricao) VALUES ('${empresa.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(empresa){
    
    let script = `UPDATE Empresa 
                SET Descricao = '${empresa.Descricao}'
                WHERE CodigoEmpresa = ${empresa.CodigoEmpresa}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Empresa WHERE CodigoEmpresa = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};