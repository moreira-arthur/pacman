import { GameObject } from "./game-obj.js";

export class Bolinha extends GameObject{
    constructor({position, ctx}){
        super({
            position: position,
            ctx: ctx
        })
        this.radius = 3;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.closePath();
    }
}