const configDB = require('../../config/config_DB');

module.exports.get = async function(){
    
    //monta a consulta
    let script = `SELECT CodigoDashboard,Nome, URLPowerBI 
                  FROM Dashboards (NOLOCK) 
                  WHERE Ativo = 'S' 
                  ORDER BY Nome`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.getURLPowerBI = async function(id){
    
    //monta a consulta
    let script = `SELECT URLPowerBI 
                  FROM Dashboards (NOLOCK) 
                  WHERE CodigoDashboard = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};