
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