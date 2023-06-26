export class GameObject{
    constructor({position}){
        if(this.constructor === GameObject){
            throw new Error("Cannot initialize abstract class!");
        }
        this.position = position;
    }
    draw(){}
    update(){}
}