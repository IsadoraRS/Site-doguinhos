// ==========================================================
// PATAS & LAR
// CONFIGURAÇÕES DO SITE
// ==========================================================

const emailAbrigo = "patinhasabrigo@gmail.com";

// Troque pelo valor da chave Pix do abrigo (CPF, CNPJ, e-mail, telefone ou chave aleatória)
const chavePix = "COLOQUE_A_CHAVE_PIX_AQUI";


// ==========================================================
// 2. LISTA DE CACHORROS
// ==========================================================
//
// Para adicionar um novo cachorro, copie um dos objetos abaixo.
//
// Foto:
// Coloque o caminho da imagem.
//
// Exemplo:
// foto: "imagens/mel.jpg"
//
// Se deixar vazio:
// foto: ""
//
// O site mostrará um espaço reservado para a foto.
// ==========================================================

const cachorros = [

    {
        nome: "Moana",
        raca: "Pitbull",
        caracteristicas: [
            "Super amorosa",
            "aproximadamente 2 anos de idade",
            "Filha única"
        ],
        descricao: "Moana é uma fêmea muito carinhosa e adora brincar. Ela perdeu uma patinha, mas isso não a impede de ser uma ótima companheira. Não faz mal nenhum aos seres humanos, mas é um pouco briguenta com irmãos canininos.",
        foto: "Imagens/ImagemMoana.jpeg"
    },

    {
        nome: "Lord",
        raca: "Vira-Lata",
        caracteristicas: [
            "Dócil",
            "Entre 2 e 3 anos de idade",
            "Filho unico"
        ],
        descricao: "Lord é um macho muito dócil com pessoas. Foi resgatado da rua com uma infecção grave no ouvido, foi tratado, superou o problema e hoje espera uma super familia para cuidar dele. Ele tem ciúmes da própria comida, então a preferencia é que seja filho unico. Um ótimo cachorro para cuidar de um quintal.",
        foto: "Imagens/ImagemLord.jpeg"
    },

];


// ==========================================================
// ELEMENTOS DO HTML
// ==========================================================

const listaCachorros = document.getElementById("listaCachorros");

const selectCachorro = document.getElementById("nomeCachorro");

const botoesAbas = document.querySelectorAll(".aba-botao");

const secoesAbas = document.querySelectorAll(".aba-secao");

const formularioContato = document.getElementById("formularioContato");

const campoNome = document.getElementById("campoNome");

const campoEmail = document.getElementById("campoEmail");

const campoMensagem = document.getElementById("campoMensagem");

const botaoEnviar = document.getElementById("botaoEnviar");

const statusEnvio = document.getElementById("statusEnvio");

const textoPix = document.getElementById("textoPix");

const botaoCopiarPix = document.getElementById("botaoCopiarPix");

const botaoAbrirChat = document.getElementById("botaoAbrirChat");


// Controla se o visitante já escreveu a própria mensagem,
// para não sobrescrever o que ele digitou.
let mensagemEditadaManualmente = false;


// ==========================================================
// FUNÇÃO PARA CRIAR OS CARDS
// ==========================================================

function criarCards() {

    cachorros.forEach((cachorro, indice) => {

        // Criando o card
        const card = document.createElement("article");

        card.classList.add("card");


        // --------------------------------------------------
        // FOTO
        // --------------------------------------------------

        let fotoHTML;

        if (cachorro.foto) {

            fotoHTML = `
                <div class="card-foto">
                    <img 
                        src="${cachorro.foto}" 
                        alt="Foto do cachorro ${cachorro.nome}"
                    >
                </div>
            `;

        } else {

            fotoHTML = `
                <div class="card-foto">

                    <div>
                    
                        <svg 
                            class="placeholder-pata" 
                            viewBox="0 0 100 100"
                        >
                            <use href="#icone-pata"></use>
                        </svg>

                        <p>
                            Espaço para a foto<br>
                            do cachorro
                        </p>

                    </div>

                </div>
            `;

        }


        // --------------------------------------------------
        // CARACTERÍSTICAS
        // --------------------------------------------------

        const tagsHTML = cachorro.caracteristicas
            .map(caracteristica => {

                return `
                    <span class="card-tag">
                        ${caracteristica}
                    </span>
                `;

            })
            .join("");



        // --------------------------------------------------
        // CONTEÚDO DO CARD
        // --------------------------------------------------

        card.innerHTML = `

            ${fotoHTML}

            <div class="card-corpo">

                <h2 class="card-nome">
                    ${cachorro.nome}
                </h2>

                <p class="card-raca">
                    ${cachorro.raca}
                </p>

                <div class="card-tags">

                    ${tagsHTML}

                </div>

                <p class="card-descricao">

                    ${cachorro.descricao}

                </p>

                <button 
                    class="card-botao"
                    data-cachorro="${indice}">
                    Tenho interesse
                </button>

            </div>

        `;


        // Adicionando o card na página
        listaCachorros.appendChild(card);


        // --------------------------------------------------
        // ADICIONANDO CACHORRO AO SELECT DA ABA CONTATO
        // --------------------------------------------------

        const option = document.createElement("option");

        option.value = cachorro.nome;

        option.textContent = cachorro.nome;

        selectCachorro.appendChild(option);

    });

}


// ==========================================================
// TEXTO PADRÃO DA MENSAGEM, DE ACORDO COM O ASSUNTO ESCOLHIDO
// ==========================================================

