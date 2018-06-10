const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoTipoContingencia = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM TipoContingencia (NOLOCK)
                ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(tipoContingencia){
    
    let script = `INSERT INTO TipoContingencia (Descricao) VALUES ('${tipoContingencia.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(tipoContingencia){
    
    let script = `UPDATE TipoContingencia 
                SET Descricao = '${tipoContingencia.Descricao}'
                WHERE CodigoTipoContingencia = ${tipoContingencia.CodigoTipoContingencia}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM TipoContingencia WHERE CodigoTipoContingencia =  ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};