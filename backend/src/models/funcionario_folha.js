const configDB = require('../../config/config_DB');

module.exports.get = async function(){
    
    //monta a consulta
    let script = `SELECT *
                FROM VW_PORTAL_FUNCIONARIO_FOLHA
                ORDER BY COLIGADA, Nome`;
                  
    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.post = async function(funcionario){
    
    let script = `INSERT INTO OrcPessoalFunc 
                (Nome, Coligada, Diretoria, CCusto, Cargo, Status, Salario, DataAdmissao, CPF) 
                VALUES 
                ('`+ funcionario.Nome + `','` + funcionario.Coligada + `','` + funcionario.Diretoria + `','` + 
                    funcionario.CentroCusto + `','` + funcionario.Cargo + `','` + funcionario.Status + `',` +
                    funcionario.Salario + `,'` + funcionario.DataAdmissao + `',(SELECT IDENT_CURRENT('OrcPessoalFunc'))) `;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.put = async function(funcionario){
    
    //prepara os parametros
    let parametros = "";
    parametros += "(";
    parametros += "'" + funcionario.Nome + "',";
    parametros += "'" + funcionario.Coligada + "',";
    parametros += "'" + funcionario.Diretoria + "',";
    parametros += "'" + funcionario.CentroCusto + "',";
    parametros += "'" + funcionario.Cargo + "',";
    parametros += "'" + funcionario.Status + "',";
    parametros += "'" + funcionario.CPF + "',";
    // parametros += "'" + funcionario.Matricula + "',";
    parametros += "" + funcionario.Salario + ",";
    parametros += "'" + funcionario.DataAdmissao + "',";
    if(funcionario.DataDemissao != ""){
        parametros += "'" + funcionario.DataDemissao + "',";
    }
    else {
        parametros += "NULL,";
    }
    if(funcionario.DataSalario != ""){
        parametros += "'" + funcionario.DataSalario + "',";
    }
    else {
        parametros += "NULL,";
    }
    if(funcionario.DataAumentoSalario2 != ""){
        parametros += "'" + funcionario.DataAumentoSalario2 + "',";
    }
    else {
        parametros += "NULL,";
    }
    parametros += "" + funcionario.AumentoSalario2 + ")";

    //monta o script
    let script = "INSERT INTO OrcPessoalFunc "+
                 "    (Nome, Coligada, Diretoria, CCusto, Cargo, Status, CPF, Salario, " +
                 "     DataAdmissao, DataDemissao, DataSalario, DataAumentoSalario2, AumentoSalario2) "+
                 "    VALUES " + parametros;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};

module.exports.delete = async function(funcionario){

    //monta a consulta
    let script = `DELETE OrcPessoalFunc 
                  WHERE CPF = '${funcionario.CPF}'`;

    let resultado = await configDB.executaScriptSQL(script);
    return resultado;
};