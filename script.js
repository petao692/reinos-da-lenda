
let classeAtual = "";
let ouro = 50;
let missoesAceitas = [];

const classes = {
    Guerreiro: {
        vida: 150,
        mana: 30,
        ataque: 25,
        habilidade: "Golpe Devastador"
    },

    Mago: {
        vida: 80,
        mana: 150,
        ataque: 35,
        habilidade: "Bola de Fogo"
    },

    Arqueiro: {
        vida: 100,
        mana: 70,
        ataque: 30,
        habilidade: "Flecha Precisa"
    }
};

function escolherClasse(nome) {
    classeAtual = nome;

    document.getElementById("classeEscolhida").textContent =
        `Classe escolhida: ${nome}! Agora crie seu herói.`;

    document.getElementById("classeAtual").textContent =
        `Classe selecionada: ${nome}`;

    document.getElementById("aventura").scrollIntoView({
        behavior: "smooth"
    });
}

function aceitarMissao(nome, recompensa) {
    const mensagem = document.getElementById("mensagemMissao");

    if (missoesAceitas.some(missao => missao.nome === nome)) {
        mensagem.textContent = `Você já aceitou a missão "${nome}"!`;
        return;
    }

    missoesAceitas.push({
        nome: nome,
        recompensa: recompensa,
        concluida: false
    });

    mensagem.textContent =
        `Missão "${nome}" aceita! Aventure-se para conquistar sua recompensa.`;
}

function criarHeroi() {
    const nome = document.getElementById("nomeHeroi").value.trim();
    const ficha = document.getElementById("fichaHeroi");

    if (!nome) {
        ficha.textContent = "Digite o nome do seu herói!";
        return;
    }

    if (!classeAtual) {
        ficha.textContent = "Escolha uma classe antes de criar seu herói!";
        return;
    }

    const personagem = classes[classeAtual];

    ficha.replaceChildren();

    const titulo = document.createElement("h3");
    titulo.textContent = `⚔ ${nome}`;

    const linha = document.createElement("hr");

    ficha.append(titulo, linha);

    const atributos = [
        `Classe: ${classeAtual}`,
        `❤️ Vida: ${personagem.vida}`,
        `🔮 Mana: ${personagem.mana}`,
        `⚔ Ataque: ${personagem.ataque}`,
        `✨ Habilidade: ${personagem.habilidade}`,
        `💰 Ouro: ${ouro}`,
        `📜 Missões aceitas: ${missoesAceitas.length}`
    ];

    atributos.forEach(texto => {
        const p = document.createElement("p");
        p.textContent = texto;
        ficha.appendChild(p);
    });

    const mensagem = document.createElement("p");
    mensagem.textContent = "Sua lenda começa agora, aventureiro!";
    ficha.appendChild(mensagem);
}
let batalhaAtiva = false;
let missaoConcluida = false;
let vidaHeroi = 100;
let vidaMaxima = 100;
let manaHeroi = 50;
let vidaLobo = 60;
let lobosDerrotados = 0;
let pocoes = 3;
let ouroMissao = 100;

function iniciarMissao() {
    if (missaoConcluida) {
        document.getElementById("historia").textContent =
            "Os viajantes estão seguros graças à sua coragem!";
        return;
    }

    if (batalhaAtiva) return;

    if (!classeAtual) {
        alert("Escolha uma classe na seção Classes antes de entrar na floresta!");
        document.getElementById("classes").scrollIntoView({
            behavior: "smooth"
        });
        return;
    }

    const personagem = classes[classeAtual];

    vidaMaxima = personagem.vida;
    vidaHeroi = vidaMaxima;
    manaHeroi = personagem.mana;
    vidaLobo = 60;
    lobosDerrotados = 0;
    pocoes = 3;
    batalhaAtiva = true;

    document.getElementById("arena").hidden = false;
    document.getElementById("iniciarBatalha").disabled = true;
    document.getElementById("iniciarBatalha").textContent =
        "MISSÃO EM ANDAMENTO";

    document.getElementById("historia").textContent =
        "Você avança pela floresta. Dois lobos selvagens bloqueiam a estrada. Prepare-se para lutar!";

    document.getElementById("nomePersonagem").textContent =
        document.getElementById("nomeHeroi").value.trim() || "Herói";

    document.getElementById("mensagemBatalha").textContent =
        "O primeiro lobo rosna e se prepara para atacar!";

    document.getElementById("resultadoBatalha").textContent = "";

    atualizarBatalha();
    document.getElementById("arena").scrollIntoView({
        behavior: "smooth"
    });
}

function atualizarBatalha() {
    document.getElementById("vidaHeroiTexto").textContent =
        `❤️ Vida: ${vidaHeroi}/${vidaMaxima}`;

    document.getElementById("vidaLoboTexto").textContent =
        `❤️ Vida: ${vidaLobo}/60`;

    document.getElementById("manaHeroiTexto").textContent =
        `🔮 Mana: ${manaHeroi} | 🧪 Poções: ${pocoes}`;

    document.getElementById("vidaHeroiBarra").style.width =
        `${Math.max(0, vidaHeroi / vidaMaxima * 100)}%`;

    document.getElementById("vidaLoboBarra").style.width =
        `${Math.max(0, vidaLobo / 60 * 100)}%`;
}

