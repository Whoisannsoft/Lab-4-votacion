import { dispatcher } from '../flux/dispatcher';
import { voteCharacter } from '../flux/actions';
import { store } from '../flux/store';

class CharacterComponent extends HTMLElement {
  name = '';
  fightId = 0;
  characterId = 0;

  connectedCallback() {
    this.name = this.getAttribute('name')!;
    this.fightId = Number(this.getAttribute('fightid'));
    this.characterId = Number(this.getAttribute('characterid'));

    const alreadyVoted = store.getVote(this.fightId) !== undefined;
    this.render(alreadyVoted);

    store.addEventListener('change', () => {
      const voted = store.getVote(this.fightId) !== undefined;
      this.render(voted);
    });
  }

  render(disabled: boolean) {
    this.innerHTML = `
      <button ${disabled ? 'disabled' : ''}>Votar por ${this.name}</button>
    `;

    if (!disabled) {
      this.querySelector('button')?.addEventListener('click', () => {
        dispatcher.dispatch(voteCharacter(this.fightId, this.characterId));
      });
    }
  }
}

customElements.define('character-component', CharacterComponent);