const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE CodigoProbabilidadePerda = ';

    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;

    //monta a consulta
    let script = `SELECT * 
                FROM ProbabilidadePerda (NOLOCK) ${parametro}
                ORDER BY Descricao`;  
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(probabilidadePerda){
    
    let script = `INSERT INTO ProbabilidadePerda (Descricao) VALUES ('${probabilidadePerda.Descricao}') SELECT SCOPE_IDENTITY() AS id`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(probabilidadePerda){
    
    let script = `UPDATE ProbabilidadePerda 
                SET Descricao = '${probabilidadePerda.Descricao}'
                WHERE CodigoProbabilidadePerda = ${probabilidadePerda.CodigoProbabilidadePerda}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM ProbabilidadePerda WHERE CodigoProbabilidadePerda = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};