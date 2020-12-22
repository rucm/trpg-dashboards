import { Card, CardGroup, CardItem } from '@/types/statusBoardType';

export const useEmptyCardTemplate = () => {

  function createEmptyCardItems (template: string): Array<CardItem> {
    if (template === 'sw') {
      return [ { label: 'HP', current: 0, max: 0 }, { label: 'MP', current: 0, max: 0 } ];
    }

    return [ { label: 'HP', current: 0, max: 0 } ];
  }

  function createEmptyCard (template: string): Card {
    return { name: '', items: createEmptyCardItems(template) };
  }

  function createEmptyCardGroup (template: string): CardGroup {
    return { name: '', cards: [createEmptyCard(template)] };
  }

  return {
    createEmptyCardItems,
    createEmptyCard,
    createEmptyCardGroup
  }
};