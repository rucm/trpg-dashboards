import { Card, CardGroup, CardItem } from '@/types/statusBoardType';

export const useEmptyCardTemplate = () => {

  function createEmptyCardItems (template: string): Array<CardItem> {
    if (template === 'sw') {
      return [ { label: 'HP', current: 0, max: 0, color: '#ef5350' }, { label: 'MP', current: 0, max: 0, color: '#29B6F6' } ];
    }

    return [ { label: 'HP', current: 0, max: 0, color: '#ef5350' } ];
  }

  function createEmptyCard (template: string): Card {
    return { name: '本体', items: createEmptyCardItems(template) };
  }

  function createEmptyCardGroup (template: string): CardGroup {
    return { name: 'キャラクター', cards: [createEmptyCard(template)] };
  }

  return {
    createEmptyCardItems,
    createEmptyCard,
    createEmptyCardGroup
  }
};