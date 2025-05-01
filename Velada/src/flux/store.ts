import { dispatcher } from './dispatcher';

interface Vote {
  [fightId: number]: number;
}

class Store extends EventTarget {
  private votes: Vote = {};

  constructor() {
    super();
    dispatcher.register(this.handleAction.bind(this));
  }

  private handleAction(action: any) {
    switch (action.type) {
      case 'VOTE': {
        const { fightId, characterId } = action.payload;

       
        if (this.votes[fightId] !== undefined) return;

        this.votes[fightId] = characterId;

        this.dispatchEvent(new CustomEvent('change', { detail: this.votes }));
        break;
      }
    }
  }

  getVotes() {
    return { ...this.votes };
  }

  getVote(fightId: number): number | undefined {
    return this.votes[fightId];
  }
}

export const store = new Store();

