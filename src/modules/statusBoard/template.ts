import { Card, CardItem } from '@/types/statusBoardType';

export const useEmptyCardTemplate = (template: string) => {

  function createEmptyCardItem (): Array<CardItem> {
    if (template === 'sw') {
      return [ { label: 'HP', current: 0, max: 0 }, { label: 'MP', current: 0, max: 0 } ];
    }

    return [ { label: 'HP', current: 0, max: 0 } ];
  }

  function createEmptyCard (): Card {
    return {
      name: '',
      items: createEmptyCardItem()
    };
  };

  return {
    createEmptyCardItem,
    createEmptyCard
  }
};