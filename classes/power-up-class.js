import { Coletavel } from "./coletavel-class.js";

export class PowerUp extends Coletavel{
    constructor({position}){
        super({
            position: position
        });
        this.radius = 10;
        this.color = 'green';
        this.oncollect = () => {
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