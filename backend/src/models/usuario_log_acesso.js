const configDB = require('../../config/config_DB');

module.exports.post = async function(usuarioLogAcesso){
    
    let script = `INSERT INTO UsuarioLogAcesso (CodigoUsuario, Data) VALUES (${usuarioLogAcesso.CodigoUsuario}, GETDATE()) SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM UsuarioLogAcesso WHERE CodigoUsuario =  ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};