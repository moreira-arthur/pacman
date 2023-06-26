import { GameObject } from "./game-obj.js"
// classe que define o pacman
export class Jogador extends GameObject{
    static speed = 2.5;
    static #openRate = 0.12
    #radians
    // #openRate
    #rotation
    constructor({position,ctx,velocity}){
        super({
            position: position,
            ctx: ctx
        });
        this.velocity = velocity;
        this.radius = 15;
        this.#radians = 0.75; 
        // this.#openRate = 0.12;
        this.#rotation = 0;
    }
    
    draw(){
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y)
        this.ctx.rotate(this.#rotation);
        this.ctx.translate(-this.position.x, -this.position.y)
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, this.#radians , Math.PI*2 - this.#radians);
        this.ctx.lineTo(this.position.x, this.position.y);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();
        this.ctx.closePath()
        this.ctx.restore();
    }

    update(){
        this.draw();
        this.#mouthAnim();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.#rotate();
    }

    #mouthAnim(){
        if( this.#radians < 0 || this.#radians > .75) Jogador.#openRate = -Jogador.#openRate;
        this.#radians += Jogador.#openRate;
    }

    #rotate(){
        if(this.velocity.x > 0) this.#rotation = 0;
        else if(this.velocity.x < 0) this.#rotation = Math.PI;
        else if(this.velocity.y > 0) this.#rotation = Math.PI/2;
        else if(this.velocity.y < 0) this.#rotation = Math.PI*1.5;
    }
}