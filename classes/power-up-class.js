export class PowerUp {
    constructor({position, ctx}){
        this.position = position;
        this.radius = 10;
        this.ctx = ctx;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
        this.ctx.closePath();
    }
}