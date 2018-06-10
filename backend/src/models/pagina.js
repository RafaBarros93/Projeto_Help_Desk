const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoPagina = ';
    
    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;
    
    //monta a consulta
    let script = `SELECT Pagina.CodigoPagina
                        ,Pagina.Nome
                        ,Pagina.Arquivo
                        ,CASE WHEN Pagina.Ativo = 'S' THEN 'Sim'
                              ELSE 'Não'
                         END AS Ativo
                        ,Menu.Descricao AS Menu
                        ,ISNULL(Pagina.CodigoMenu,0) AS CodigoMenu
                        ,ISNULL(Pagina.CodigoDashboard,0) AS CodigoDashboard
                  FROM Pagina (NOLOCK) 
                  LEFT JOIN Menu (NOLOCK) ON Pagina.CodigoMenu = Menu.CodigoMenu ${parametro}
                  ORDER BY Pagina.Nome`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(pagina){
    
    let campos = "";
    let valores = "";

    for (key in pagina) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof pagina[key] !== 'object') {
            if (key !== 'CodigoPagina'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + pagina[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + pagina[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO Pagina (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(pagina){
    
    let valores = "";

    for (key in pagina) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof pagina[key] !== 'object') {
            if (key !== 'CodigoPagina'){
                if (valores === ""){
                    valores += key + " ='" + pagina[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + pagina[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE Pagina SET ${valores}
                        WHERE CodigoPagina = ${pagina.CodigoPagina}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Pagina WHERE CodigoPagina = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};