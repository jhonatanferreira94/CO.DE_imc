//Algoritmo

//Calcular IMC
//1. Pegar os valores
//2. Calcular o IMC
//3. Gerar a classificacao do IMC 
//4. Organizar as informacoes
//5. Salvar os dados na lista
//6. Ler a lista com os dados 
//7. Renderizar o conteudo no HTML
//8. Botao de limpar registro

//Principal

function calculadoraImc(event) {
    // event.preventDefault()
    console.log("Funcionante!");
    let dadosUsuario = pegarValores();
    let imc = calcular(dadosUsuario.altura, dadosUsuario.peso);
    let classificacaoFinal = classificarImc(imc);
    let usuarioAtualizado = organizarDados(dadosUsuario, imc, classificacaoFinal);
    cadastroUsuario(usuarioAtualizado)


}

// Passo 1 -  Pegar valor

function pegarValores() {
    let nomeRecebido = document.getElementById("nome").value.trim();
    let alturaRecebido = parseFloat(document.getElementById("altura").value);
    let pesoRecebido = parseFloat(document.getElementById("peso").value);

    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebido,
        peso: pesoRecebido
    }

    console.log(dadosUsuario);

    return dadosUsuario;
}

// Passo 2 -  Calcular

function calcular(altura, peso) {
    let imc = peso / (altura * altura)
    console.log(imc);
    return imc;
}

// Passo 3 -  Classificar 
function classificarImc(imc) {

    if (imc < 18.5) {
        return "Filezinho!"
    } else if (imc < 25) {
        return "Dilicia!"
    } else if (imc < 30) {
        return "Topzera!"
    } else {
        return "Oh! Lá em casa!"
    }
}

//Passo 4 - Organizar Informacacoes

function organizarDados(dadosUsuario, valorImc, classificacaoImc) {
    let dataHoraAtual = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'long' }).format(Date.now());

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorImc.toFixed(2),
        classificacao: classificacaoImc,
        dataCadastro: dataHoraAtual
    }

    console.log(dadosUsuarioAtualizado);

    return dadosUsuarioAtualizado;
}

//Passo 5 - Salvar

function cadastroUsuario(usuario) {
    let listaUsuarios = [];

    // if (localStorage.getItem("usuariosCadastrados")==true) quando nao tiver comparacao
    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    listaUsuarios.push(usuario)
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

//Passo 6 - Ler lista

function carregarUsuarios() {
    let listaUsuarios = [];

    // if (localStorage.getItem("usuariosCadastrados")==true) quando nao tiver comparacao
    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    if (listaUsuarios.length == 0) {

        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuário cadastrado!</td>
        </tr>`

    } else {
        montarTabela(listaUsuarios);
    }

}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());


//Passo 7 - Montar tabela 
function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById("corpo-tabela");

    let template = '';

    listaDeCadastrados.forEach(pessoa => {
        template += `<tr>
        <td data-cell="nome">${pessoa.nome}</td>
        <td data-cell="altura">${pessoa.altura}</td>
        <td data-cell="peso">${pessoa.peso}</td>
        <td data-cell="valor do IMC">${pessoa.imc}</td>
        <td data-cell="classificação do IMC">${pessoa.classificacao}</td>
        <td data-cell="data de cadastro">${pessoa.dataCadastro}</td>
    </tr>`

    });

    tabela.innerHTML = template;
}

//8. Botao de limpar registro
function deletarRegistros() {
    localStorage.clear("usuariosCadastrados")
    window.location.reload();
}
