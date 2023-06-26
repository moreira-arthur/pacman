export class InputHandler{
    lastkey = '';
    keys = {
        w: { 
            pressed: false
        },
        a: { 
            pressed: false
        },
        s: { 
            pressed: false
        },
        d: { 
            pressed: false
        }
    }
    constructor(){
        window.addEventListener('keydown', ({ key }) => {
            switch(key){
                case 'w':
                    this.keys.w.pressed = true;
                    this.lastkey = 'w';
                    break;
                case 'a':
                    this.keys.a.pressed = true;
                    this.lastkey = 'a';
                    break;
                case 's':
                    this.keys.s.pressed = true;
                    this.lastkey = 's';
                    break; 
                case 'd':
                    this.keys.d.pressed = true;
                    this.lastkey = 'd';
                    break;                     
            }
        })
        window.addEventListener('keyup', ({ key }) => {
            switch(key){
                case 'w':
                    this.keys.w.pressed = false;
                    break;
                case 'a':
                    this.keys.a.pressed = false;
                    break;
                case 's':
                    this.keys.s.pressed = false;
                    break; 
                case 'd':
                    this.keys.d.pressed = false;
                    break;                     
            }
        
        })
    }
}