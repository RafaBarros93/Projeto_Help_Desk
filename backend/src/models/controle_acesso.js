const configDB = require('../../config/config_DB');

module.exports.get = async function(grupo, menu){
    
    let paramMenu = '';

    if ((menu !== null) && (menu !== '') && (menu > 0))
        paramMenu = ' AND (Menu.CodigoMenu = ' + menu + ')';
    else if (menu === '0')
        paramMenu = ' AND (Menu.CodigoMenu IS NULL)'
    else
        paramMenu = '';

    //monta a consulta
    let script = `SELECT Pagina.Nome
                    ,Pagina.Arquivo
                    ,ControleAcesso.CodigoPagina
                    ,Menu.Descricao AS Menu
                FROM ControleAcesso (NOLOCK)
                INNER JOIN Pagina (NOLOCK) ON ControleAcesso.CodigoPagina = Pagina.CodigoPagina
                LEFT JOIN Menu (NOLOCK) ON Pagina.CodigoMenu = Menu.CodigoMenu
                WHERE (Pagina.Ativo = 'S')
                    AND (ControleAcesso.CodigoGrupoUsuario = ${grupo} )
                ${paramMenu}
                ORDER BY Menu.Descricao, Pagina.Nome `;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(controleAcesso){
    
    let campos = "";
    let valores = "";

    for (key in controleAcesso) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof controleAcesso[key] !== 'object') {
            if (campos === ""){
                campos += key;
                valores += "'" + controleAcesso[key] + "'";
            }
            else {
                campos += "," + key;
                valores += ",'" + controleAcesso[key] + "'";
            }
        }
    };

    let script = `INSERT INTO ControleAcesso (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM ControleAcesso WHERE CodigoGrupoUsuario = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.montaMenu = async function(grupo){
    
    if((grupo == null) || (grupo == ''))
        grupo = 0;
    
    let script = `SELECT ISNULL(Menu.CodigoMenu,0) AS CodigoMenu
                        ,CASE WHEN ISNULL(Menu.CodigoMenu,0) <= 0 THEN Pagina.Nome 
                            ELSE Menu.Descricao
                        END AS Menu
                        ,CASE WHEN ISNULL(Menu.CodigoMenu,0) <= 0 THEN Pagina.Arquivo
                            ELSE ''
                        END AS Arquivo
                FROM ControleAcesso (NOLOCK)
                INNER JOIN Pagina (NOLOCK) ON ControleAcesso.CodigoPagina = Pagina.CodigoPagina
                LEFT JOIN Menu (NOLOCK) ON Pagina.CodigoMenu = Menu.CodigoMenu
                WHERE (ControleAcesso.CodigoGrupoUsuario = ${grupo})
                GROUP BY ISNULL(Menu.CodigoMenu,0)
                    ,CASE WHEN ISNULL(Menu.CodigoMenu,0) <= 0 THEN Pagina.Nome 
                            ELSE Menu.Descricao
                    END
                    ,CASE WHEN ISNULL(Menu.CodigoMenu,0) <= 0 THEN Pagina.Arquivo
                            ELSE ''
                    END 
                ORDER BY Menu`;
    
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
}

module.exports.montaPaginaMenu = async function(grupo, menu){
    
    if((grupo == null) || (grupo == ''))
        grupo = 0;
    if((menu == null) || (menu == ''))
        menu = 0;
    
    let script = `SELECT Pagina.Nome
                        ,Pagina.Arquivo
                FROM ControleAcesso (NOLOCK)
                INNER JOIN Pagina (NOLOCK) ON ControleAcesso.CodigoPagina = Pagina.CodigoPagina
                WHERE (ControleAcesso.CodigoGrupoUsuario = ${grupo})
                AND (Pagina.CodigoMenu = ${menu})
                ORDER BY Pagina.Nome`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
}