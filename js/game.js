window.game = {
    init() {},

    handleCardClick(cardElement) {
        const state = window.gameState;

        if (state.boardLocked) return;
        if (cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) return;
        if (cardElement === state.firstCardSelected) return;

        if (state.movesCount === 0 && !state.firstCardSelected && (state.mode === 'solitario' || state.mode === 'contrareloj')) {
            window.timer.start();
        }

        window.audioFX.playFlip();
        cardElement.classList.add('flipped');

        if (!state.firstCardSelected) {
            state.firstCardSelected = cardElement;
        } else {
            state.secondCardSelected = cardElement;
            this.evaluateMatch();
        }
    },

    evaluateMatch() {
        const state = window.gameState;
        state.boardLocked = true;
        state.movesCount++;

        const icon1 = state.firstCardSelected.getAttribute('data-icon');
        const icon2 = state.secondCardSelected.getAttribute('data-icon');

        if (icon1 === icon2) {
            this.processMatch(icon1);
        } else {
            this.processMismatch();
        }

        window.dashboard.updateCounters();
        window.achievements.checkDuringGame(icon1);
    },

    processMatch(matchedIcon) {
        const state = window.gameState;

        state.firstCardSelected.classList.add('matched');
        state.secondCardSelected.classList.add('matched');

        state.pairsFound++;
        state.currentStreak++;
        if (state.currentStreak > state.maxConsecutiveStreak) {
            state.maxConsecutiveStreak = state.currentStreak;
        }
        state.currentFailStreak = 0;

        window.audioFX.playMatch();

        if (state.mode === 'pvp') {
            if (state.activeTurn === 1) state.p1Pairs++;
            else state.p2Pairs++;
        }

        this.clearSelection();
        state.boardLocked = false;

        if (state.pairsFound === state.totalPairsInBoard) {
            window.timer.clearInterval();
            setTimeout(() => {
                window.audioFX.playVictory();
                window.endScreen.show();
            }, 600);
        }
    },

    processMismatch() {
        const state = window.gameState;
        state.currentStreak = 0;
        state.mistakesCount++;

        state.currentFailStreak++;
        if (state.currentFailStreak > state.maxFailStreak) {
            state.maxFailStreak = state.currentFailStreak;
        }

        state.firstCardSelected.classList.add('incorrect');
        state.secondCardSelected.classList.add('incorrect');

        window.audioFX.playError();

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