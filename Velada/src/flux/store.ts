import { dispatcher } from './dispatcher';

type VoteMap = {
  [fightId: number]: {
    [characterId: number]: number;
  };
};

class Store {
  private votes: VoteMap = {};
  private voted: { [fightId: number]: number } = {};
  private eventTarget = new EventTarget();

  constructor() {
    dispatcher.register(this.handleAction.bind(this));
  }

  private handleAction(action: any) {
    if (action.type === 'VOTE') {
      const { fightId, characterId } = action.payload;

      if (this.voted[fightId] !== undefined) return;
      this.voted[fightId] = characterId;

      if (!this.votes[fightId]) this.votes[fightId] = {};
      if (!this.votes[fightId][characterId]) this.votes[fightId][characterId] = 0;

      this.votes[fightId][characterId] += 1;
      this.eventTarget.dispatchEvent(new CustomEvent('change', { detail: this.votes }));
    }
  }

  getVotesForFight(fightId: number): { [characterId: number]: number } {
    return this.votes[fightId] || {};
  }

  getTotalVotes(fightId: number): number {
    const votes = this.getVotesForFight(fightId);
    return Object.values(votes).reduce((a, b) => a + b, 0);
  }

  getVotedCharacter(fightId: number): number | undefined {
    return this.voted[fightId];
  }

  addEventListener(type: string, callback: EventListenerOrEventListenerObject) {
    this.eventTarget.addEventListener(type, callback);
  }

  removeEventListener(type: string, callback: EventListenerOrEventListenerObject) {
    this.eventTarget.removeEventListener(type, callback);
  }
}

export const store = new Store();