function atacarLobo() {
    if (!batalhaAtiva) return;

    const personagem = classes[classeAtual];
    const dano = personagem.ataque + Math.floor(Math.random() * 11);

    vidaLobo = Math.max(0, vidaLobo - dano);

    document.getElementById("mensagemBatalha").textContent =
        `Você atacou o lobo e causou ${dano} de dano!`;

    if (vidaLobo <= 0) {
        derrotarLobo();
        return;
    }

    turnoLobo();
}

function usarHabilidade() {
    if (!batalhaAtiva) return;

    const personagem = classes[classeAtual];
    const custo = classeAtual === "Mago" ? 25 : 15;

    if (manaHeroi < custo) {
        document.getElementById("mensagemBatalha").textContent =
            "Mana insuficiente! Ataque normalmente ou use uma poção.";
        return;
    }

    manaHeroi -= custo;

    let dano = personagem.ataque * 2;

    if (classeAtual === "Mago") {
        dano += 15;
    }

    vidaLobo = Math.max(0, vidaLobo - dano);

    document.getElementById("mensagemBatalha").textContent =
        `${personagem.habilidade}! Você causou ${dano} de dano!`;

    if (vidaLobo <= 0) {
        derrotarLobo();
        return;
    }

    turnoLobo();
}

function usarPocao() {
    if (!batalhaAtiva) return;

    if (pocoes <= 0) {
        document.getElementById("mensagemBatalha").textContent =
            "Você não tem mais poções!";
        return;
    }

    if (vidaHeroi === vidaMaxima && manaHeroi === classes[classeAtual].mana) {
        document.getElementById("mensagemBatalha").textContent =
            "Sua vida e sua mana já estão cheias!";
        return;
    }

    pocoes--;

    vidaHeroi = Math.min(vidaMaxima, vidaHeroi + 40);
    manaHeroi = Math.min(
        classes[classeAtual].mana,
        manaHeroi + 20
    );

    document.getElementById("mensagemBatalha").textContent =
        "Você usou uma poção e recuperou vida e mana!";

    turnoLobo();
}

function turnoLobo() {
    if (!batalhaAtiva) return;

    const dano = 8 + Math.floor(Math.random() * 8);
    vidaHeroi = Math.max(0, vidaHeroi - dano);

    if (vidaHeroi <= 0) {
        atualizarBatalha();
        batalhaAtiva = false;

        document.getElementById("mensagemBatalha").textContent =
            "Você foi derrotado pelo lobo!";

        document.getElementById("resultadoBatalha").textContent =
            "Descanse e tente novamente para salvar os viajantes.";

        finalizarCombate(false);
        return;
    }

    atualizarBatalha();

    document.getElementById("mensagemBatalha").textContent +=
        ` O lobo contra-atacou e causou ${dano} de dano!`;
}

function derrotarLobo() {
    lobosDerrotados++;

    if (lobosDerrotados >= 2) {
        batalhaAtiva = false;
        missaoConcluida = true;
        ouro += ouroMissao;

        atualizarBatalha();

        document.getElementById("mensagemBatalha").textContent =
            "VITÓRIA! Os dois lobos foram derrotados!";

        document.getElementById("historia").textContent =
            "Os viajantes estão salvos! A floresta volta a ficar em silêncio, e as pessoas agradecem sua bravura.";

        document.getElementById("resultadoBatalha").textContent =
            `🏆 MISSÃO CONCLUÍDA! +${ouroMissao} moedas de ouro. Total: ${ouro} moedas.`;

        finalizarCombate(true);
        return;
    }

    document.getElementById("mensagemBatalha").textContent =
        "O primeiro lobo caiu! Um segundo lobo aparece entre as árvores!";

    vidaLobo = 60;

    document.getElementById("nomeLobo").textContent = "Segundo Lobo";
    atualizarBatalha();
}

function finalizarCombate(vitoria) {
    document.querySelectorAll(".battle-actions button").forEach(botao => {
        botao.disabled = true;
    });

    const resultado = document.getElementById("resultadoBatalha");

    const botao = document.createElement("button");
    botao.textContent = vitoria ? "VOLTAR AO REINO" : "TENTAR NOVAMENTE";

    botao.onclick = () => {
        if (vitoria) {
            document.getElementById("historia").textContent =
                "Você salvou os viajantes e recebeu sua recompensa. Sua próxima aventura espera!";
            document.getElementById("iniciarBatalha").disabled = true;
            document.getElementById("iniciarBatalha").textContent =
                "MISSÃO CONCLUÍDA";
        } else {
            document.getElementById("iniciarBatalha").disabled = false;
            document.getElementById("iniciarBatalha").textContent =
                "TENTAR NOVAMENTE";
        }

        document.getElementById("arena").hidden = true;
        document.getElementById("historia").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    };

    resultado.appendChild(botao);
}