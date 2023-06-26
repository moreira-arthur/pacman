// classe que define o pacman
export class Jogador {
    static speed = 2.5;
    constructor({position,velocity,ctx}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.radians = 0.75; 
        this.openRate = 0.12;
        this.rotate = 0;
        this.ctx = ctx;
    }
    
    drawp(){
        this.ctx.save();
        this.ctx.translate(this.position.x, this.position.y)
        this.ctx.rotate(this.rotate);
        this.ctx.translate(-this.position.x, -this.position.y)
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, this.radians , Math.PI*2 - this.radians);
        this.ctx.lineTo(this.position.x, this.position.y);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();
        this.ctx.closePath()
        this.ctx.restore();
    }
    update(){
        this.drawp();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if( this.radians < 0 || this.radians > .75) this.openRate = -this.openRate;
        this.radians += this.openRate;
    }
}