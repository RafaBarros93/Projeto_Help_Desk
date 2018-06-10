const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoAreaDireito = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                  FROM AreaDireito (NOLOCK) ${parametro}
                  ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(areaDireito){
    
    let script = `INSERT INTO AreaDireito (Descricao) VALUES ('${areaDireito.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(areaDireito){
    
    let script = `UPDATE AreaDireito 
                SET Descricao = '${areaDireito.Descricao}'
                WHERE CodigoAreaDireito = ${areaDireito.CodigoAreaDireito}`;


    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM AreaDireito WHERE CodigoAreaDireito = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};