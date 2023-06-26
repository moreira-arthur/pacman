import { GameObject } from "./game-obj.js";

export class Fantasma extends GameObject{
    static speed = 2;
    constructor({position,ctx,velocity, color = 'red'}){
        super({
            position: position,
            ctx: ctx
        });
        this.velocity = velocity;
        this.radius = 15;
        this.color = color;
        this.colisoesprevias = [];
        this.speed = 2;
        this.assutado = false;
    }
    
    drawg(){
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        this.ctx.fillStyle = this.assutado ? 'blue' : this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    update(){
        this.drawg();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}