import { Mapa, Limite } from "./classes/mapa-class.js"
import { Jogador } from "./classes/jogador-class.js"
import { Fantasma } from "./classes/fantasma-class.js"

// definindo a area de jogo
const canvas = document.querySelector('canvas');
globalThis.ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('scoreEl');
const resultado = document.getElementById('Result');

//fazer função criar fantasma
globalThis.fantasmas = [
    new Fantasma({
        position:{
            x:Limite.width*6 + Limite.width/2,
            y:Limite.height + Limite.height/2
        },
        velocity: {
            x: Fantasma.initialSpeed,
            y:0
        }
    }),
    new Fantasma({
        position:{
            x:Limite.width*6 + Limite.width/2,
            y:Limite.height*3 + Limite.height/2
        },
        velocity: {
            x: Fantasma.initialSpeed,
            y:0
        },
        color:'purple'
    }),
    new Fantasma({
        position:{
            x:Limite.width*6 + Limite.width/2,
            y:Limite.height*9 + Limite.height/2
        },
        velocity: {
            x: Fantasma.initialSpeed,
            y:0
        },
        color:'white'
    })
];

globalThis.player = new Jogador ({
    position: { 
        x:Limite.width + Limite.width/2,
        y:Limite.height + Limite.height/2
    }
})

let score = 0;
globalThis.addScore = (value) => {
    score += value;
    scoreEl.innerHTML = score;
}

globalThis.mapa = new Mapa();

globalThis.onLose = () => {
    cancelAnimationFrame(animacaoId);
    console.log("You Lose");
    resultado.innerHTML = "Você PERDEU, mais sorte na próxima vez =D !";
    resultado.style.color = 'red';
}

let animacaoId;

// funcao que fica em looping infito fazendo com que o player se mova
function animacao(){
    animacaoId = requestAnimationFrame(animacao);

    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    if(mapa.getBolCount ===  0){
        resultado.innerHTML = "Você Ganhou, PARABÉNS !!";
        resultado.style.color = 'green'; 
        console.log('You win');
        cancelAnimationFrame(animacaoId);
    }
    
    mapa.update();

    player.update();

    fantasmas.forEach(fantasma => {
        fantasma.update();
    })
} // final da animação


animacao()