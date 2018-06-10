<?php
    require_once("layout/cabecalho_layout.php");
?>

<div class="container">
    <form onsubmit="atualizarDados()" id="formulario" method="post">
        <div class="panel panel-primary">
            <div class="panel-heading">E-Social</div>
            <div class="panel-body">
                <ul class="nav nav-tabs" id="tabs" role="tablist">
                    <li role="presentation" class="active">
                        <a href="#identificacao" id="identificacao-tab" role="tab" data-toggle="tab" aria-controls="identificacao" aria-expanded="true">Identificação</a>
                    </li>
                    <li role="presentation">
                        <a href="#documento" id="documento-tab" role="tab" data-toggle="tab" aria-controls="documento" aria-expanded="true">Documentos</a>
                    </li>
                    <li role="presentation">
                        <a href="#endereco" id="endereco-tab" role="tab" data-toggle="tab" aria-controls="endereco" aria-expanded="true">Endereço</a>
                    </li>
                    <li role="presentation">
                        <a href="#registro-profissional" id="registro-profissional-tab" role="tab" data-toggle="tab" aria-controls="registro-profissional" aria-expanded="true">Registro Profissional</a>
                    </li>
                    <li role="presentation">
                        <a href="#dependente" id="dependente-tab" role="tab" data-toggle="tab" aria-controls="dependente" aria-expanded="true">Dependentes</a>
                    </li>
                </ul>
                <div class="tab-content" id="tabs-content">
                    <div class="tab-pane fade in active" role="tabpanel" id="identificacao" aria-labelledy="identificacao-tab">
                        <input type="text" id="txtCodigo" hidden>
                        <h2 class="title text-center" id="identificacaoModalLabel">Identificação</h2>
                        <div class="form-group row">
                            <label for="txtChapa" class="col-sm-3 col-form-label">Chapa</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtChapa" placeholder="Chapa" disabled>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtNome" class="col-sm-3 col-form-label">Nome</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtNome" placeholder="Nome" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtDataNascimento" class="col-sm-3 col-form-label">Data de Nascimento</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control data" id="txtDataNascimento" placeholder="Data">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtEmail" class="col-sm-3 col-form-label">Email</label>
                            <div class="col-sm-9">
                                <input type="email" class="form-control" id="txtEmail" placeholder="Email">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtNomePai" class="col-sm-3 col-form-label">Nome do Pai</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtNomePai" placeholder="Nome do Pai" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtNomeMae" class="col-sm-3 col-form-label">Nome da Mãe</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtNomeMae" placeholder="Nome da Mãe" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selEstadoNatal">Estado Natal</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selEstadoNatal" placeholder="Estado">>
                                    <option value=""></option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selNaturalidade">Naturalidade</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selNaturalidade">
                                    <option value=""></option>
                                    <option value="Águas Belas">Águas Belas</option>
                                    <option value="Aguas Formosas">Aguas Formosas</option>
                                    <option value="Aiuaba">Aiuaba</option>
                                    <option value="Almenara">Almenara</option>
                                    <option value="Alto Piquiri">Alto Piquiri</option>
                                    <option value="Alvarenga">Alvarenga</option>
                                    <option value="Andradina">Andradina</option>
                                    <option value="Angra Dos Reis">Angra Dos Reis</option>
                                    <option value="Araçatuba">Araçatuba</option>
                                    <option value="Araçuaí">Araçuaí</option>
                                    <option value="Araguari">Araguari</option>
                                    <option value="Araraquara">Araraquara</option>
                                    <option value="Arataca">Arataca</option>
                                    <option value="Assunção">Assunção</option>
                                    <option value="Bacabal">Bacabal</option>
                                    <option value="Barra">Barra</option>
                                    <option value="Barreirinhas">Barreirinhas</option>
                                    <option value="Belo Horizonte">Belo Horizonte</option>
                                    <option value="Betim">Betim</option>
                                    <option value="Boa Esperança">Boa Esperança</option>
                                    <option value="Bocaiúva">Bocaiúva</option>
                                    <option value="Bom Jesus Do Galho">Bom Jesus Do Galho</option>
                                    <option value="Bonfim">Bonfim</option>
                                    <option value="Brasília">Brasília</option>
                                    <option value="Cabo Frio">Cabo Frio</option>
                                    <option value="Camaragibe">Camaragibe</option>
                                    <option value="Campanário">Campanário</option>
                                    <option value="Campinas">Campinas</option>
                                    <option value="Campo Belo">Campo Belo</option>
                                    <option value="Canindé">Canindé</option>
                                    <option value="Capelinha">Capelinha</option>
                                    <option value="Caraí">Caraí</option>
                                    <option value="Carandai">Carandai</option>
                                    <option value="Carangola">Carangola</option>
                                    <option value="Caratinga">Caratinga</option>
                                    <option value="Caravelas">Caravelas</option>
                                    <option value="Carlos Chagas">Carlos Chagas</option>
                                    <option value="Carmopolis De Minas">Carmopolis De Minas</option>
                                    <option value="Coluna">Coluna</option>
                                    <option value="Conceição Da Barra">Conceição Da Barra</option>
                                    <option value="Conselheiro Lafaiete">Conselheiro Lafaiete</option>
                                    <option value="Conselheiro Pena">Conselheiro Pena</option>
                                    <option value="Contagem">Contagem</option>
                                    <option value="Coração De Jesus">Coração De Jesus</option>
                                    <option value="Coroaci">Coroaci</option>
                                    <option value="Coronel Fabriciano">Coronel Fabriciano</option>
                                    <option value="Coronel João Sá">Coronel João Sá</option>
                                    <option value="Cruzilia">Cruzilia</option>
                                    <option value="Curvelo">Curvelo</option>
                                    <option value="Diadema">Diadema</option>
                                    <option value="Diamantina">Diamantina</option>
                                    <option value="Divino Das Laranjeiras">Divino Das Laranjeiras</option>
                                    <option value="Divinolândia De Minas">Divinolândia De Minas</option>
                                    <option value="Dom Joaquim">Dom Joaquim</option>
                                    <option value="Dom Silverio">Dom Silverio</option>
                                    <option value="Entre Rios De Minas">Entre Rios De Minas</option>
                                    <option value="Florestópolis">Florestópolis</option>
                                    <option value="Frei Inocêncio">Frei Inocêncio</option>
                                    <option value="Fruta De Leite">Fruta De Leite</option>
                                    <option value="Goianésia">Goianésia</option>
                                    <option value="Gonzaga">Gonzaga</option>
                                    <option value="Governador Valadares">Governador Valadares</option>
                                    <option value="Guanhaes">Guanhaes</option>
                                    <option value="Guanhães">Guanhães</option>
                                    <option value="Guaratinguetá">Guaratinguetá</option>
                                    <option value="Ibirite">Ibirite</option>
                                    <option value="Ibirité">Ibirité</option>
                                    <option value="Iguatama">Iguatama</option>
                                    <option value="Imperatriz">Imperatriz</option>
                                    <option value="Ipatinga">Ipatinga</option>
                                    <option value="Itabirito">Itabirito</option>
                                    <option value="Itabuna">Itabuna</option>
                                    <option value="Itagimirim">Itagimirim</option>
                                    <option value="Itaipé">Itaipé</option>
                                    <option value="Itamaraju">Itamaraju</option>
                                    <option value="Itamarandiba">Itamarandiba</option>
                                    <option value="Itanhém">Itanhém</option>
                                    <option value="Itaobim">Itaobim</option>
                                    <option value="Itapipoca">Itapipoca</option>
                                    <option value="Itauna">Itauna</option>
                                    <option value="Itaúna">Itaúna</option>
                                    <option value="Itinga">Itinga</option>
                                    <option value="Jaiba">Jaiba</option>
                                    <option value="Janauba">Janauba</option>
                                    <option value="Janaúba">Janaúba</option>
                                    <option value="Jaru">Jaru</option>
                                    <option value="Juiz De Fora">Juiz De Fora</option>
                                    <option value="Macaparana">Macaparana</option>
                                    <option value="Mantena">Mantena</option>
                                    <option value="Mariana">Mariana</option>
                                    <option value="Mascote">Mascote</option>
                                    <option value="Medeiros Neto">Medeiros Neto</option>
                                    <option value="Messias">Messias</option>
                                    <option value="Monção">Monção</option>
                                    <option value="Monsenhor Gil">Monsenhor Gil</option>
                                    <option value="Monsenhor Tabosa">Monsenhor Tabosa</option>
                                    <option value="Mutum">Mutum</option>
                                    <option value="Nanuque">Nanuque</option>
                                    <option value="Nazareno">Nazareno</option>
                                    <option value="Nova Era">Nova Era</option>
                                    <option value="Nova Lima">Nova Lima</option>
                                    <option value="Nova Viçosa">Nova Viçosa</option>
                                    <option value="Osasco">Osasco</option>
                                    <option value="Ouro Verde De Minas">Ouro Verde De Minas</option>
                                    <option value="Padre Paraíso">Padre Paraíso</option>
                                    <option value="Pará De Minas">Pará De Minas</option>
                                    <option value="Paulo Afonso">Paulo Afonso</option>
                                    <option value="Pavão">Pavão</option>
                                    <option value="Peçanha">Peçanha</option>
                                    <option value="Pedra Grande">Pedra Grande</option>
                                    <option value="Pedro Leopoldo">Pedro Leopoldo</option>
                                    <option value="Pedro Velho">Pedro Velho</option>
                                    <option value="Petrópolis">Petrópolis</option>
                                    <option value="Piranga">Piranga</option>
                                    <option value="Piripiri">Piripiri</option>
                                    <option value="Pitangui">Pitangui</option>
                                    <option value="Poço Fundo">Poço Fundo</option>
                                    <option value="Poções">Poções</option>
                                    <option value="Ponte Nova">Ponte Nova</option>
                                    <option value="Porto Seguro">Porto Seguro</option>
                                    <option value="Potiraguá">Potiraguá</option>
                                    <option value="Raposos">Raposos</option>
                                    <option value="Raul Soares">Raul Soares</option>
                                    <option value="Ribeira Do Pombal">Ribeira Do Pombal</option>
                                    <option value="Ribeirao Das Neves">Ribeirao Das Neves</option>
                                    <option value="Rio De Janeiro">Rio De Janeiro</option>
                                    <option value="Rio Piracicaba">Rio Piracicaba</option>
                                    <option value="Rubim">Rubim</option>
                                    <option value="Sabará">Sabará</option>
                                    <option value="Salvador">Salvador</option>
                                    <option value="Santa Barbara">Santa Barbara</option>
                                    <option value="Santa Bárbara">Santa Bárbara</option>
                                    <option value="Santa Efigênia De Minas">Santa Efigênia De Minas</option>
                                    <option value="Santa Luzia">Santa Luzia</option>
                                    <option value="Santa Maria Do Salto">Santa Maria Do Salto</option>
                                    <option value="Santa Maria Do Suaçuí">Santa Maria Do Suaçuí</option>
                                    <option value="Santana Do Ipanema">Santana Do Ipanema</option>
                                    <option value="Santo André">Santo André</option>
                                    <option value="Santo Antônio Do Jacinto">Santo Antônio Do Jacinto</option>
                                    <option value="Santo Estêvão">Santo Estêvão</option>
                                    <option value="Santos Dumont">Santos Dumont</option>
                                    <option value="Santos">Santos</option>
                                    <option value="São Bento">São Bento</option>
                                    <option value="São Bernardo Do Campo">São Bernardo Do Campo</option>
                                    <option value="Sao Domingos Do Prata">Sao Domingos Do Prata</option>
                                    <option value="São Francisco">São Francisco</option>
                                    <option value="Sao Geraldo Da Piedade">Sao Geraldo Da Piedade</option>
                                    <option value="São Gonçalo Do Rio Abaixo">São Gonçalo Do Rio Abaixo</option>
                                    <option value="São Gonçalo">São Gonçalo</option>
                                    <option value="São João De Meriti">São João De Meriti</option>
                                    <option value="São João Del Rei">São João Del Rei</option>
                                    <option value="São João Do Piauí">São João Do Piauí</option>
                                    <option value="São João Evangelista">São João Evangelista</option>
                                    <option value="São Joaquim Da Barra">São Joaquim Da Barra</option>
                                    <option value="Sao Jose Do Goiabal">Sao Jose Do Goiabal</option>
                                    <option value="São José Do Jacuri">São José Do Jacuri</option>
                                    <option value="São José Do Piauí">São José Do Piauí</option>
                                    <option value="Sao Jose Dos Campos">Sao Jose Dos Campos</option>
                                    <option value="São José Dos Campos">São José Dos Campos</option>
                                    <option value="São Luís">São Luís</option>
                                    <option value="São Paulo">São Paulo</option>
                                    <option value="São Pedro Dos Ferros">São Pedro Dos Ferros</option>
                                    <option value="São Sebastião Do Maranhão">São Sebastião Do Maranhão</option>
                                    <option value="Sao Vicente Ferrer">Sao Vicente Ferrer</option>
                                    <option value="São Vicente Ferrer">São Vicente Ferrer</option>
                                    <option value="Sapé">Sapé</option>
                                    <option value="Sem-Peixe">Sem-Peixe</option>
                                    <option value="Senador Modestino Gonçalves">Senador Modestino Gonçalves</option>
                                    <option value="Serro">Serro</option>
                                    <option value="Sete Lagoas">Sete Lagoas</option>
                                    <option value="Setubinha">Setubinha</option>
                                    <option value="Tarumirim">Tarumirim</option>
                                    <option value="Taubaté">Taubaté</option>
                                    <option value="Teofilândia">Teofilândia</option>
                                    <option value="Teófilo Otoni">Teófilo Otoni</option>
                                    <option value="Tobias Barreto">Tobias Barreto</option>
                                    <option value="Tombos">Tombos</option>
                                    <option value="Tumiritinga">Tumiritinga</option>
                                    <option value="Ubata">Ubata</option>
                                    <option value="Uruburetama">Uruburetama</option>
                                    <option value="Vespasiano">Vespasiano</option>
                                    <option value="Vila Velha">Vila Velha</option>
                                    <option value="Virginópolis">Virginópolis</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selNacionalidade">Nacionalidade</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selNacionalidade">
                                    <option value=""></option>
                                    <option value="Brasileira">Brasileira</option>
                                    <option value="Paraguaia">Paraguaia</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selEstadoCivil">Estado Civil</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selEstadoCivil">
                                    <option value=""></option>
                                    <option value="Casado">Casado</option>
                                    <option value="Divorciado">Divorciado</option>
                                    <option value="Não Informado">Não Informado</option>
                                    <option value="Separado">Separado</option>
                                    <option value="Solteiro">Solteiro</option>
                                    <option value="União Estável">União Estável</option>
                                    <option value="Viúvo">Viúvo</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selSexo">Sexo</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selSexo">
                                    <option value=""></option>
                                    <option value="F">Feminino</option>
                                    <option value="M">Masculino</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selGrauInstrucao">Grau de Instrução</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selGrauInstrucao">
                                    <option value=""></option>
                                    <option value="5º Ano Completo Do Ensino Fundamental">5º Ano Completo Do Ensino Fundamental</option>
                                    <option value="Até O 5º Ano Incompleto Do Ensino Fundamental">Até O 5º Ano Incompleto Do Ensino Fundamental</option>
                                    <option value="Do 6º Ao 9º Ano Do Ensino Fundamental">Do 6º Ao 9º Ano Do Ensino Fundamental</option>
                                    <option value="Educação Superior Completo">Educação Superior Completo</option>
                                    <option value="Educação Superior Incompleto">Educação Superior Incompleto</option>
                                    <option value="Ensino Fundamental Completo">Ensino Fundamental Completo</option>
                                    <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                                    <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
                                    <option value="Pós Grad. Completo">Pós Grad. Completo</option>
                                    <option value="Pós Grad. Incompleto">Pós Grad. Incompleto</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selCorRaca">Cor/Raça</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selCorRaca">
                                    <option value=""></option>
                                    <option value="Amarela">Amarela</option>
                                    <option value="Branca">Branca</option>
                                    <option value="Indígena">Indígena</option>
                                    <option value="Parda">Parda</option>
                                    <option value="Preta/negra">Preta/negra</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" role="tabpanel" id="documento" aria-labelledy="documento-tab">
                        <h2 class="title text-center" id="DocumentoLabel">Documentos</h2>
                        <h3 class="title text-center" id="CPF">CPF</h3>
                        <div class="form-group row">
                            <label for="txtCPF" class="col-sm-3 col-form-label">CPF</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control cpf" id="txtCPF" placeholder="CPF">
                            </div>
                        </div>

                        <h3 class="title text-center" id="Identidade">Carteira de Identidade</h3>

                        <div class="form-group row">
                            <label for="txtIdentidade" class="col-sm-3 col-form-label">N° da Carteira de Identidade</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control rg" id="txtIdentidade" placeholder="Número da Carteira de Identidade" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtDataEmissaoIdentidade" class="col-sm-3 col-form-label">Data de Emissão da Carteira de Identidade</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control data" id="txtDataEmissaoIdentidade" placeholder="Data de Emissão da Carteira de Identidade">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtOrgaoEmissorIdentidade" class="col-sm-3 col-form-label">Órgão Emissor da Carteira de Identidade</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtOrgaoEmissorIdentidade" placeholder="Órgão Emissor da Carteira de Identidade" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selUFIdentidade">UF Emissor da Carteira de Identidade</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selUFIdentidade">
                                    <option value=""></option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                            </div>
                        </div>

                        <h3 class="title text-center" id="CarteiraMotorista">Carteira de Motorista</h3>

                        <div class="form-group row">
                            <label for="txtNumeroCNH" class="col-sm-3 col-form-label">Número da CNH</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtNumeroCNH" placeholder="Número da CNH">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selCategoriaCNH">Categoria da CNH</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selCategoriaCNH">
                                    <option value=""></option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="AB">AB</option>
                                    <option value="AC">AC</option>
                                    <option value="AD">AD</option>
                                    <option value="AE">AE</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtOrgaoEmissorCNH" class="col-sm-3 col-form-label">Órgão Emissor da CNH</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtOrgaoEmissorCNH" placeholder="Órgão Emissor da CNH">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selEstadoCNH">Estado da CNH</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selEstadoCNH">
                                    <option value=""></option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtDataEmissaoCNH" class="col-sm-3 col-form-label">Data de Emissão da CNH</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control data" id="txtDataEmissaoCNH" placeholder="Data de Emissão da CNH">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtDataVencimentoCNH" class="col-sm-3 col-form-label">Data de Vencimento da CNH</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control data" id="txtDataVencimentoCNH" placeholder="Data de Vencimento da CNH">
                            </div>
                        </div>

                        <h3 class="title text-center" id="CarteiraTrabalho">Carteira de Trabalho</h3>

                        <div class="form-group row">
                            <label for="txtNumeroCarteiraTrabalho" class="col-sm-3 col-form-label">N° Carteira de Trabalho</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtNumeroCarteiraTrabalho" placeholder="Número da Carteira de Trabalho" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtSerieCarteiraTrabalho" class="col-sm-3 col-form-label">Série da Carteira de Trabalho</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtSerieCarteiraTrabalho" placeholder="Série da Carteira de Trabalho" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selUFCarteiraTrabalho">UF da Carteira de Trabalho</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selUFCarteiraTrabalho">
                                    <option value=""></option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                            </div>
                        </div>

                        <h3 class="title text-center" id="PISLabel">PIS/PASEP</h3>

                        <div class="form-group row">
                            <label for="txtNumeroPIS" class="col-sm-3 col-form-label">N° do PIS/PASEP</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtNumeroPIS" placeholder="Número do PIS/PASEP" required>
                            </div>
                        </div>


                        <h3 class="title text-center" id="EleitorLabel">Título de Eleitor</h3>

                        <div class="form-group row">
                            <label for="txtNumeroTituloEleitor" class="col-sm-3 col-form-label">N° do Título de Eleitor</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtNumeroTituloEleitor" placeholder="Número do Título de Eleitor" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtZona" class="col-sm-3 col-form-label">Zona de Votação</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtZona" placeholder="Zona de Votação" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtSecao" class="col-sm-3 col-form-label">Seção de Votação</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtSecao" placeholder="Seção de Votação" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtDataEmissaoTituloEleitor" class="col-sm-3 col-form-label">Data de Emissão do Título de Eleitor</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control data" id="txtDataEmissaoTituloEleitor" placeholder="Data de Emissão do Título de Eleitor">
                            </div>
                        </div>

                        <h3 class="title text-center" id="EleitorLabel">Documentos de Estrangeiros</h3>

                        <div class="form-group row">
                            <label for="txtOrgaoEmissaoRegistroEstrangeiro" class="col-sm-3 col-form-label">Órgão Emissor do Registro Nacional de Estrangeiro</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtOrgaoEmissaoRegistroEstrangeiro" placeholder="Órgão Emissor do Registro Nacional de Estrangeiro">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtDataEmissaoRegistroEstrangeiro" class="col-sm-3 col-form-label">Data de Emissão do Registro Nacional de Estrangeiro</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control data" id="txtDataEmissaoRegistroEstrangeiro" placeholder="Data de Emissão do Registro Nacional de Estrangeiro">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtDataChegada" class="col-sm-3 col-form-label">Data da Chegada</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control data" id="txtDataChegada" placeholder="Data da Chegada">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtDataNaturalizacaoEstrangeiro" class="col-sm-3 col-form-label">Data de Naturalização do Estrangeiro no Brasil</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control data" id="txtDataNaturalizacaoEstrangeiro" placeholder="Data de Naturalização do Estrangeiro no Brasil">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtPaisOrigem" class="col-sm-3 col-form-label">País de Origem</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtPaisOrigem" placeholder="País de Origem">
                            </div>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="chbConjugeBrasil">
                            <label class="form-check-label" for="chbConjugeBrasil">Cônjuge no Brasil</label>
                        </div>
                    </div>
                    <div class="tab-pane fade" role="tabpanel" id="endereco" aria-labelledy="endereco-tab">
                        <h2 class="title text-center" id="exampleModalLabel">Endereço</h2>
                        <div class="form-group row">
                            <label for="txtCep" class="col-sm-3 col-form-label">CEP</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control cep" id="txtCep" placeholder="CEP">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selTipoRua">Tipo de Rua</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selTipoRua">
                                    <option value=""></option>
                                    <option value="Alameda">Alameda</option>
                                    <option value="Avenida">Avenida</option>
                                    <option value="Beco">Beco</option>
                                    <option value="Estrada">Estrada</option>
                                    <option value="Praca">Praca</option>
                                    <option value="Rua">Rua</option>
                                    <option value="Travessa">Travessa</option>
                                    <option value="Via">Via</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtRua" class="col-sm-3 col-form-label">Rua</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtRua" placeholder="Rua" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtNumero" class="col-sm-3 col-form-label">Número</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtNumero" placeholder="Número" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtComplemento" class="col-sm-3 col-form-label">Complemento</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtComplemento" placeholder="Complemento">
                            </div>
                        </div>

                        <!-- <div class="form-group row">
                            <label class="col-sm-3" for="selTipoBairro">Tipo de Bairro</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selTipoBairro">
                                    <option selected>Tipo de Bairro</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div> -->

                        <div class="form-group row">
                            <label for="txtBairro" class="col-sm-3 col-form-label">Bairro</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtBairro" placeholder="Bairro" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtCidade" class="col-sm-3 col-form-label">Cidade</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtCidade" placeholder="Cidade" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selEstado">Estado</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selEstado">
                                    <option value=""></option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selCodigoPaisEndereco">Cod. do País do Endereço</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selCodigoPaisEndereco">
                                    <option value=""></option>
                                    <option value="Brasil">Brasil</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtTelefoneContato1" class="col-sm-3 col-form-label">Telefone para Contato Opção 1</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control sp_celphones" id="txtTelefoneContato1" required>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtTelefoneContato2" class="col-sm-3 col-form-label">Telefone para Contato Opção 2</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control sp_celphones" id="txtTelefoneContato2" placeholder="Telefone para Contato">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtTelefoneContato3" class="col-sm-3 col-form-label">Telefone para Contato Opção 3</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control sp_celphones" id="txtTelefoneContato3" placeholder="Telefone para Contato">
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" role="tabpanel" id="registro-profissional" aria-labelledy="registro-profissional-tab">
                        <h2 class="title text-center" id="exampleModalLabel">Registro Profissional</h2>
                        <div class="form-group row">
                            <label for="txtNumeroRegistroProfissional" class="col-sm-3 col-form-label">N° do Registro Profissional no Órgão de Classe</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtNumeroRegistroProfissional" placeholder="Número do Registro Profissional no Órgão de Classe">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="txtCodigoOrgaoRegulamentador">Cód. do Órgão Regulamentador</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="txtCodigoOrgaoRegulamentador" placeholder="Órgão Regulamentador">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3" for="selUFProfissao">UF do Registro</label>
                            <div class="col-sm-9">
                                <select class="form-control" id="selUFProfissao">
                                    <option value=""></option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="txtDataEmissaoProfissao" class="col-sm-3 col-form-label">Data de Emissão</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control data" id="txtDataEmissaoProfissao" placeholder="Data de Emissão">
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" role="tabpanel" id="dependente" aria-labelledy="dependente-tab">
                        <div class="form-group">
                            <h2 class="title text-center" id="lblDependentes">Dependentes</h2>
                        </div>
                        <div class="form-group">
                            <button type="button" class="btn btn-success " onclick="novoDependente()">
                            Adicionar Dependente
                            </button>
                        </div>
                        <table class="table table-striped">
                            <thead class="thead-light">
                            <tr>
                                <th>Dependente</th>
                                <th>Idade</th>
                                <th>Sexo</th>
                                <th>Estado Civil</th>
                                <th>Ação</th>
                            </tr>
                            </thead>
                            <tbody id="lista-dependentes">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <button type="submit" id="btnSalvarAlteracoes" class="btn btn-primary btn-sm">Salvar Alterações</button>
            </div>
        </div>
    </form>

    <!-- formulario de dependentes -->
    <div class="modal fade" id="formulario-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="modal-titulo">Dependente</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group form-group-sm" id="mensagem" hidden>
                        <div class="alert alert-warning" role="alert">
                            <strong>Atenção!</strong> Os campos abaixo são obrigatórios.
                            <ul>
                                <li>Nome</li>
                                <li>CPF</li>
                                <li>Local de Nascimento</li>
                                <li>Cartório</li>
                                <li>Número do Registro</li>
                                <li>Número do Livro</li>
                                <li>Número Folha</li>
                            </ul>
                        </div>
                    </div>
                    <div class="form-group row">
                        <input type="text" id="txtIndiceDependente" hidden >
                        <label for="txtNomeDependente" class="col-sm-3 col-form-label">Nome do Dependente</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="txtNomeDependente" placeholder="Nome">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtCPFDependente" class="col-sm-3 col-form-label">CPF</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control cpf" id="txtCPFDependente" placeholder="CPF">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtDataNascimentoDependente" class="col-sm-3 col-form-label">Data de Nascimento</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control data" id="txtDataNascimentoDependente" placeholder="Data de Nascimento">
                        </div>
                    </div> 

                    <div class="form-group row">
                        <label class="col-sm-3" for="selSexoDependente">Sexo</label>
                        <div class="col-sm-9">
                            <select class="form-control" id="selSexoDependente" placeholder="Sexo">>
                                <option value=""></option>
                                <option value="F">Feminino</option>
                                <option value="M">Masculino</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label class="col-sm-3" for="selEstadoCivilDependente">Estado Civil</label>
                        <div class="col-sm-9">
                            <select class="form-control" id="selEstadoCivilDependente" placeholder="EstadoCivil">>
                                <option value=""></option>
                                <option value="Casado">Casado</option>
                                <option value="Divorciado">Divorciado</option>
                                <option value="Não Informado">Não Informado</option>
                                <option value="Separado">Separado</option>
                                <option value="Solteiro">Solteiro</option>
                                <option value="União Estável">União Estável</option>
                                <option value="Viúvo">Viúvo</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtLocalNascimento" class="col-sm-3 col-form-label">Local de Nascimento</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="txtLocalNascimento" placeholder="Local de Nascimento">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtCartorio" class="col-sm-3 col-form-label">Cartório</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="txtCartorio" placeholder="Cartório">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtNumeroRegistroDependente" class="col-sm-3 col-form-label">Número do Registro</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="txtNumeroRegistroDependente" placeholder="Registro">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtNumeroLivro" class="col-sm-3 col-form-label">Número do Livro</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="txtNumeroLivro" placeholder="Livro">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtNumeroFolha" class="col-sm-3 col-form-label">Número da Folha</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="txtNumeroFolha" placeholder="Folha">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label class="col-sm-3" for="selGrauParentesco">Grau de Parentesco</label>
                        <div class="col-sm-9">
                            <select class="form-control" id="selGrauParentesco" placeholder="Grau de Parentesco">>
                                <option value=""></option>
                                <option value="Companheiro(A)">Companheiro(A)</option>
                                <option value="Cônjuge">Cônjuge</option>
                                <option value="Enteado(A)">Enteado(A)</option>
                                <option value="Ex-Cônjuge">Ex-Cônjuge</option>
                                <option value="Filho(A) Válido">Filho(A) Válido</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="chbCartaoVacina">
                        <label class="form-check-label" for="chbCartaoVacina">Cartão de Vacina</label>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtPercentualPensao" class="col-sm-3 col-form-label">Percentual da Pensão</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control percentual" id="txtPercentualPensao" placeholder="Percentual da Pensão">
                        </div>
                    </div>
                    
                    <!-- <div class="form-group row">
                        <label class="col-sm-3" for="selTipoPensao">Tipo de Pensão</label>
                        <div class="col-sm-9">
                            <select class="form-control" id="selTipoPensao" placeholder="Tipo de Pensão">>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">Four</option>
                            </select>
                        </div>
                    </div> -->
                    
                    <div class="form-group row">
                        <label for="txtBanco" class="col-sm-3 col-form-label">Banco</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="txtBanco" placeholder="Banco">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtAgencia" class="col-sm-3 col-form-label">Agência</label>
                        <div class="col-sm-9">
                            <input type="number" class="form-control" id="txtAgencia" placeholder="Agência">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtContaCorrente" class="col-sm-3 col-form-label">Conta Corrente</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="txtContaCorrente" placeholder="Conta Corrente">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtResponsavel" class="col-sm-3 col-form-label">Responsavel</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="txtResponsavel" placeholder="Responsável">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtDataEntregaCertidao" class="col-sm-3 col-form-label">Data de Entraga da Certidão</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control data" id="txtDataEntregaCertidao" placeholder="Entraga da Certidão">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label class="col-sm-3" for="selFrequenciaEscolar">Frequência Escolar</label>
                        <div class="col-sm-9">
                            <select class="form-control" id="selFrequenciaEscolar" placeholder="Frequência Escolar">>
                                <option value=""></option>
                                <option value="Entregou Comprovante De Freq. Escolar">Entregou Comprovante De Freq. Escolar</option>
                                <option value="Não Entregou Comprovante De Freq. Escolar">Não Entregou Comprovante De Freq. Escolar</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="chbUniversitario">
                        <label class="form-check-label" for="chbUniversitario">Universitário</label>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtNumeroCartaoSUS" class="col-sm-3 col-form-label">Número do Cartão SUS</label>
                        <div class="col-sm-9">
                            <input type="number" class="form-control" id="txtNumeroCartaoSUS" placeholder="Número do Cartão SUS">
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="txtPlanoSaude" class="col-sm-3 col-form-label">Plano de Saúde</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="txtPlanoSaude" placeholder="Plano de Saúde">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" onclick="adicionarDependente()">Salvar mudanças</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Formulario modal de confirmacao-->
    <div class="modal fade" id="modal_confirmar" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h5 class="modal-title">Confirmar</h5>
                </div>
                <div class="modal-body">
                    <p id="mensagem_modal_confirmar"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btnModalConfirmar">Sim</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Não</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="js/mask.js"></script>
<script src="js/mask_money.js"></script>
<script src="js/jquery.mask.min.js"></script>
<script src="js/config.js"></script>
<script src="js/formularios/esocial.js"></script>

<?php
    require_once("layout/rodape_layout.php");
?>