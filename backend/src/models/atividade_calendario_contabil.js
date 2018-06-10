const configDB = require('../../config/config_DB');

module.exports.get = async function(){

    //monta a consulta
    let script = `SELECT *
                  FROM VW_PORTAL_ATIVIDADE_CALENDARIO_CONTABIL (NOLOCK) `;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(atividadeCalendarioContabil){
    
    let campos = "";
    let valores = "";

    for (key in atividadeCalendarioContabil) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof atividadeCalendarioContabil[key] !== 'object') {
            if (key !== 'CodigoAtividade'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + atividadeCalendarioContabil[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + atividadeCalendarioContabil[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO AtividadeCalendarioContabil (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(atividadeCalendarioContabil){
    
    let valores = "";

    for (key in atividadeCalendarioContabil) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof atividadeCalendarioContabil[key] !== 'object') {
            if (key !== 'CodigoAtividade'){
                if (valores === ""){
                    valores += key + " ='" + atividadeCalendarioContabil[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + atividadeCalendarioContabil[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE AtividadeCalendarioContabil SET ${valores}
                        WHERE CodigoAtividade = ${atividadeCalendarioContabil.CodigoAtividade}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM AtividadeCalendarioContabil WHERE CodigoAtividade = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.getCalendario = async function(){

    //monta a consulta
    let script = `SELECT CodigoAtividade
                        ,Descricao
                        ,Tipo
                        ,REPLACE(CONVERT(VARCHAR(10),Data,102),'.','-') AS Data
                    FROM AtividadeCalendarioContabil (NOLOCK)
                    WHERE ((dbo.fn_RemoveHora(Data) >= dbo.fn_RemoveHora(GETDATE()))
                    AND (dbo.fn_RemoveHora(Data) <= dbo.fn_RemoveHora(DATEADD(DAY,6,GETDATE()))))
                    ORDER BY Data  `;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};