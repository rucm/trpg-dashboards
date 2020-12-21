import { Card, CardGroup, CardItem } from '@/types/statusBoardType';

export const useEmptyCardTemplate = (template: string) => {

  function createEmptyCardItems (): Array<CardItem> {
    if (template === 'sw') {
      return [ { label: 'HP', current: 0, max: 0 }, { label: 'MP', current: 0, max: 0 } ];
    }

    return [ { label: 'HP', current: 0, max: 0 } ];
  }

  function createEmptyCard (): Card {
    return { name: '', items: createEmptyCardItems() };
  };

  function createEmptyCardGroup () : CardGroup {
    return { name: '', cards: [createEmptyCard()] };
  }

  return {
    createEmptyCardItems,
    createEmptyCard,
    createEmptyCardGroup
  }
};