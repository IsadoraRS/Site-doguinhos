// ==========================================================
// PATAS & LAR
// CONFIGURAÇÕES DO SITE
// ==========================================================

const numeroWhatsapp = "5541999366597";


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

const linkWhatsapp = document.getElementById("linkWhatsapp");

const botaoDoacao = document.getElementById("botaoDoacao");

const botoesAbas = document.querySelectorAll(".aba-botao");

const secoesAbas = document.querySelectorAll(".aba-secao");


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
        // ADICIONANDO CACHORRO AO SELECT DA ABA INTERESSE
        // --------------------------------------------------

        const option = document.createElement("option");

        option.value = cachorro.nome;

        option.textContent = cachorro.nome;

        selectCachorro.appendChild(option);

    });

}


// ==========================================================
// ATUALIZAR LINK DO WHATSAPP
// ==========================================================

function atualizarWhatsapp() {

    const cachorroSelecionado = selectCachorro.value;

    let mensagem;


    // Caso a pessoa escolha um cachorro
    if (cachorroSelecionado === "doacao") {

        mensagem = `Olá! Quero fazer uma doação.`;

    }

    // Caso a pessoa escolha um cachorro
    else if (cachorroSelecionado !== "") {

        mensagem = `Olá! Tenho interesse em saber mais sobre o cachorro ${cachorroSelecionado}.`;

    }

    // Caso a pessoa não escolha nenhum cachorro
    else {

        mensagem = `Olá! Gostaria de conversar e saber sobre como eu posso ajudar de outras formas.`;

    }


    // Criando o link do WhatsApp
    const mensagemCodificada = encodeURIComponent(mensagem);


    linkWhatsapp.href = `
        https://wa.me/${numeroWhatsapp}?text=${mensagemCodificada}
    `.replace(/\s/g, "");

}


// ==========================================================
// QUANDO A PESSOA TROCAR O CACHORRO NO SELECT
// ==========================================================

selectCachorro.addEventListener("change", atualizarWhatsapp);


// ==========================================================
// BOTÃO "QUERO FAZER UMA DOAÇÃO"
// ==========================================================

botaoDoacao.addEventListener("click", function() {

    abrirAba("interesse");

    selectCachorro.value = "doacao";

    atualizarWhatsapp();

});


// ==========================================================
// BOTÕES "TENHO INTERESSE" DOS CARDS
// ==========================================================

document.addEventListener("click", function(event) {

    // Verificando se clicou em um botão de interesse
    if (event.target.classList.contains("card-botao")) {

        const indice = event.target.dataset.cachorro;

        const cachorroSelecionado = cachorros[indice];


        // Troca para a aba de interesse
        abrirAba("interesse");


        // Seleciona automaticamente o cachorro
        selectCachorro.value = cachorroSelecionado.nome;


        // Atualiza o WhatsApp
        atualizarWhatsapp();

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

atualizarWhatsapp();
