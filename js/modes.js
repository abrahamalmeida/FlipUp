window.modes = {
    setupModeRules() {
        const state = window.gameState;

        state.movesCount = 0;
        state.pairsFound = 0;
        state.p1Pairs = 0;
        state.p2Pairs = 0;
        state.activeTurn = 1;
        state.currentStreak = 0;
        state.maxConsecutiveStreak = 0;
        state.currentFailStreak = 0;
        state.maxFailStreak = 0;
        state.isFirstAttempt = true;
        state.firstCardSelected = null;
        state.secondCardSelected = null;
        state.boardLocked = false;
        state.mistakesCount = 0;
        state.timedOut = false;

        window.achievements.resetSession();

        const badgeP1 = document.getElementById('badge-p1');
        const badgeP2 = document.getElementById('badge-p2');
        const timerBox = document.getElementById('stat-timer-box');

        document.getElementById('dash-name-p1').innerText = state.player1Name;
        document.getElementById('dash-name-p2').innerText = state.player2Name;

        if (state.mode === 'solitario' || state.mode === 'contrareloj') {
            badgeP1.classList.remove('hidden');
            badgeP2.classList.add('hidden');
            timerBox.classList.remove('hidden');
            window.timer.clearInterval();
            if (state.mode === 'solitario') {
                state.timeSeconds = 0;
            } else {
                if (state.difficulty === 'easy') state.timeSeconds = 60;
                else if (state.difficulty === 'medium') state.timeSeconds = 120;
                else state.timeSeconds = 180;
            }
            window.dashboard.updateTimerDisplay();
        } else if (state.mode === 'pvp') {
            badgeP1.classList.remove('hidden');
            badgeP2.classList.remove('hidden');
            timerBox.classList.add('hidden');
            window.timer.clearInterval();
        } else {
            badgeP1.classList.remove('hidden');
            badgeP2.classList.add('hidden');
            timerBox.classList.add('hidden');
            window.timer.clearInterval();
            state.timeSeconds = 0;
            window.dashboard.updateTimerDisplay();
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