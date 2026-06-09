window.timer = {
    intervalId: null,

    start() {
        const state = window.gameState;
        this.clearInterval();

        if (state.mode === 'contrareloj') {
            if (state.difficulty === 'easy') state.timeSeconds = 60;
            else if (state.difficulty === 'medium') state.timeSeconds = 120;
            else state.timeSeconds = 180;
            document.getElementById('timer-label').innerText = 'Tiempo Restante';
        } else if (state.mode === 'solitario') {
            state.timeSeconds = 0;
            document.getElementById('timer-label').innerText = 'Tiempo';
        } else {
            state.timeSeconds = 0;
            document.getElementById('timer-label').innerText = 'Tiempo';
        }

        window.dashboard.updateTimerDisplay();

        this.intervalId = setInterval(() => {
            if (state.mode === 'contrareloj') {
                state.timeSeconds--;
                window.dashboard.updateTimerDisplay();
                if (state.timeSeconds <= 10) {
                    document.getElementById('dash-timer').style.color = '#ef4444';
                }
                if (state.timeSeconds <= 0) {
                    this.clearInterval();
                    this.handleTimeout();
                }
            } else if (state.mode === 'solitario') {
                state.timeSeconds++;
                window.dashboard.updateTimerDisplay();
            } else {
                state.timeSeconds++;
                window.dashboard.updateTimerDisplay();
            }
        }, 1000);
    },

    clearInterval() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        document.getElementById('dash-timer').style.color = '';
    },

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },

    handleTimeout() {
        const state = window.gameState;
        state.boardLocked = true;
        state.timedOut = true;
        window.audioFX.playError();
        window.endScreen.show();
    }
};