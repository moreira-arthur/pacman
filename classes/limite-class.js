// classe limite: define as bordas do mapa;

export class Limite{
    static width = 40;
    static height = 40;
    constructor({position, image, ctx}){
        this.position = position;
        this.width = 40;
        this.height = 40;
        this.image = image;
        this.ctx = ctx;
    }

    draw() {
        // ctx.fillStyle = 'blue';
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.ctx.drawImage(this.image,this.position.x, this.position.y)
    }
}