// import { Limite } from "./classes/limite-class.js"
import { Mapa, Limite } from "./mapa.js"
import { Jogador } from "./classes/jogador-class.js"
import { Fantasma } from "./classes/fantasma-class.js"
import { InputHandler } from "./input-handler.js"
import circleCollidesWithRectangle from "./circle-collision.js"

// definindo a area de jogo
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('scoreEl');
const resultado = document.getElementById('Result');


// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

//fazer função criar fantasma
const fantasmas = [
    new Fantasma({
        position:{
            x:Limite.width*6 + Limite.width/2,
            y:Limite.height + Limite.height/2
        },
        velocity: {
            x: Fantasma.speed,
            y:0
        },
        ctx: ctx
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
        color:'purple',
        ctx: ctx
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
        color:'white',
        ctx: ctx
    })
];
const player = new Jogador ({
    position: { 
        x:Limite.width + Limite.width/2,
        y:Limite.height + Limite.height/2
    },
    ctx: ctx,
    velocity:{
        x:0,
        y:0
    }
})

let score = 0;

let mapa = new Mapa({
    ctx: ctx
});

let animacaoId;

let inputHandler = new InputHandler();
// funcao que fica em looping infito fazendo com que o player se mova

function animacao(){
    animacaoId = requestAnimationFrame(animacao);

    ctx.clearRect(0,0,canvas.width, canvas.height);

    // fazendo com que o player se movimente suavemente, e com colisão aos limites
    if (inputHandler.keys.w.pressed && inputHandler.lastkey === 'w'){
        for(let i = 0; i < mapa.limites.length; i++){
            const limite = mapa.limites[i];
            if(circleCollidesWithRectangle({
                circle: {...player,velocity:{
                    x: 0,
                    y: -5
                }},
                rectangle: limite
            })){
                player.velocity.y = 0;
                break;
            }else{
                player.velocity.y = -5;
            }
        }
    } else if (inputHandler.keys.a.pressed && inputHandler.lastkey === 'a'){
        for(let i = 0; i < mapa.limites.length; i++){
            const limite = mapa.limites[i];
            if(circleCollidesWithRectangle({
                circle: {...player,velocity:{
                    x: -5,
                    y: 0
                }},
                rectangle: limite
            })){
                player.velocity.x = 0;
                break;
            }else{
                player.velocity.x = -5;
            }
        }
    } else if (inputHandler.keys.s.pressed && inputHandler.lastkey === 's'){
        for(let i = 0; i < mapa.limites.length; i++){
            const limite = mapa.limites[i];
            if(circleCollidesWithRectangle({
                circle: {...player,velocity:{
                    x: 0,
                    y: 5
                }},
                rectangle: limite
            })){
                player.velocity.y = 0;
                break;
            }else{
                player.velocity.y = 5;
            }
        }
    } else if (inputHandler.keys.d.pressed && inputHandler.lastkey === 'd'){
        for(let i = 0; i < mapa.limites.length; i++){
            const limite = mapa.limites[i];
            if(circleCollidesWithRectangle({
                circle: {...player,velocity:{
                    x: 5,
                    y: 0
                }},
                rectangle: limite
            })){
                player.velocity.x = 0;
                break;
            }else{
                player.velocity.x = 5;
            }
        }
    }
    //detecta colisao entre fantasmas e o player
    for(let i = fantasmas.length - 1; i >= 0; i--){
        const fantasma = fantasmas[i];
        // faz com que o jogo se encerre ao perder
        if(Math.hypot(fantasma.position.x - player.position.x, fantasma.position.y - player.position.y) < fantasma.radius + player.radius){
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
    if(mapa.bolinhas.length ===  1){
        resultado.innerHTML = "Você Ganhou, PARABÉNS !!";
        resultado.style.color = 'green'; 
        console.log('You win');
        cancelAnimationFrame(animacaoId);
    }
    
    // Criação dos PowerUps
    for(let i = mapa.powerUps.length - 1; i >= 0; i--){
        const powerUp = mapa.powerUps[i];
        powerUp.draw();
        // player coleta o powerup
        if(Math.hypot(powerUp.position.x - player.position.x, powerUp.position.y - player.position.y) < powerUp.radius + player.radius){
            mapa.powerUps.splice(i, 1); // retira a powerUp ao passar em cima
            
             //fazer os fantasmas ficarem assustados
            fantasmas.forEach(fantasma => {
                fantasma.assutado = true;
                console.log(fantasma.assutado);

                setTimeout(()=>{
                    fantasma.assutado = false;
                    console.log(fantasma.assutado);
                },5000)
            })
        }
    }
    //toca as bolinhas aqui
    for(let i = mapa.bolinhas.length - 1; i > 0; i--){
        const bolinha = mapa.bolinhas[i];
        bolinha.draw();

        if(Math.hypot(bolinha.position.x - player.position.x, bolinha.position.y - player.position.y) < bolinha.radius + player.radius){
            // console.log("Tocando");
            mapa.bolinhas.splice(i, 1); // retira a bolinha ao passar em cima
            console.log(mapa.bolinhas.length)
            score = score + 10;
            scoreEl.innerHTML = score;
        }
    }

    mapa.limites.forEach((limite) => {
        limite.draw()
        // detecta a colisão do player com o limite
        if(circleCollidesWithRectangle({
            circle: player,
            rectangle: limite
        })
        ){
            // console.log('oi')
            player.velocity.y=0;
            player.velocity.x=0;
        }
    })
    
    player.update();
    // player.velocity.y=0;
    // player.velocity.x=0;

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
        // console.log(colisoes)
    })

} // final da animação


animacao()