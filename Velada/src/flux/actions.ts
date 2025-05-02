export const voteCharacter = (fightId: number, characterId: number) => ({
    type: 'VOTE',
    payload: {
      fightId,
      characterId
    }
  });
  