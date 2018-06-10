const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE Comarca.CodigoComarca = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT Comarca.CodigoComarca
                        ,Comarca.Descricao
                        ,Comarca.CodigoEstado
                        ,Estado.Descricao AS Estado
                  FROM Comarca (NOLOCK)
                  LEFT JOIN Estado (NOLOCK) ON Comarca.CodigoEstado = Estado.CodigoEstado  ` + parametro +
                  ` ORDER BY Comarca.Descricao`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(comarca){
    
    var campos = "";
    var valores = "";

    for (key in comarca) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof comarca[key] !== 'object') {
            if (campos === ""){
                campos += key;
                valores += "'" + comarca[key] + "'";
            }
            else {
                campos += "," + key;
                valores += ",'" + comarca[key] + "'";
            }
        }
    };

    let script = `INSERT INTO Comarca (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(comarca){
    
    let valores = "";

    for (key in comarca) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof comarca[key] !== 'object') {
            if (key !== 'CodigoComarca'){
                if (valores === ""){
                    valores += key + " ='" + comarca[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + comarca[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE Comarca SET ${valores}
                        WHERE CodigoComarca = ${comarca.CodigoComarca}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Comarca WHERE CodigoComarca = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};