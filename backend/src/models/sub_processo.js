const configDB = require('../../config/config_DB');

module.exports.get = async function(id){
    
    let parametro = 'WHERE SubProcesso.CodigoSubProcesso = ';
    
    // prepara  o parametro
    if(id === null)
        parametro = '';
    else 
        parametro += id;
    
    //monta a consulta
    let script = `SELECT SubProcesso.CodigoSubProcesso
                        ,SubProcesso.CodigoProcesso
                        ,SubProcesso.NumeroProcesso
                        ,SubProcesso.ValorAtualizado
                        ,SubProcesso.ValorContingencia
                        ,SubProcesso.Pedidos
                        ,SubProcesso.Autor
                    FROM SubProcesso (NOLOCK)
                    LEFT JOIN Advogado (NOLOCK) ON SubProcesso.CodigoAdvogadoResponsavelPrincipal = Advogado.CodigoAdvogado
                    LEFT JOIN Fase (NOLOCK) ON SubProcesso.CodigoFase = Fase.CodigoFase
                    LEFT JOIN Objeto (NOLOCK) ON SubProcesso.CodigoObjeto = Objeto.CodigoObjeto
                    LEFT JOIN VaraLocal (NOLOCK) ON SubProcesso.CodigoVaraLocal = VaraLocal.CodigoVaraLocal
                    LEFT JOIN AreaDireito (NOLOCK) ON SubProcesso.CodigoAreaDireito = AreaDireito.CodigoAreaDireito
                    LEFT JOIN Escritorio (NOLOCK) ON SubProcesso.CodigoEscritorioResponsavel = Escritorio.CodigoEscritorio
                    ${parametro}
                    ORDER BY SubProcesso.CodigoSubProcesso`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(subProcesso){
    
    let campos = "";
    let valores = "";

    for (key in subProcesso) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof subProcesso[key] !== 'object') {
            if (key !== 'CodigoSubProcesso'){
                if (campos === ""){
                    campos += key;
                    valores += "'" + subProcesso[key] + "'";
                }
                else {
                    campos += "," + key;
                    valores += ",'" + subProcesso[key] + "'";
                }
            }
        }
    };

    let script = `INSERT INTO SubProcesso (${campos})
                        VALUES (${valores}) SELECT SCOPE_IDENTITY() AS id` ;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(subProcesso){
    
    let valores = "";

    for (key in subProcesso) { // obtém as chaves do objeto
        // se o valor for diferente de objeto (caso events)
        if (typeof subProcesso[key] !== 'object') {
            if (key !== 'CodigoSubProcesso'){
                if (valores === ""){
                    valores += key + " ='" + subProcesso[key] + "'";
                }
                else {
                    valores += "," + key + " ='" + subProcesso[key] + "'";
                }
            }
        }
    };

    let script = `UPDATE SubProcesso SET ${valores}
                        WHERE CodigoSubProcesso = ${subProcesso.CodigoSubProcesso}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(id){

    //monta a consulta
    let script = `DELETE FROM SubProcesso WHERE CodigoSubProcesso = ${id}`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};