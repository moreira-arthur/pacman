import { GameObject } from "./game-obj.js";
import { Coletavel } from "./coletavel-class.js";
import { circleCollidesWithCircle } from "../circle-collision.js";

export class Bolinha extends Coletavel{
    constructor({position}){
        super({
            position: position
        })
        this.radius = 3;
        this.color = 'white';
        this.oncollect = (index) => {
            mapa.coletaveis.splice(index, 1); // retira a bolinha ao passar em cima
            mapa.subBolCount();
            console.log(mapa.getBolCount)
            addScore(10);
        }
    }
}