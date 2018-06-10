const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoGrupo = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM Grupo (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(grupo){
    
    let script = `INSERT INTO Grupo (Descricao) VALUES ('${grupo.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(grupo){
    
    let script = `UPDATE Grupo 
                SET Descricao = '${grupo.Descricao}'
                WHERE CodigoGrupo = ${grupo.CodigoGrupo}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Grupo WHERE CodigoGrupo = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};