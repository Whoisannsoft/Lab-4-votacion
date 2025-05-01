import { store } from '../flux/store';

class VotingStatistics extends HTMLElement {
  fightId = 0;

  connectedCallback() {
    this.fightId = Number(this.getAttribute('fightid'));
    store.addEventListener('change', () => this.render());
    this.render();
  }

  render() {
    const votes = store.getVotes();
    const votedId = votes[this.fightId];
    if (!votedId) {
      this.innerHTML = '<p>No hay votos aún.</p>';
    } else {
      this.innerHTML = `<p>Has votado por el ID ${votedId}</p>`;
    }
  }
}

customElements.define('voting-statistics', VotingStatistics);
