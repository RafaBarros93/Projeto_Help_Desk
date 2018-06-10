const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoEmpreiteiro = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM Empreiteiro (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(empreiteiro){
    
    let script = `INSERT INTO Empreiteiro (Descricao) VALUES ('${empreiteiro.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(empreiteiro){
    
    let script = `UPDATE Empreiteiro 
                SET Descricao = '${empreiteiro.Descricao}'
                WHERE CodigoEmpreiteiro = ${empreiteiro.CodigoEmpreiteiro}`;


    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Empreiteiro WHERE CodigoEmpreiteiro = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};