export class UIManager{
    static #scoreEl = document.getElementById('scoreEl');
    static #resultadoEl = document.getElementById('Result');
    static #returnEl = document.getElementById('return');
    static #gameOverSound = new Audio('./res/sounds/gameOver.wav');
    static #gameWinSound = new Audio('./res/sounds/gameWin.wav');

    constructor(){
        UIManager.#returnEl.style.visibility = 'hidden';
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
}