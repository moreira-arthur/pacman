import { Coletavel } from "./coletavel-class.js";

export class Bolinha extends Coletavel{
    constructor({position}){
        super({
            position: position
        })
        this.radius = 3;
        this.color = 'white';
        this.oncollect = () => {
            mapa.BolCount--;
            console.log(mapa.BolCount)
            addScore(10);
        }
    }
}