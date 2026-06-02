window.menu = {
    init() {
        const form = document.getElementById('config-form');
        const selectMode = document.getElementById('select-mode');
        const fieldP2 = document.getElementById('field-p2');
        const themeButtons = document.querySelectorAll('.theme-btn');

        selectMode.addEventListener('change', (e) => {
            if (e.target.value === 'pvp') fieldP2.classList.remove('hidden');
            else fieldP2.classList.add('hidden');
        });

        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                themeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                // La función de cambio de tema se añadirá después
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            window.gameState.mode = selectMode.value;
            window.gameState.difficulty = document.querySelector('input[name="difficulty"]:checked').value;
            window.gameState.player1Name = document.getElementById('input-p1').value.trim() || 'Jugador 1';
            window.gameState.player2Name = document.getElementById('input-p2').value.trim() || 'Jugador 2';
            // Se conectará con el tablero en commits siguientes
        });
    }
};
document.addEventListener('DOMContentLoaded', () => window.menu.init());