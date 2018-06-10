const configDB = require('../../config/config_DB');

module.exports.get = async function(){
    
    //monta a consulta
    let script = `SELECT Acompanhamento.CodigoAcompanhamento
                        ,Acompanhamento.CodigoProcesso
                        ,EstruturaProcesso.DONOPROCESSO AS DonoProcesso
                        ,EstruturaProcesso.ImpactaSapBexs
                        ,EstruturaProcesso.SISTEMA AS Sistema
                        ,EstruturaProcesso.Analista
                        ,EstruturaProcesso.CODIGOPROCESSO + ' - ' + EstruturaProcesso.NOMEPROCESSO AS Processo
                    FROM Acompanhamento (NOLOCK)
                    INNER JOIN EstruturaProcesso (NOLOCK) ON Acompanhamento.CodigoProcesso = EstruturaProcesso.CODIGO`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(acompanhamento){
    
    let campos = "";
    let valores = "";

    for (key in acompanhamento) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof acompanhamento[key] !== 'object') {
            if (key !== 'CodigoAcompanhamento'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + acompanhamento[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + acompanhamento[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO Acompanhamento (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(acompanhamento){
    
    let valores = "";

    for (key in acompanhamento) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof acompanhamento[key] !== 'object') {
            if (key !== 'CodigoAcompanhamento'){
                if (valores === ""){
                    valores += key + " ='" + acompanhamento[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + acompanhamento[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE Acompanhamento SET ${valores}
                        WHERE CodigoAcompanhamento = ${acompanhamento.CodigoAcompanhamento}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM Acompanhamento WHERE CodigoAcompanhamento = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};