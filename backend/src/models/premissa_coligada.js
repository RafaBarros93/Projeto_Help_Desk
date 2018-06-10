const configDB = require('../../config/config_DB');

module.exports.get = async function(coligada){
        
    //monta a consulta
    let script = `SELECT OrcPessoalEmpresa.Valor 
                    ,OrcPessoalPremissas.Nome 
                    ,OrcPessoalEmpresa.CodigoPremissa 
                FROM OrcPessoalEmpresa (NOLOCK) 
                LEFT JOIN OrcPessoalPremissas ON OrcPessoalEmpresa.CodigoPremissa = OrcPessoalPremissas.CodigoPremissas 
                WHERE CodColigada =  ${coligada} 
                ORDER BY OrcPessoalEmpresa.CodigoPremissa `;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(premissa){
    
    let parametros = "(";
    parametros += premissa.Coligada + ",";
    parametros += premissa.CodigoPremissa + ",";
    parametros += premissa.Valor + ")";
    let script = `INSERT INTO OrcPessoalEmpresa 
                   (CodColigada, CodigoPremissa, Valor)
                   VALUES ${parametros}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(premissa){

    //monta a consulta
    let script = `DELETE OrcPessoalEmpresa 
                  WHERE CodColigada = ${premissa.Coligada}
                    AND CodigoPremissa = ${premissa.CodigoPremissa}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};