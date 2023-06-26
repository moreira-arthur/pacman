import { GameObject } from "./game-obj.js";
import { circleCollidesWithCircle } from "../circle-collision.js";

export class Bolinha extends GameObject{
    constructor({position}){
        super({
            position: position
        })
        this.radius = 3;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
    update(){
        this.draw();
        if(circleCollidesWithCircle({
            circle1: this,
            circle2: player
        })){
            // console.log("Tocando");
            let index = mapa.bolinhas.indexOf(this);
            mapa.bolinhas.splice(index, 1); // retira a bolinha ao passar em cima
            console.log(mapa.bolinhas.length)
            changeScore(10);
        }
    }
}