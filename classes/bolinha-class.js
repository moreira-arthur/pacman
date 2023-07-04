import { Coletavel } from "./coletavel-class.js";

export class Bolinha extends Coletavel{
    static #wakaSound = new Audio('../res/sounds/waka.wav');
    constructor({position}){
        super({
            position: position
        })
        this.radius = 3;
        this._color = 'white';
        this.oncollect = () => {
            mapa.bolinhaCount--;
            let cloneWaka = Bolinha.#wakaSound.cloneNode();
            cloneWaka.play();
            addScore(10);
        }
    }
}