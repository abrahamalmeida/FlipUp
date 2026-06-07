window.modes = {
    setupModeRules() {
        const state = window.gameState;
        state.movesCount = 0;
        state.pairsFound = 0;
        state.p1Pairs = 0;
        state.p2Pairs = 0;
        state.activeTurn = 1;
        state.currentStreak = 0;
        state.currentFailStreak = 0;
        state.firstCardSelected = null;
        state.secondCardSelected = null;
        state.boardLocked = false;
        state.timedOut = false;

        document.getElementById('dash-name-p1').innerText = state.player1Name;
        document.getElementById('dash-name-p2').innerText = state.player2Name;

        const badgeP1 = document.getElementById('badge-p1');
        const badgeP2 = document.getElementById('badge-p2');
        const timerBox = document.getElementById('stat-timer-box');

        if (state.mode === 'pvp') {
            badgeP1.classList.remove('hidden');
            badgeP2.classList.remove('hidden');
            timerBox.classList.add('hidden');
        } else {
            badgeP1.classList.remove('hidden');
            badgeP2.classList.add('hidden');
            timerBox.classList.remove('hidden');
        }

        window.dashboard.updateCounters();
        window.dashboard.highlightActiveTurn();
    },
    switchTurn() {
        if (window.gameState.mode !== 'pvp') return;
        window.gameState.activeTurn = window.gameState.activeTurn === 1 ? 2 : 1;
        window.dashboard.highlightActiveTurn();
    }
};