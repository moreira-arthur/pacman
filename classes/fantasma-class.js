import { GameObject } from "./game-obj.js";
import { circleCollidesWithRectangle, circleCollidesWithCircle } from "../circle-collision.js";

export class Fantasma extends GameObject{
    static #initialSpeed = 2;
    #colisoesprevias;
    #assustado;
    #timerBonus;
    set Assustado(value){
        this.#assustado = value;
        if(value) this.#timerBonus = 300;
    }

    constructor({position,velocity, color = 'red'}){
        super({
            position: position
        });
        this.velocity = velocity;
        this.color = color;
        this.radius = 15;
        
        this.#colisoesprevias = [];
        this.speed = Fantasma.#initialSpeed;
        this.#assustado = false;
    }
    
    draw(){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.#assustado ? 'blue' : this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(){
        this.draw();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.#playerCollision();

        let colisoes = this.#getCollisions();

        if(colisoes.length > this.#colisoesprevias.length){
            this.#colisoesprevias = colisoes;
        }

        if(JSON.stringify(colisoes) !== JSON.stringify(this.#colisoesprevias)){
            if (this.velocity.x > 0 ){
                this.#colisoesprevias.push('right')
            }else if (this.velocity.x < 0 ){
                this.#colisoesprevias.push('left')
            }else if (this.velocity.y < 0 ){
                this.#colisoesprevias.push('up')
            }else if (this.velocity.y > 0 ){
                this.#colisoesprevias.push('down')
            }

            const caminhos = this.#colisoesprevias.filter((colisao) => {
                return !colisoes.includes(colisao);
            })
            
            this.#setRandomDirection(caminhos);

            // reseta o registro de colisoes
            this.#colisoesprevias = [];
        }
        if(this.#assustado){
            this.#timerBonus--;
        }
    }

    #playerCollision(){
        if(circleCollidesWithCircle({
            circle1: this,
            circle2: player
        })){
            if(this.#assustado){
                for (let index = fantasmas.length-1; index >= 0; index--) {
                    if(fantasmas[index] === this){
                        fantasmas.splice(index, 1);
                        addScore(Math.floor(.5 * this.#timerBonus));
                        break;
                    }
                }
                
            }else{
                onLose();
            }
        }
    }

    #getCollisions(){
        let colisoes = [];
        mapa.Limites.forEach(limite =>{
            if( !colisoes.includes('right') && circleCollidesWithRectangle({
                circle: {...this,velocity:{
                    x: this.speed,
                    y: 0
                    }
                },
                rectangle: limite
            })
            ){
                colisoes.push('right')
            }
            if( !colisoes.includes('left') && circleCollidesWithRectangle({
                circle: {...this,velocity:{
                    x: -this.speed,
                    y: 0
                    }
                },
                rectangle: limite
            })
            ){
                colisoes.push('left')
            }
            if( !colisoes.includes('up') && circleCollidesWithRectangle({
                circle: {...this,velocity:{
                    x: 0,
                    y: -this.speed
                    }
                },
                rectangle: limite
            })
            ){
                colisoes.push('up')
            }
            if( !colisoes.includes('down') && circleCollidesWithRectangle({
                circle: {...this,velocity:{
                    x: 0,
                    y: this.speed
                    }
                },
                rectangle: limite
            })
            ){
                colisoes.push('down')
            }
        })
        return colisoes;
    }

    #setRandomDirection(caminhos){
        const direcao = caminhos[Math.floor(Math.random() *  caminhos.length)];
        // com base no registro de colisoes direciona o this para se movimentar
        // console.log({direcao});

        switch(direcao){
            case 'down':
                this.velocity.y = this.speed;
                this.velocity.x = 0;
                break;
            case 'up':
                this.velocity.y = -this.speed;
                this.velocity.x = 0;
                break;
            case 'right':
                this.velocity.y = 0;
                this.velocity.x = this.speed;
                break;
            case 'left':
                this.velocity.y = 0;
                this.velocity.x = -this.speed;
                break;
        }
    }
}