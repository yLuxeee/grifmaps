const STORE_KEY = 'grifmaps_league_v1';

const seed = {
  signups: [
    { id: 1, player: 'Atlas', wantsCaptain: true, teamName: 'Skybreakers' },
    { id: 2, player: 'Nova', wantsCaptain: false, teamName: '' },
    { id: 3, player: 'Rook', wantsCaptain: true, teamName: 'Blue Orbit' }
  ],
  stats: {
    Skybreakers: { lp: 21, wins: 7, losses: 2 },
    'Blue Orbit': { lp: 15, wins: 5, losses: 4 }
  },
  profiles: {
    Skybreakers: { banner: '', colors: '#2f80ed,#56ccf2', comment: 'Fast breaks and clean passing.' },
    'Blue Orbit': { banner: '', colors: '#60a5fa,#bae6fd', comment: 'Disciplined rotations win games.' }
  }
};

export function loadLeague() {
  const found = localStorage.getItem(STORE_KEY);
  if (!found) {
    localStorage.setItem(STORE_KEY, JSON.stringify(seed));
    return structuredClone(seed);
  }
  return JSON.parse(found);
}

export function saveLeague(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

export function getCaptains(data) {
  return data.signups.filter(s => s.wantsCaptain && s.teamName.trim());
}

export function setActiveNav(page) {
  document.querySelectorAll('.links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
}