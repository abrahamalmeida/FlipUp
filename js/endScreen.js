window.endScreen = {
    init() {
        document.getElementById('btn-replay').addEventListener('click', () => {
            this.hide();
            window.modes.setupModeRules();
            window.board.generate();
            window.board.startPeek();
        });

        document.getElementById('btn-home').addEventListener('click', () => {
            window.menu.switchScreenToMenu();
        });
    },

    show() {
        const state = window.gameState;
        window.timer.clearInterval();
        window.achievements.checkAtEnd();

        const totalAttempts = state.movesCount;
        const accuracy = totalAttempts > 0 ? Math.round((state.pairsFound / totalAttempts) * 100) : 0;

        document.getElementById('end-stat-moves').innerText = totalAttempts;
        document.getElementById('end-stat-accuracy').innerText = `${accuracy}%`;

        const boxTime = document.getElementById('end-box-time');
        if (state.mode === 'solitario' || state.mode === 'contrareloj') {
            boxTime.classList.remove('hidden');
            if (state.mode === 'contrareloj' && state.timedOut) {
                document.getElementById('end-title').innerText = '💥 ¡Se agotó el tiempo!';
                document.getElementById('end-subtitle').innerText = 'No lograste completar el tablero a tiempo.';
                document.getElementById('end-label-time').innerText = 'Tiempo agotado';
                document.getElementById('end-stat-time').innerText = '00:00';
            } else if (state.mode === 'solitario') {
                document.getElementById('end-title').innerText = '¡Felicidades, Victoria!';
                document.getElementById('end-subtitle').innerText = `${state.player1Name} completó el tablero.`;
                document.getElementById('end-label-time').innerText = 'Tiempo';
                document.getElementById('end-stat-time').innerText = window.timer.formatTime(state.timeSeconds);
            } else {
                document.getElementById('end-title').innerText = '¡Felicidades, Victoria!';
                document.getElementById('end-subtitle').innerText = `${state.player1Name} completó el tablero.`;
                document.getElementById('end-label-time').innerText = 'Tiempo restante';
                document.getElementById('end-stat-time').innerText = window.timer.formatTime(state.timeSeconds);
            }
        } else if (state.mode === 'pvp') {
            boxTime.classList.add('hidden');
            document.getElementById('end-title').innerText = 'Fin de la Partida';
            if (state.p1Pairs > state.p2Pairs) {
                document.getElementById('end-subtitle').innerText = `🏆 ¡Ganador: ${state.player1Name}! (${state.p1Pairs} vs ${state.p2Pairs})`;
            } else if (state.p2Pairs > state.p1Pairs) {
                document.getElementById('end-subtitle').innerText = `🏆 ¡Ganador: ${state.player2Name}! (${state.p2Pairs} vs ${state.p1Pairs})`;
            } else {
                document.getElementById('end-subtitle').innerText = `🤝 ¡Empate técnico! (${state.p1Pairs} pares).`;
            }
        } else {
            boxTime.classList.add('hidden');
            document.getElementById('end-title').innerText = 'Práctica Finalizada';
            document.getElementById('end-subtitle').innerText = 'Buen entrenamiento para tu memoria.';
        }

        const badgesContainer = document.getElementById('end-achievements-container');
        badgesContainer.innerHTML = '';
        if (state.unlockedAchievements.size === 0) {
            badgesContainer.innerHTML = '<span style="color:var(--text-muted); font-size:0.9rem;">Ningún logro obtenido en esta ronda.</span>';
        } else {
            state.unlockedAchievements.forEach(id => {
                const ach = window.achievements.registry[id];
                const span = document.createElement('span');
                span.className = 'badge-pill';
                span.innerText = `${ach.icon} ${ach.title}`;
                badgesContainer.appendChild(span);
            });
        }

        document.getElementById('screen-end').classList.remove('hidden');
    },

    hide() {
        document.getElementById('screen-end').classList.add('hidden');
    }
};