import { GameObject } from "./game-obj.js";
import { Coletavel } from "./coletavel-class.js";
import { circleCollidesWithCircle } from "../circle-collision.js";

export class PowerUp extends Coletavel{
    constructor({position}){
        super({
            position: position
        });
        this.radius = 10;
        this.color = 'green';
        this.oncollect = (index) => {
            mapa.coletaveis.splice(index, 1);
            fantasmas.forEach(fantasma => {
                fantasma.assutado = true;
                console.log(fantasma.assutado);

                setTimeout(()=>{
                    fantasma.assutado = false;
                    console.log(fantasma.assutado);
                },5000)
            })
        }

    }
}