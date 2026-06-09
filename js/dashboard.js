window.dashboard = {
    updateCounters() {
        document.getElementById('dash-moves').innerText = window.gameState.movesCount;
        document.getElementById('dash-score-p1').innerText = `Pares: ${window.gameState.p1Pairs}`;
        document.getElementById('dash-score-p2').innerText = `Pares: ${window.gameState.p2Pairs}`;
    },

    updateTimerDisplay() {
        const seconds = window.gameState.timeSeconds;
        document.getElementById('dash-timer').innerText = window.timer.formatTime(seconds);
    },

    highlightActiveTurn() {
        const badgeP1 = document.getElementById('badge-p1');
        const badgeP2 = document.getElementById('badge-p2');

        if (window.gameState.activeTurn === 1) {
            badgeP1.classList.add('active');
            badgeP2.classList.remove('active');
        } else {
            badgeP2.classList.add('active');
            badgeP1.classList.remove('active');
        }
    }
};