export class UIManager{
    static #scoreEl = document.getElementById('scoreEl');
    static #resultadoEl = document.getElementById('Result');

    updateScore(newScore){
        UIManager.#scoreEl.innerText = newScore;
    }

    updateLives(newLiveCount){
        // Diminuir a quantidade de vidas
    }

    lose(){
        UIManager.#resultadoEl.innerText = "Você PERDEU, mais sorte na próxima vez =D !";
        UIManager.#resultadoEl.style.color = 'red';
    }

    win(){
        UIManager.#resultadoEl.innerText = "Você Ganhou, PARABÉNS !!";
        UIManager.#resultadoEl.style.color = 'green';
    }
}