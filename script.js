document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const gameArea = document.getElementById('gameArea');
    let positionX = 0;
    let positionY = 0;
    let movementInterval = null;
    const step = 10;

    // Variáveis para rastrear o estado das teclas de direção
    let keyState = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    };

    function movePlayer() {
        let newX = positionX;
        let newY = positionY;

        if (keyState.ArrowUp) {
            newY -= step;
        }
        if (keyState.ArrowDown) {
            newY += step;
        }
        if (keyState.ArrowLeft) {
            newX -= step;
        }
        if (keyState.ArrowRight) {
            newX += step;
        }

        // Verificar colisões ou limites do jogo
        if (newX >= 0 && newX <= gameArea.clientWidth - player.clientWidth) {
            positionX = newX;
        }
        if (newY >= 0 && newY <= gameArea.clientHeight - player.clientHeight) {
            positionY = newY;
        }

        player.style.top = positionY + 'px';
        player.style.left = positionX + 'px';
    }

    // Atualiza o estado da tecla no objeto keyState
    function updateKeyState(key, pressed) {
        if (keyState.hasOwnProperty(key)) {
            keyState[key] = pressed;
        }
    }

    // Eventos de tecla para controlar o movimento
    window.addEventListener('keydown', (event) => {
        const key = event.key;
        if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
            updateKeyState(key, true);
            if (movementInterval === null) {
                movementInterval = setInterval(movePlayer, 50);
            }
            event.preventDefault(); // Evita o comportamento padrão das setas no navegador
        }
    });

    window.addEventListener('keyup', (event) => {
        const key = event.key;
        if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
            updateKeyState(key, false);
            let keysPressed = Object.values(keyState).some((state) => state === true);
            if (!keysPressed) {
                clearInterval(movementInterval);
                movementInterval = null;
            }
            event.preventDefault(); // Evita o comportamento padrão das setas no navegador
        }
    });
});
