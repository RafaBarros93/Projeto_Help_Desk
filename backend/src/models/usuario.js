const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE Usuarios.CodigoUsuario = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;   
    
    //monta a consulta
    let script = `SELECT Usuarios.CodigoUsuario
                        ,Usuarios.Nome 
                        ,Usuarios.Email  
                        ,Usuarios.CodigoGrupoUsuario
                        ,Usuarios.VisualizarTodosProcessos
                        ,GrupoUsuario.Descricao AS GrupoUsuario
                        ,CASE WHEN Usuarios.Ativo = 'S' THEN 'Sim'
                                ELSE 'Não'
                            END AS Ativo
                    FROM Usuarios (NOLOCK)
                    LEFT JOIN GrupoUsuario (NOLOCK) ON Usuarios.CodigoGrupoUsuario = GrupoUsuario.CodigoGrupoUsuario 
                    ${parametro}
                    ORDER BY Usuarios.Nome`; 
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(usuario){
    
    let campos = "";
    let valores = "";

    for (key in usuario) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof usuario[key] !== 'object') {
            if (key !== 'CodigoUsuario'){
                if (campos === ""){
                    campos += key;
                    if (key === 'Senha')
                        valores += "dbo.fn_Criptografa('" + usuario[key] + "')";
                    else 
                        valores += "'" + usuario[key] + "'";
                }
                else {
                    campos += "," + key;
                    if (key === 'Senha')
                        valores += ", dbo.fn_Criptografa('" + usuario[key] + "')";
                    else 
                        valores += ",'" + usuario[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO Usuarios (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(usuario){
    
    let valores = "";

    for (key in usuario) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof usuario[key] !== 'object') {
            if (key !== 'CodigoUsuario'){
                if (valores === ""){
                    if (key === 'Senha')
                        valores += key + " = dbo.fn_Criptografa('" + usuario[key] + "')";
                    else
                        valores += key + " ='" + usuario[key] + "'";
                }
                else {
                    if (key === 'Senha')
                        valores += ", " + key + " = dbo.fn_Criptografa('" + usuario[key] + "')";
                    else
                        valores += ", " + key + " ='" + usuario[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE Usuarios SET ${valores}
                  WHERE CodigoUsuario = ${usuario.CodigoUsuario}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Usuarios WHERE CodigoUsuario = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.validaLogin = async function(login){

    var script = `SELECT CodigoUsuario 
                        ,Nome 
                        ,Email
                        ,CodigoGrupoUsuario
                        ,CPF
                        ,VisualizarTodosProcessos 
                  FROM Usuarios (NOLOCK) 
                  WHERE (Ativo = 'S') 
                  AND (Email = '${login.email}' )
                  AND (dbo.fn_Descriptografa(Senha) = '${login.senha}')
                  UNION
                  SELECT CodigoUsuario 
                        ,Nome 
                        ,Email
                        ,CodigoGrupoUsuario
                        ,CPF
                        ,VisualizarTodosProcessos 
                  FROM Usuarios (NOLOCK) 
                  WHERE (Ativo = 'S') 
                  AND (CPF = '${login.email}' )
                  AND (dbo.fn_Descriptografa(Senha) = '${login.senha}') 
                 `;
                    
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
}