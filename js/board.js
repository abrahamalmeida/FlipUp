window.board = {
    init() {},

    generate() {
        const state = window.gameState;
        const boardElement = document.getElementById('game-board');
        boardElement.innerHTML = '';

        boardElement.className = 'board';

        let columns = 4;
        if (state.difficulty === 'medium') {
            columns = 6;
            boardElement.classList.add('difficulty-medium');
        }
        if (state.difficulty === 'hard') {
            columns = 8;
            boardElement.classList.add('difficulty-hard');
        }

        boardElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

        const iconsBase = window.themes.getIconsForDifficulty(state.currentTheme, state.difficulty);
        const iconDeck = [...iconsBase, ...iconsBase];
        iconDeck.sort(() => 0.5 - Math.random());

        state.totalPairsInBoard = iconsBase.length;

        iconDeck.forEach((icon, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-icon', icon);
            card.setAttribute('data-index', index);

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-back"></div>
                    <div class="card-front">
                        <span class="icon-render">${icon}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => window.game.handleCardClick(card));
            boardElement.appendChild(card);
        });
    },

    startPeek() {
        const state = window.gameState;
        state.boardLocked = true;

        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => card.classList.add('flipped'));

        let totalTicks;
        if (state.difficulty === 'easy') {
            totalTicks = 6;
        } else if (state.difficulty === 'medium') {
            totalTicks = 4;
        } else {
            totalTicks = 3;
        }

        let ticks = 0;
        const tickInterval = setInterval(() => {
            window.audioFX.playPeekTick();
            ticks++;
            if (ticks >= totalTicks) {
                clearInterval(tickInterval);
                allCards.forEach(card => card.classList.remove('flipped'));
                state.boardLocked = false;
            }
        }, 500);
    }
};