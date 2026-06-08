window.game = {
    handleCardClick(card) {
        const state = window.gameState;
        if (state.boardLocked) return;
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        if (card === state.firstCardSelected) return;

        card.classList.add('flipped');

        if (!state.firstCardSelected) {
            state.firstCardSelected = card;
        } else {
            state.secondCardSelected = card;
            this.evaluateMatch();
        }
    },
    evaluateMatch() {
        const state = window.gameState;
        state.boardLocked = true;
        state.movesCount++;
        window.dashboard.updateCounters();
        const icon1 = state.firstCardSelected.querySelector('.icon-render').innerText;
        const icon2 = state.secondCardSelected.querySelector('.icon-render').innerText;
        if (icon1 === icon2) {
            this.processMatch();
        } else {
            this.processMismatch();
        }
        window.achievements.checkDuringGame(icon1);
    },
    processMatch() {
        const state = window.gameState;
        state.firstCardSelected.classList.add('matched');
        state.secondCardSelected.classList.add('matched');
        state.pairsFound++;
        state.currentStreak++;
        state.currentFailStreak = 0;

        if (state.mode === 'pvp') {
            if (state.activeTurn === 1) state.p1Pairs++;
            else state.p2Pairs++;
        }

        this.clearSelection();
        state.boardLocked = false;

        if (state.pairsFound === state.totalPairsInBoard) {
            window.timer.clearInterval();
            setTimeout(() => { window.endScreen.show(); }, 600);
        }
    },
    processMismatch() {
        const state = window.gameState;
        state.currentStreak = 0;
        state.mistakesCount++;
        state.currentFailStreak++;
        state.firstCardSelected.classList.add('incorrect');
        state.secondCardSelected.classList.add('incorrect');
        setTimeout(() => {
            state.firstCardSelected.classList.remove('flipped', 'incorrect');
            state.secondCardSelected.classList.remove('flipped', 'incorrect');
            this.clearSelection();
            window.modes.switchTurn();
            state.boardLocked = false;
        }, 1200);
    },
    clearSelection() {
        window.gameState.firstCardSelected = null;
        window.gameState.secondCardSelected = null;
    }
};