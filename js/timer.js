window.timer = {
    intervalId: null,
    start() {
        const state = window.gameState;
        this.clearInterval();
        if (state.mode === 'contrareloj') {
            if (state.difficulty === 'easy') state.timeSeconds = 60;
            else if (state.difficulty === 'medium') state.timeSeconds = 120;
            else state.timeSeconds = 180;
        } else {
            state.timeSeconds = 0;
        }
        this.intervalId = setInterval(() => {
            if (state.mode === 'contrareloj') {
                state.timeSeconds--;
                if (state.timeSeconds <= 0) this.clearInterval();
            } else {
                state.timeSeconds++;
            }
        }, 1000);
    },
    clearInterval() {
        if (this.intervalId) { clearInterval(this.intervalId); this.intervalId = null; }
    },
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
};