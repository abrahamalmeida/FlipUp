window.achievements = {
    registry: {
        'first_step': { title: 'Primer paso', desc: 'Encontrar el primer par.', icon: '🎯' },
        'hot_streak': { title: 'Racha caliente', desc: '3 pares consecutivos sin fallar.', icon: '🔥' },
        'speedster': { title: 'Velocista', desc: 'Completar fácil en <30s (clásico).', icon: '⚡' },
        'no_hesitation': { title: 'Sin titubeos', desc: 'Primer intento = acierto.', icon: '🔮' },
        'messi': { title: 'Messiiiiii!', desc: 'Encontraste a la cabra!', icon: '🐐' },
        'perfect_game': { title: 'Mente Maestra', desc: 'Partida sin errores.', icon: '🧠' },
        'perfect_hard': { title: 'Perfecto Imposible', desc: 'Difícil sin errores.', icon: '💀' },
        'duelo_titanes': { title: 'Duelo de titanes', desc: 'Ganar PvP por 1 par.', icon: '🎩' },
        'empate_perfecto': { title: 'Empate perfecto', desc: 'Empatar en PvP.', icon: '🤝' },
        'zoo': { title: 'Zoológico', desc: 'Bienvenido al zoológico!.', icon: '🦁' },
        'meme_lord': { title: 'Meme Lord', desc: 'Ganar con tema Memes.', icon: '😂' },
        'rey_tablero': { title: 'Rey del tablero', desc: '10 pares seguidos sin fallar.', icon: '👑' },
        'cold_streak': { title: 'Cold streak', desc: '5 fallos consecutivos.', icon: '🧊' },
        'observador': { title: 'Observador', desc: '<2 reinicios en la partida.', icon: '🔍' }
    },

    checkDuringGame(matchedIcon) {
        const state = window.gameState;

        if (state.pairsFound === 1 && !state.unlockedAchievements.has('first_step')) {
            this.unlock('first_step');
        }
        if (state.currentStreak === 3 && !state.unlockedAchievements.has('hot_streak')) {
            this.unlock('hot_streak');
        }
        if (state.pairsFound === 1 && state.movesCount === 1 && !state.unlockedAchievements.has('no_hesitation')) {
            this.unlock('no_hesitation');
        }
        if (matchedIcon === '🐐' && state.currentTheme === 'futbol' && !state.unlockedAchievements.has('messi')) {
            this.unlock('messi');
        }
        if (state.currentStreak === 10 && !state.unlockedAchievements.has('rey_tablero')) {
            this.unlock('rey_tablero');
        }
        if (state.currentFailStreak === 5 && !state.unlockedAchievements.has('cold_streak')) {
            this.unlock('cold_streak');
        }
    },

    checkAtEnd() {
        const state = window.gameState;
        if (state.difficulty === 'easy' && state.mode === 'solitario' && !state.timedOut && state.timeSeconds < 30 && !state.unlockedAchievements.has('speedster')) {
            this.unlock('speedster');
        }
        if (state.mistakesCount === 0 && !state.unlockedAchievements.has('perfect_game')) {
            this.unlock('perfect_game');
        }
        if (state.mistakesCount === 0 && state.difficulty === 'hard' && !state.unlockedAchievements.has('perfect_hard')) {
            this.unlock('perfect_hard');
        }
        if (state.mode === 'pvp') {
            const diff = Math.abs(state.p1Pairs - state.p2Pairs);
            if (diff === 1 && !state.unlockedAchievements.has('duelo_titanes')) {
                this.unlock('duelo_titanes');
            }
            if (state.p1Pairs === state.p2Pairs && state.pairsFound === state.totalPairsInBoard && !state.unlockedAchievements.has('empate_perfecto')) {
                this.unlock('empate_perfecto');
            }
        }
        if (state.currentTheme === 'animales' && !state.unlockedAchievements.has('zoo')) {
            this.unlock('zoo');
        }
        if (state.currentTheme === 'memes' && !state.unlockedAchievements.has('meme_lord')) {
            this.unlock('meme_lord');
        }
        if (state.resetCount < 2 && !state.unlockedAchievements.has('observador')) {
            this.unlock('observador');
        }
    },

    unlock(id) {
        if (window.gameState.unlockedAchievements.has(id)) return;
        window.gameState.unlockedAchievements.add(id);
        const ach = this.registry[id];
        this.showToast(ach);
        const sidebarList = document.getElementById('sidebar-achievements-list');
        if (sidebarList) {
            const li = document.createElement('li');
            li.className = 'sidebar-ach-item';
            li.innerHTML = `<span class="title">${ach.icon} ${ach.title}</span>${ach.desc}`;
            sidebarList.appendChild(li);
        }
        if (id === 'messi') {
            window.audioFX.playGoat();
        }
    },

    showToast(ach) {
        const container = document.getElementById('achievement-toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="icon">${ach.icon}</div>
            <div class="content">
                <h5>¡Logro Desbloqueado!</h5>
                <p>${ach.title}</p>
            </div>
        `;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'fadeIn 0.3s ease-out reverse forwards';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    },

    resetSession() {
        window.gameState.unlockedAchievements.clear();
        const sidebarList = document.getElementById('sidebar-achievements-list');
        if (sidebarList) sidebarList.innerHTML = '';
    }
};