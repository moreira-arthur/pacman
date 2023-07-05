import { GameObject } from "./game-obj.js";
import { Bolinha } from "./bolinha-class.js";
import { PowerUp } from "./power-up-class.js";
import { criarImagem } from "../criar-imagem.js";

export class Limite extends GameObject{
    static width = 40;
    static height = 40;
    constructor({position, image}){
        super({
            position: position
        })
        this.width = 40;
        this.height = 40;
        this.image = image;
    }

    draw() {
        ctx.drawImage(this.image,this.position.x, this.position.y);
    }
    update(){

    }
}

export class Mapa{
    #limites = [];
    get Limites(){
        return this.#limites;
    }

    #coletaveis = [];
    bolinhaCount;

    #initialMap = [
        ['c1', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'c2'],
        ['|', ' ', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
        ['|', '.', 'blk', '.', '[', '7', ']', '.', 'blk', '.', '|'],
        ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
        ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
        ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
        ['|', '.', 'blk', '.', '[', '+', ']', '.', 'blk', '.', '|'],
        ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
        ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
        ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
        ['|', '.', 'blk', '.', '[', '5', ']', '.', 'blk', '.', '|'],
        ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
        ['c4', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'c3']
    ];

    #paths = {
        '-': './res/img/pipeHorizontal.png',
        '|': './res/img/pipeVertical.png',
        'c1': './res/img/pipeCorner1.png',
        'c2': './res/img/pipeCorner2.png',
        'c3': './res/img/pipeCorner3.png',
        'c4': './res/img/pipeCorner4.png',
        'blk': './res/img/block.png',
        '[': './res/img/capLeft.png',
        ']': './res/img/capRight.png',
        '_': './res/img/capBottom.png',
        '^': './res/img/capTop.png',
        '+': './res/img/pipeCross.png',
        '5': './res/img/pipeConnectorTop.png',
        '6': './res/img/pipeConnectorRight.png',
        '7': './res/img/pipeConnectorBottom.png',
        '8': './res/img/pipeConnectorLeft.png'
    }

    constructor(){
        this.bolinhaCount = 0;
        this.#initialMap.forEach((row,i) =>{
            row.forEach((simbolo,j) =>{
                switch(simbolo){
                    case '-':
                    case '|':
                    case 'c1':
                    case 'c2':
                    case 'c3':
                    case 'c4':
                    case 'blk':
                    case '[':
                    case ']':
                    case '_':
                    case '^':
                    case '+':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                        this.#limites.push(new Limite({
                            position: {x: j * Limite.width,y: i * Limite.height},
                            image: criarImagem(this.#paths[simbolo])
                        }));
                        break;
                    case '.':
                        this.#coletaveis.push(new Bolinha({
                            position: {
                                x: j * Limite.width + Limite.width / 2,
                                y: i * Limite.height + Limite.height / 2
                            }
                        }));
                        this.bolinhaCount++;
                        break;
                    case 'p':
                        this.#coletaveis.push(new PowerUp({
                            position: {
                                x: j * Limite.width + Limite.width / 2,
                                y: i * Limite.height + Limite.height / 2
                            }
                        }))
                        break;
                }
            })
        })
        console.log("Finished loading");
    }
    
    update(){
        this.#limites.forEach((limite) => {
            limite.draw();
        });
        for(let i = this.#coletaveis.length - 1; i >= 0; i--){
            const coletavel = this.#coletaveis[i];
            coletavel.update(i);
        }
    }

    removeCollectableOnList(index){
        this.#coletaveis.splice(index, 1);
    }
}