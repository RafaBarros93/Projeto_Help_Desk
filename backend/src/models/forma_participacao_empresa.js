const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoFormaParticipacaoEmpresa = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM FormaParticipacaoEmpresa (NOLOCK) ${parametro}
                ORDER BY Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(formaParticipacaoEmpresa){
    
    let script = `INSERT INTO FormaParticipacaoEmpresa (Descricao) VALUES ('${formaParticipacaoEmpresa.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(formaParticipacaoEmpresa){
    
    let script = `UPDATE FormaParticipacaoEmpresa 
                SET Descricao = '${formaParticipacaoEmpresa.Descricao}'
                WHERE CodigoFormaParticipacaoEmpresa = ${formaParticipacaoEmpresa.CodigoFormaParticipacaoEmpresa}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM FormaParticipacaoEmpresa WHERE CodigoFormaParticipacaoEmpresa = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};