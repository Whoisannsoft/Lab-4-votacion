import { store } from '../flux/store';
import { voteCharacter } from '../flux/actions';
import { dispatcher } from '../flux/dispatcher';

class AppContainer extends HTMLElement {
  async connectedCallback() {
    const response = await fetch('./characters.json');
    const fights = await response.json();

    this.innerHTML = `
      <h1>La Velada del Año - Votación</h1>
      <div id="peleas"></div>
    `;

    const container = this.querySelector('#peleas')!;

    fights.forEach((fight: any) => {
      const section = document.createElement('section');
      section.innerHTML = `
        <h2>Pelea #${fight.id}</h2>
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
        <voting-statistics fightid="${fight.id}"></voting-statistics>
        <hr />
      `;
      container.appendChild(section);
    });
  }
}

customElements.define('app-container', AppContainer);
