import { GameObject } from "./game-obj.js";
import { circleCollidesWithCircle } from "../circle-collision.js";

export class Coletavel extends GameObject {
    radius;
    color;
    oncollect = (index) => {};

    constructor({position}){
        super({
            position: position
        });
        if(this.constructor === Coletavel){
            throw new Error("Cannot initialize abstract class!");
        }
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(index){
        this.draw();
        if(circleCollidesWithCircle({
            circle1: this,
            circle2: player
        })){
            this.oncollect(index);
        }
    }
}