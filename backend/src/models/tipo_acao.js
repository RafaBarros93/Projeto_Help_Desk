const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoTipoAcao = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM TipoAcao (NOLOCK)
                ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(tipoAcao){
    
    let script = `INSERT INTO TipoAcao (Descricao) VALUES ('${tipoAcao.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(tipoAcao){
    
    let script = `UPDATE TipoAcao
                SET Descricao = '${tipoAcao.Descricao}'
                WHERE CodigoTipoAcao = ${tipoAcao.CodigoTipoAcao}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM TipoAcao WHERE CodigoTipoAcao = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};