import { store } from '../flux/store';
import { voteCharacter } from '../flux/actions';
import { dispatcher } from '../flux/dispatcher';

class AppContainer extends HTMLElement {

  async connectedCallback() {
    const response = await fetch('/data/characters.json');
    const fights = await response.json();

    this.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-8 text-blue-800">
        La Velada del Año - Votación
        </h1>
        <div id="peleas" class="space-y-8"></div>
    </div>
    `;


    const container = this.querySelector('#peleas')!;

    fights.forEach((fight: any) => {
      const section = document.createElement('section');
      section.innerHTML = `
        <section class="p-4 bg-white rounded-xl justify-between items-center shadow-md flex">
        <h2 class="text-xl font-bold text-gray-700">Pelea #${fight.id}</h2>
        <character-component 
          name="${fight.fighters[0].name}" 
          characterid="${fight.fighters[0].id}" 
          fightid="${fight.id}">
        </character-component>
        <character-component 
          name="${fight.fighters[1].name}" 
          characterid="${fight.fighters[1].id}" 
          fightid="${fight.id}">
        </character-component>
        <voting-statistics 
        fightid="${fight.id}" 
        names='${JSON.stringify(fight.fighters)}'>
        </voting-statistics>
        </section>
      `;
      container.appendChild(section);
    });
  }
}

customElements.define('app-container', AppContainer);
