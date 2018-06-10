const configDB = require('../../config/config_DB');

module.exports.getCadastro = async function(cpf){

    //monta a consulta
    let script;

    script = `SELECT *
              FROM VW_PORTAL_ESOCIAL_Cadastro
              WHERE CPF = '${cpf}'`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.getDependente = async function(chapa, coligada){

    let script;

    script = `SELECT *
              FROM VW_PORTAL_ESOCIAL_DEPENDENTE
              WHERE CHAPA = '${chapa}'
                AND CodigoColigada = ${coligada}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.deleteDependente = async function(chapa, coligada){

    let script;

    script = `DELETE FROM ESocialDependente
              WHERE CHAPA = '${chapa}'
                AND CodigoColigada = ${coligada}`; 

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.postDependente = async function(dependente){

    let campos = "";
    let valores = "";

    for (key in dependente) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof dependente[key] !== 'object') {
            if (key !== 'CodigoDependente'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + dependente[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + dependente[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO ESocialDependente (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.putCadastro = async function(cadastro){

    let valores = "";

    for (key in cadastro) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof cadastro[key] !== 'object') {
            if (key !== 'CodigoCadastro'){
                if (valores === ""){
                    valores += key + " ='" + cadastro[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + cadastro[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE ESocialDadosCadastro SET ${valores}
                        WHERE CodigoCadastro = ${cadastro.CodigoCadastro}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};