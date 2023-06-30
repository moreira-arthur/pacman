import { Coletavel } from "./coletavel-class.js";

export class Bolinha extends Coletavel{
    constructor({position}){
        super({
            position: position
        })
        this.radius = 3;
        this._color = 'white';
        this.oncollect = () => {
            mapa.BolCount--;
            // console.log(mapa.BolCount)
            addScore(10);
        }
    }
}