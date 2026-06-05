window.board = {
    generate() {
        const state = window.gameState;
        const boardElement = document.getElementById('game-board');
        boardElement.innerHTML = '';
        let columns = 4;
        if (state.difficulty === 'medium') columns = 6;
        if (state.difficulty === 'hard') columns = 8;
        boardElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        const iconsBase = window.themes.getIconsForDifficulty(state.currentTheme, state.difficulty);
        const iconDeck = [...iconsBase, ...iconsBase];
        iconDeck.sort(() => 0.5 - Math.random());
        state.totalPairsInBoard = iconsBase.length;
        iconDeck.forEach(icon => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-icon', icon);
            card.innerHTML = `<div class="card-inner"><div class="card-back"></div><div class="card-front"><span class="icon-render">${icon}</span></div></div>`;
            card.addEventListener('click', () => window.game.handleCardClick(card));
            boardElement.appendChild(card);
        });
    }
};