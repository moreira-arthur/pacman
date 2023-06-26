export class GameObject{
    constructor({position, ctx}){
        if(this.constructor === GameObject){
            throw new Error("Cannot initialize abstract class!");
        }
        this.position = position;
        this.ctx = ctx;
    }
    draw(){}
    update(){}
}