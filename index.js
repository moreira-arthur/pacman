import { Mapa, Limite } from "./classes/mapa-class.js"
import { Jogador } from "./classes/jogador-class.js"
import { Fantasma } from "./classes/fantasma-class.js"
import { circleCollidesWithRectangle, circleCollidesWithCircle } from "./circle-collision.js"

// definindo a area de jogo
const canvas = document.querySelector('canvas');
globalThis.ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('scoreEl');
const resultado = document.getElementById('Result');


// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

//fazer função criar fantasma
globalThis.fantasmas = [
    new Fantasma({
        position:{
            x:Limite.width*6 + Limite.width/2,
            y:Limite.height + Limite.height/2
        },
        velocity: {
            x: Fantasma.speed,
            y:0
        }
    }),
    new Fantasma({
        position:{
            x:Limite.width*6 + Limite.width/2,
            y:Limite.height*3 + Limite.height/2
        },
        velocity: {
            x: Fantasma.speed,
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
            x: Fantasma.speed,
            y:0
        },
        color:'white'
    })
];

globalThis.player = new Jogador ({
    position: { 
        x:Limite.width + Limite.width/2,
        y:Limite.height + Limite.height/2
    },
    velocity:{
        x:0,
        y:0
    }
})

globalThis.score = 0;

globalThis.mapa = new Mapa();

let animacaoId;

// funcao que fica em looping infito fazendo com que o player se mova
function animacao(){
    animacaoId = requestAnimationFrame(animacao);

    ctx.clearRect(0,0,canvas.width, canvas.height);

    //detecta colisao entre fantasmas e o player
    for(let i = fantasmas.length - 1; i >= 0; i--){
        const fantasma = fantasmas[i];
        // faz com que o jogo se encerre ao perder
        if(circleCollidesWithCircle({
            circle1: fantasma,
            circle2: player
        })){
            if(fantasma.assutado){
                fantasmas.splice(i, 1);
            }else{
                cancelAnimationFrame(animacaoId);
                console.log("You Lose")
                resultado.innerHTML = "Você PERDEU, mais sorte na próxima vez =D !";
                resultado.style.color = 'red';
            }

        }
    }

    // condicao de ganhar fica aqui
    if(mapa.bolinhas.length ===  0){
        resultado.innerHTML = "Você Ganhou, PARABÉNS !!";
        resultado.style.color = 'green'; 
        console.log('You win');
        cancelAnimationFrame(animacaoId);
    }
    
    // Criação dos PowerUps
    mapa.powerUps.forEach((powerUp) => {
        powerUp.update();
    })

    mapa.bolinhas.forEach((bolinha) => {
        bolinha.draw();
        bolinha.update();
    })
    scoreEl.innerHTML = score;
    mapa.limites.forEach((limite) => {
        limite.draw();
    })

    player.update();

    fantasmas.forEach(fantasma => {
        fantasma.update()

        const colisoes = [];
        mapa.limites.forEach(limite =>{
            if( !colisoes.includes('right') && circleCollidesWithRectangle({
                circle: {...fantasma,velocity:{
                    x: fantasma.speed,
                    y: 0
                    }
                },
                rectangle: limite
            })
            ){
                colisoes.push('right')
            }
            if( !colisoes.includes('left') && circleCollidesWithRectangle({
                circle: {...fantasma,
                    velocity:{
                    x: -fantasma.speed,
                    y: 0
                    }
                },
                rectangle: limite
            })
            ){
                colisoes.push('left')
            }
            if( !colisoes.includes('up') && circleCollidesWithRectangle({
                circle: {...fantasma,
                    velocity:{
                    x: 0,
                    y: -fantasma.speed
                    }
                },
                rectangle: limite
            })
            ){
                colisoes.push('up')
            }
            if( !colisoes.includes('down') && circleCollidesWithRectangle({
                circle: {...fantasma,
                    velocity:{
                    x: 0,
                    y: fantasma.speed
                    }
                },
                rectangle: limite
            })
            ){
                colisoes.push('down')
            }
        })
        if(colisoes.length > fantasma.colisoesprevias.length){
            fantasma.colisoesprevias = colisoes 
        }
        if(JSON.stringify(colisoes) !== JSON.stringify(fantasma.colisoesprevias)){
            // console.log('gogo');

                if (fantasma.velocity.x > 0 ){
                    fantasma.colisoesprevias.push('right')
                }else if (fantasma.velocity.x < 0 ){
                    fantasma.colisoesprevias.push('left')
                }else if (fantasma.velocity.y < 0 ){
                    fantasma.colisoesprevias.push('up')
                }else if (fantasma.velocity.y > 0 ){
                    fantasma.colisoesprevias.push('down')
                }

                const caminhos = fantasma.colisoesprevias.filter((colisao) => {
                    return !colisoes.includes(colisao);
            })
            // console.log({caminhos})
    
            
            const direcao = caminhos[Math.floor(Math.random() *  caminhos.length)];
            // com base no registro de colisoes direciona o fantasma para se movimentar
            // console.log({direcao});

            switch(direcao){
                case 'down':
                    fantasma.velocity.y = fantasma.speed;
                    fantasma.velocity.x = 0;
                    break;

                case 'up':
                    fantasma.velocity.y = -fantasma.speed;
                    fantasma.velocity.x = 0;
                    break;

                case 'right':
                    fantasma.velocity.y = 0;
                    fantasma.velocity.x = fantasma.speed;
                    break;

                case 'left':
                    fantasma.velocity.y = 0;
                    fantasma.velocity.x = -fantasma.speed;
                    break;
            }
            // reseta o registro de colisoes
            fantasma.colisoesprevias = [];
        }
    })

} // final da animação


animacao()