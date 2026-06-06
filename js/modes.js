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
        // Se conectará con dashboard y logros después
    },
    switchTurn() {
        if (window.gameState.mode !== 'pvp') return;
        window.gameState.activeTurn = window.gameState.activeTurn === 1 ? 2 : 1;
    }
};