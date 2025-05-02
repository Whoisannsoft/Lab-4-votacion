import { store } from '../flux/store';

class VotingStatistics extends HTMLElement {
  fightId = 0;
  fighters: { id: number; name: string }[] = [];

  connectedCallback() {
    this.fightId = Number(this.getAttribute('fightid'));

    const rawNames = this.getAttribute('names');
    if (rawNames) {
      try {
        this.fighters = JSON.parse(rawNames);
      } catch (e) {
        console.error('Error parsing names JSON:', e);
      }
    }

    store.addEventListener('change', () => this.render());
    this.render();
  }

  render() {
    const votes = store.getVotesForFight(this.fightId);
    const total = store.getTotalVotes(this.fightId);
  
    if (total === 0) {
      this.innerHTML = `<p class="text-gray-500 italic mt-2">No hay votos aún.</p>`;
      return;
    }
  
    const bars = this.fighters.map(f => {
      const count = votes[f.id] || 0;
      const percent = Math.round((count / total) * 100);
      return `
        <div class="mb-2">
          <div class="flex justify-between mb-1 text-sm font-medium text-gray-700">
            <span>${f.name}</span>
            <span>${percent}% (${count} votos)</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div class="bg-blue-500 h-4 rounded-full transition-all" style="width: ${percent}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  
    this.innerHTML = `
      <div class="mt-4 bg-white p-4 border rounded-lg shadow">
        <h3 class="text-sm font-semibold text-gray-600 mb-2">Resultados</h3>
        ${bars}
      </div>
    `;
  }
  
}

customElements.define('voting-statistics', VotingStatistics);
