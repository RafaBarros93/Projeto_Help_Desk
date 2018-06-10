const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoGrupoUsuario = ';
    
    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT GrupoUsuario.CodigoGrupoUsuario
                        ,GrupoUsuario.Descricao
                        ,CASE WHEN GrupoUsuario.Ativo = 'S' THEN 'Sim'
                              ELSE 'Não'
                         END AS Ativo
                  FROM GrupoUsuario (NOLOCK) ${parametro}
                  ORDER BY GrupoUsuario.Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(grupoUsuario){
    
    let campos = "";
    let valores = "";

    for (key in grupoUsuario) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof grupoUsuario[key] !== 'object') {
            if (key !== 'CodigoGrupoUsuario'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + grupoUsuario[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + grupoUsuario[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO GrupoUsuario (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(grupoUsuario){
    
    let valores = "";

    for (key in grupoUsuario) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof grupoUsuario[key] !== 'object') {
            if (key !== 'CodigoGrupoUsuario'){
                if (valores === ""){
                    valores += key + " ='" + grupoUsuario[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + grupoUsuario[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE GrupoUsuario SET ${valores}
                        WHERE CodigoGrupoUsuario = ${grupoUsuario.CodigoGrupoUsuario}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM GrupoUsuario WHERE CodigoGrupoUsuario = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};