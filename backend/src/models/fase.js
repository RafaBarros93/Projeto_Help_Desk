const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoFase = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM Fase (NOLOCK)
                ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(fase){
    
    let script = `INSERT INTO Fase (Descricao) VALUES ('` + fase.Descricao + `') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(fase){
    
    let script = `UPDATE Fase 
                SET Descricao = '${fase.Descricao}'
                WHERE CodigoFase = ${fase.CodigoFase}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Fase WHERE CodigoFase = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};