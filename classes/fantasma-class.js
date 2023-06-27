import { GameObject } from "./game-obj.js";
import { circleCollidesWithRectangle } from "../circle-collision.js";

export class Fantasma extends GameObject{
    static initialSpeed = 2;
    constructor({position,velocity, color = 'red'}){
        super({
            position: position
        });
        this.velocity = velocity;
        this.color = color;
        this.radius = 15;
        
        this.colisoesprevias = [];
        this.speed = 2;
        this.assutado = false;
    }
    
    draw(){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.assutado ? 'blue' : this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(){
        this.draw();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        const colisoes = [];
        mapa.limites.forEach(limite =>{
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

        if(colisoes.length > this.colisoesprevias.length){
            this.colisoesprevias = colisoes 
        }

        if(JSON.stringify(colisoes) !== JSON.stringify(this.colisoesprevias)){
            if (this.velocity.x > 0 ){
                this.colisoesprevias.push('right')
            }else if (this.velocity.x < 0 ){
                this.colisoesprevias.push('left')
            }else if (this.velocity.y < 0 ){
                this.colisoesprevias.push('up')
            }else if (this.velocity.y > 0 ){
                this.colisoesprevias.push('down')
            }

            const caminhos = this.colisoesprevias.filter((colisao) => {
                return !colisoes.includes(colisao);
            })
            
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
            // reseta o registro de colisoes
            this.colisoesprevias = [];
        }
    }
}