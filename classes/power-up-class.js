import { GameObject } from "./game-obj.js";

export class PowerUp extends GameObject{
    constructor({position}){
        super({
            position: position
        })
        this.radius = 10;
    }

    draw(){
        globalThis.ctx.beginPath();
        globalThis.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        globalThis.ctx.fillStyle = 'green';
        globalThis.ctx.fill();
        globalThis.ctx.closePath();
    }
    update(){

    }
}