function textoPadraoMensagem(valorSelecionado) {

    if (valorSelecionado === "doacao") {

        return "Olá! Quero fazer uma doação.";

    } else if (valorSelecionado !== "") {

        return `Olá! Tenho interesse em saber mais sobre o cachorro ${valorSelecionado}.`;

    } else {

        return "Olá! Gostaria de conversar e saber como posso ajudar.";

    }

}


// ==========================================================
// ATUALIZAR O CAMPO DE MENSAGEM (sem apagar o que o visitante já escreveu)
// ==========================================================

function atualizarMensagemPadrao() {

    if (!mensagemEditadaManualmente) {

        campoMensagem.value = textoPadraoMensagem(selectCachorro.value);

    }

}


// Se o visitante digitar algo na mensagem, paramos de sobrescrevê-la
campoMensagem.addEventListener("input", function() {

    mensagemEditadaManualmente = true;

});


// ==========================================================
// QUANDO A PESSOA TROCAR O CACHORRO NO SELECT
// ==========================================================

selectCachorro.addEventListener("change", atualizarMensagemPadrao);


// ==========================================================
// BOTÃO "QUERO FAZER UMA DOAÇÃO"
// ==========================================================

// ==========================================================
// BOTÕES "TENHO INTERESSE" DOS CARDS
// ==========================================================

document.addEventListener("click", function(event) {

    // Verificando se clicou em um botão de interesse
    if (event.target.classList.contains("card-botao")) {

        const indice = event.target.dataset.cachorro;

        const cachorroSelecionado = cachorros[indice];


        // Troca para a aba de contato
        abrirAba("contato");


        // Seleciona automaticamente o cachorro
        selectCachorro.value = cachorroSelecionado.nome;

        mensagemEditadaManualmente = false;

        atualizarMensagemPadrao();

    }

});


// ==========================================================
// ABA PIX: mostrar a chave e copiar para a área de transferência
// ==========================================================

textoPix.textContent = chavePix;

botaoCopiarPix.addEventListener("click", async function() {

    try {

        await navigator.clipboard.writeText(chavePix);

        botaoCopiarPix.textContent = "Chave copiada!";

    } catch (erro) {

        botaoCopiarPix.textContent = "Não foi possível copiar";

    }

    setTimeout(function() {

        botaoCopiarPix.textContent = "Copiar chave";

    }, 2500);

});


// ==========================================================
// ABA CHAT: abrir o widget do Crisp ao clicar no botão
// ==========================================================

botaoAbrirChat.addEventListener("click", function() {

    if (window.$crisp && typeof window.$crisp.push === "function") {

        window.$crisp.push(["do", "chat:open"]);

    } else {

        alert("O chat ainda não foi configurado. Veja as instruções no início do index.html.");

    }

});


// ==========================================================
// ENVIO DO FORMULÁRIO DE CONTATO POR E-MAIL (via FormSubmit)
// ==========================================================

formularioContato.addEventListener("submit", async function(evento) {

    evento.preventDefault();

    botaoEnviar.disabled = true;
    botaoEnviar.textContent = "Enviando...";

    statusEnvio.textContent = "";
    statusEnvio.classList.remove("sucesso", "erro");

    const dados = {
        nome: campoNome.value,
        email: campoEmail.value,
        assunto: selectCachorro.value || "Contato geral",
        mensagem: campoMensagem.value,
        _subject: `Novo contato pelo site — ${campoNome.value}`
    };

    try {

        const resposta = await fetch(`https://formsubmit.co/ajax/${emailAbrigo}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            throw new Error("Falha no envio");
        }

        statusEnvio.textContent = "Mensagem enviada! A gente responde por e-mail em breve. 🐾";
        statusEnvio.classList.add("sucesso");

        formularioContato.reset();
        mensagemEditadaManualmente = false;

    } catch (erro) {

        statusEnvio.textContent = `Não foi possível enviar agora. Tente novamente ou escreva direto para ${emailAbrigo}`;
        statusEnvio.classList.add("erro");

    } finally {

        botaoEnviar.disabled = false;
        botaoEnviar.textContent = "Enviar mensagem";

    }

});


// ==========================================================
// FUNÇÃO PARA TROCAR DE ABA
// ==========================================================

function abrirAba(nomeAba) {

    // Remove a classe ativo de todas as seções
    secoesAbas.forEach(secao => {

        secao.classList.remove("ativo");

    });


    // Remove ativo dos botões
    botoesAbas.forEach(botao => {

        botao.classList.remove("ativo");

        botao.setAttribute(
            "aria-selected",
            "false"
        );

    });


    // Ativa a seção escolhida
    document
        .getElementById(nomeAba)
        .classList
        .add("ativo");


    // Ativa o botão correspondente
    const botaoAtivo = document.querySelector(
        `[data-aba="${nomeAba}"]`
    );


    botaoAtivo.classList.add("ativo");


    botaoAtivo.setAttribute(
        "aria-selected",
        "true"
    );

}


// ==========================================================
// EVENTOS DOS BOTÕES DAS ABAS
// ==========================================================

botoesAbas.forEach(botao => {

    botao.addEventListener("click", function() {

        const nomeAba = this.dataset.aba;

        abrirAba(nomeAba);

    });

});


// ==========================================================
// INICIAR O SITE
// ==========================================================

criarCards();

atualizarMensagemPadrao();