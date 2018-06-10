const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoMenu = ';
    
    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;
    
    //monta a consulta
    let script = `SELECT Menu.CodigoMenu
                        ,Menu.Descricao
                        ,CASE WHEN Menu.Ativo = 'S' THEN 'Sim'
                              ELSE 'Não'
                         END AS Ativo
                  FROM Menu (NOLOCK) ${parametro}
                  ORDER BY Menu.Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(menu){
    
    let campos = "";
    let valores = "";

    for (key in menu) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof menu[key] !== 'object') {
            if (key !== 'CodigoMenu'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + menu[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + menu[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO Menu (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(menu){
    
    let valores = "";

    for (key in menu) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof menu[key] !== 'object') {
            if (key !== 'CodigoMenu'){
                if (valores === ""){
                    valores += key + " ='" + menu[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + menu[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE Menu SET ${valores}
                        WHERE CodigoMenu = ${menu.CodigoMenu}` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Menu WHERE CodigoMenu = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};