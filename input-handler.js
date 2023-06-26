export let lastkey = '';
export const keys = {
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
export function setupInput(){
    window.addEventListener('keydown', ({ key }) => {
        switch(key){
            case 'w':
                keys.w.pressed = true;
                lastkey = 'w';
                break;
            case 'a':
                keys.a.pressed = true;
                lastkey = 'a';
                break;
            case 's':
                keys.s.pressed = true;
                lastkey = 's';
                break; 
            case 'd':
                keys.d.pressed = true;
                lastkey = 'd';
                break;                     
        }
    })
    window.addEventListener('keyup', ({ key }) => {
        switch(key){
            case 'w':
                keys.w.pressed = false;
                break;
            case 'a':
                keys.a.pressed = false;
                break;
            case 's':
                keys.s.pressed = false;
                break; 
            case 'd':
                keys.d.pressed = false;
                break;                     
        }
    
    })
}