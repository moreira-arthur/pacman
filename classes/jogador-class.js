import { InputHandler } from "../input-handler.js";
import { GameObject } from "./game-obj.js"
import { circleCollidesWithRectangle , circleCollidesWithCircle } from "../circle-collision.js"

// classe que define o pacman
export class Jogador extends GameObject{
    static #initialSpeed = 4;
    static #initialOpenRate = Jogador.#initialSpeed/32;
    #speed;
    #openRate;
    #radians;
    #rotation;
    #inputHandler;

    get Speed(){
        return this.#speed;
    }

    set Speed(val){
        this.#speed = val;
        this.#openRate = val/32;
    }

    constructor({position,velocity = {x:0,y:0}}){
        super({
            position: position
        });
        this.velocity = velocity;
        this.#speed = Jogador.#initialSpeed;
        this.#openRate = Jogador.#initialOpenRate;
        this.radius = 15;
        this.#radians = 0.75;
        this.#rotation = 0;
        this.#inputHandler = new InputHandler();
    }
    
    draw(){
        ctx.save();
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.#rotation);
        ctx.translate(-this.position.x, -this.position.y)
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, this.#radians , Math.PI*2 - this.#radians);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath()
        ctx.restore();
    }

    update(){
        this.draw();
        this.#mouthAnim();

        this.#setVel();
        this.#edgeCollision();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.#rotate();
    }

    #mouthAnim(){
        if( this.#radians < 0 || this.#radians > .75) this.#openRate = -this.#openRate;
        this.#radians += this.#openRate;
    }

    #setVel(){
        // fazendo com que o player se movimente suavemente, e com colisão aos limites
        let newVel = {
            x: this.velocity.x,
            y: this.velocity.y
        }

        if (this.#inputHandler.keys.w.pressed && this.#inputHandler.lastkey === 'w'){
            newVel.y = -this.#speed;
            newVel.x = 0;
        } else if (this.#inputHandler.keys.s.pressed && this.#inputHandler.lastkey === 's'){
            newVel.y = this.#speed;
            newVel.x = 0;
        } else if (this.#inputHandler.keys.d.pressed && this.#inputHandler.lastkey === 'd'){
            newVel.x = this.#speed;
            newVel.y = 0;
        } else if (this.#inputHandler.keys.a.pressed && this.#inputHandler.lastkey === 'a'){
            newVel.x = -this.#speed;
            newVel.y = 0;   
        } else return;

        for(let i = 0; i < mapa.Limites.length; i++){
            const limite = mapa.Limites[i];
            if(circleCollidesWithRectangle({
                circle: {...this,velocity:newVel},
                rectangle: limite
            })){
                return;
            }
        }
        this.velocity = newVel;
    }

    #edgeCollision(){
        mapa.Limites.forEach((limite) => {
            if(circleCollidesWithRectangle({
                circle: this,
                rectangle: limite
            })
            ){
                this.velocity.y=0;
                this.velocity.x=0;
            }
        })
    }

    #rotate(){
        if(this.velocity.x > 0) this.#rotation = 0;
        else if(this.velocity.x < 0) this.#rotation = Math.PI;
        else if(this.velocity.y > 0) this.#rotation = Math.PI/2;
        else if(this.velocity.y < 0) this.#rotation = Math.PI*1.5;
    }
}