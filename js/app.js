window.gameState = {
    currentTheme: 'futbol',
    difficulty: 'easy',
    mode: 'solitario',
    boardLocked: false,
    movesCount: 0,
    pairsFound: 0,
    totalPairsInBoard: 0,
    timeSeconds: 0,
    timerInterval: null,
    firstCardSelected: null,
    secondCardSelected: null,
    activeTurn: 1,
    p1Pairs: 0,
    p2Pairs: 0,
    currentStreak: 0,
    maxConsecutiveStreak: 0,
    currentFailStreak: 0,
    maxFailStreak: 0,
    isFirstAttempt: true,
    player1Name: 'Jugador 1',
    player2Name: 'Jugador 2',
    unlockedAchievements: new Set(),
    mistakesCount: 0,
    timedOut: false,
    resetCount: 0
};

document.addEventListener('DOMContentLoaded', () => {
    window.menu.init();

    document.getElementById('btn-quit').addEventListener('click', () => {
        window.timer.clearInterval();
        window.menu.switchScreenToMenu();
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        window.gameState.resetCount++;
        window.timer.clearInterval();
        window.modes.setupModeRules();
        window.board.generate();
        window.board.startPeek();
    });

    document.getElementById('btn-home').addEventListener('click', () => {
        window.menu.switchScreenToMenu();
    });

    document.getElementById('btn-replay').addEventListener('click', () => {
        window.gameState.resetCount++;
        window.endScreen.hide();
        window.modes.setupModeRules();
        window.board.generate();
        window.board.startPeek();
    });
});