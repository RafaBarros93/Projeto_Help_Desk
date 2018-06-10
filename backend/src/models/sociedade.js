const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoSociedade = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM Sociedade (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(sociedade){
    
    let script = `INSERT INTO Sociedade (Descricao) VALUES ('${sociedade.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(sociedade){
    
    let script = `UPDATE Sociedade 
                SET Descricao = '${sociedade.Descricao}'
                WHERE CodigoSociedade = ${sociedade.CodigoSociedade}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Sociedade WHERE CodigoSociedade = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};