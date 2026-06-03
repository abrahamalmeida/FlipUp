window.themes = {
    catalog: {
        futbol: ['🇦🇷','🇧🇷','🇨🇦','🇲🇽','🇺🇸','🇫🇷','🇪🇸','🇩🇪','🇮🇹','🇵🇹','🇬🇧','🇯🇵','🇲🇦','🇺🇾','⚽','🏆','🏟️','👟','🧤','🟨','🟥','🥇','⏱️','📣','🎽','🎯','🎫','👑','🐐','✈️','🎉','🏅'],
        animales: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🦋','🐌','🐞','🦟'],
        memes: ['😂','🤣','💀','🤡','👌','😭','🥵','🤨','📸','🤳','🐸','🍵','🗿','💀','🤙','😎','😳','🤯','👀','🔥','💯','🍿','🧢','🐒','🦝','🧃','🚬','😈','💅','✨','🤪','🥴']
    },
    applyTheme(themeName) {
        document.body.className = '';
        document.body.classList.add(`theme-${themeName}`);
        window.gameState.currentTheme = themeName;
    },
    getIconsForDifficulty(themeName, difficulty) {
        let count = 8;
        if (difficulty === 'medium') count = 18;
        if (difficulty === 'hard') count = 32;
        const fullSet = this.catalog[themeName] || this.catalog.futbol;
        const shuffled = [...fullSet].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
};