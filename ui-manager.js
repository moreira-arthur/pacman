export class UIManager{
    static #scoreEl = document.getElementById('scoreEl');
    static #resultadoEl = document.getElementById('Result');
    static #returnEl = document.getElementById('return');
    static #gameOverSound = new Audio('./res/sounds/gameOver.wav');
    static #gameWinSound = new Audio('./res/sounds/gameWin.wav');

    #tempUI = [];
    constructor(){
        UIManager.#returnEl.style.visibility = 'hidden';
        this.#tempUI = [];
    }

    drawTemp(){
        ctx.font = "20px klein";
        ctx.fillStyle = "blue";
        ctx.textAlign = 'center';
        this.#tempUI.forEach((temp) => {
            ctx.fillText(temp.points.toString(), temp.position.x, temp.position.y);
        });
    }

    updateScore(newScore){
        UIManager.#scoreEl.innerText = newScore;
    }

    updateLives(newLiveCount){
        // Diminuir a quantidade de vidas
    }

    lose(){
        UIManager.#resultadoEl.innerText = "Você PERDEU, mais sorte na próxima vez =D !";
        UIManager.#resultadoEl.style.color = 'red';
        UIManager.#gameOverSound.play();
        UIManager.#returnEl.style.visibility = 'visible';
    }

    win(){
        UIManager.#resultadoEl.innerText = "Você Ganhou, PARABÉNS !!";
        UIManager.#resultadoEl.style.color = 'green';
        UIManager.#gameWinSound.play();
        UIManager.#returnEl.style.visibility = 'visible';
    }

    displayPoints(position, points, duration){
        this.#tempUI.push({
            position: position,
            points: points
        });
        setTimeout(() => {
            for(let i = this.#tempUI.length-1; i >= 0; i--){
                console.log(this.#tempUI[i]);
                if(this.#tempUI[i].position == position){
                    this.#tempUI.splice(i, 1);
                    break;
                }
            }
        }, 500);
    }
}