import { GameObject } from "./game-obj.js";
import { circleCollidesWithCircle } from "../circle-collision.js";

export class PowerUp extends GameObject{
    constructor({position}){
        super({
            position: position
        })
        this.radius = 10;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
    }
    update(){
        if(circleCollidesWithCircle({
            circle1: this,
            circle2: player
        })){
            mapa.powerUps.splice(mapa.powerUps.indexOf(this), 1); // retira a powerUp ao passar em cima
            
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
}