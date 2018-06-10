const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoVaraLocal = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM VaraLocal (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(varaLocal){
    
    let script = `INSERT INTO VaraLocal (Descricao) VALUES ('${varaLocal.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(varaLocal){
    
    let script = `UPDATE VaraLocal 
                SET Descricao = '${varaLocal.Descricao}'
                WHERE CodigoVaraLocal = ${varaLocal.CodigoVaraLocal}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM VaraLocal WHERE CodigoVaraLocal =  ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};