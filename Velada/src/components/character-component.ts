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

    const alreadyVoted = store.getVotedCharacter(this.fightId) !== undefined;
    this.render(alreadyVoted);

    store.addEventListener('change', () => {
      const voted = store.getVotedCharacter(this.fightId) !== undefined;
      this.render(voted);
    });
  }

  render(disabled: boolean) {
    this.innerHTML = `
      <button 
        class="relative px-5 py-3 overflow-hidden font-medium rounded-lg shadow-inner 
               border group 
               ${disabled ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed' : 'text-gray-600 bg-gray-100 border-gray-100'}"
        ${disabled ? 'disabled' : ''}
      >
        ${disabled ? '' : `
          <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
          <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
          <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
        `}
        <span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
          Votar por ${this.name}
        </span>
      </button>
    `;

    if (!disabled) {
      this.querySelector('button')?.addEventListener('click', () => {
        dispatcher.dispatch(voteCharacter(this.fightId, this.characterId));
      });
    }
  }
}

customElements.define('character-component', CharacterComponent);
