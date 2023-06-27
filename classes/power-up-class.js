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
                fantasma.Assustado = true;
                console.log(true);

                setTimeout(()=>{
                    fantasma.Assustado = false;
                    console.log(false);
                },5000)
            })
        }

    }
}