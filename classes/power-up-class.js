import { Coletavel } from "./coletavel-class.js";

export class PowerUp extends Coletavel{
    static #powerdotSound = new Audio('../res/sounds/power_dot.wav');
    constructor({position}){
        super({
            position: position
        });
        this.radius = 10;
        this._color = 'green';
        this.oncollect = () => {
            PowerUp.#powerdotSound.muted = false;
            PowerUp.#powerdotSound.loop = true;
            PowerUp.#powerdotSound.play();
            fantasmas.forEach(fantasma => {
                fantasma.Assustado = true;
                console.log(true);

                setTimeout(()=>{
                    fantasma.Assustado = false;
                    console.log(false);
                },10000)
            })
            setTimeout(() => { PowerUp.#powerdotSound.muted = true; PowerUp.#powerdotSound.loop = false; }, 10000);
        }

    }
}