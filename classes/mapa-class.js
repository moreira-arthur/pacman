import { GameObject } from "./game-obj.js";
import { Bolinha } from "./bolinha-class.js";
import { PowerUp } from "./power-up-class.js";

function criarImagem(src){
    const image = new Image();
    image.src = src;
    return image;
}

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
        ctx.drawImage(this.image,this.position.x, this.position.y)
    }
    update(){

    }
}

export class Mapa{
    limites = [];
    bolinhas = [];
    powerUps = [];

    #form = [
        ['c1', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'c2'],
        ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
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
        '-': './img/pipeHorizontal.png',
        '|': './img/pipeVertical.png',
        'c1': './img/pipeCorner1.png',
        'c2': './img/pipeCorner2.png',
        'c3': './img/pipeCorner3.png',
        'c4': './img/pipeCorner4.png',
        'blk': './img/block.png',
        '[': './img/capLeft.png',
        ']': './img/capRight.png',
        '_': './img/capBottom.png',
        '^': './img/capTop.png',
        '+': './img/pipeCross.png',
        '5': './img/pipeConnectorTop.png',
        '6': './img/pipeConnectorRight.png',
        '7': './img/pipeConnectorBottom.png',
        '8': './img/pipeConnectorLeft.png'
    }

    constructor(){
        this.#form.forEach((row,i) =>{
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
                        this.limites.push(new Limite({
                            position: {x: j * Limite.width,y: i * Limite.height},
                            image: criarImagem(this.#paths[simbolo])
                        }));
                        break;
                    case '.':
                        this.bolinhas.push(new Bolinha({
                            position: {
                                x: j * Limite.width + Limite.width / 2,
                                y: i * Limite.height + Limite.height / 2
                            }
                        }))
                        break;
                    case 'p':
                        this.powerUps.push(new PowerUp({
                            position: {
                                x: j * Limite.width + Limite.width / 2,
                                y: i * Limite.height + Limite.height / 2
                            }
                        }))
                        break;
                }
            })
        })
    }
    update(){
        this.limites.forEach((limite) => {
            limite.draw();
            limite.update();
        });
        this.powerUps.forEach((powerUp) => {
            powerUp.draw();
            powerUp.update();
        });
        this.bolinhas.forEach((bolinha) => {
            bolinha.draw();
            bolinha.update();
        });
    }
}