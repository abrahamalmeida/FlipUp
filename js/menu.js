window.menu = {
    init() {
        const form = document.getElementById('config-form');
        const selectMode = document.getElementById('select-mode');
        const fieldP2 = document.getElementById('field-p2');
        const themeButtons = document.querySelectorAll('.theme-btn');
        const logoUp = document.querySelector('.logo-text span');

        selectMode.addEventListener('change', (e) => {
            window.audioFX.playMenuClick();
            if (e.target.value === 'pvp') {
                fieldP2.classList.remove('hidden');
            } else {
                fieldP2.classList.add('hidden');
            }
        });

        document.querySelectorAll('.radio-card').forEach(card => {
            card.addEventListener('click', () => {
                window.audioFX.playMenuClick();
            });
        });

        themeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                window.audioFX.playMenuClick();
                themeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const selectedTheme = btn.getAttribute('data-theme');
                window.themes.applyTheme(selectedTheme);

                if (logoUp) {
                    logoUp.classList.remove('bounce');
                    void logoUp.offsetWidth;
                    logoUp.classList.add('bounce');
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            window.audioFX.playMenuClick();

            window.gameState.mode = selectMode.value;
            window.gameState.difficulty = document.querySelector('input[name="difficulty"]:checked').value;
            window.gameState.player1Name = document.getElementById('input-p1').value.trim() || 'Jugador 1';
            window.gameState.player2Name = document.getElementById('input-p2').value.trim() || 'Jugador 2';

            this.switchScreenToGame();
            window.modes.setupModeRules();
            window.board.generate();
            window.board.startPeek();
        });
    },

    switchScreenToGame() {
        document.getElementById('screen-menu').classList.add('hidden');
        document.getElementById('screen-game').classList.remove('hidden');
    },

    switchScreenToMenu() {
        document.getElementById('screen-game').classList.add('hidden');
        document.getElementById('screen-menu').classList.remove('hidden');
        window.endScreen.hide();
    }
};