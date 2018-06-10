const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoSubAreaDireito = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM SubAreaDireito (NOLOCK)
                ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(subAreaDireito){
    
    let script = `INSERT INTO SubAreaDireito (Descricao) VALUES ('${subAreaDireito.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(subAreaDireito){
    
    let script = `UPDATE SubAreaDireito 
                SET Descricao = '${subAreaDireito.Descricao}'
                WHERE CodigoSubAreaDireito = ${subAreaDireito.CodigoSubAreaDireito}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM SubAreaDireito WHERE CodigoSubAreaDireito = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};