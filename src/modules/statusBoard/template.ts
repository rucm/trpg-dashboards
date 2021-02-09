import { Card, CardGroup, CardItem, CharacterPartItem, CharacterPart, Character } from '@/types/statusBoardType';
import templateData from '@/assets/template.json';

export const useEmptyCardTemplate = () => {

  function createEmptyCharacterPartItems (template: string): Array<CharacterPartItem> {
    if (template === 'sw') return templateData.sw;
    return templateData.default;
  }

  function createEmptyCharacterPart (template: string): CharacterPart {
    return { name: '本体', items: createEmptyCharacterPartItems(template) };
  }

  function createEmptyCharacter (template: string): Character {
    return { name: 'キャラクター', parts: [createEmptyCharacterPart(template)] };
  }

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
    createEmptyCharacterPartItems,
    createEmptyCharacterPart,
    createEmptyCharacter,
    createEmptyCardItems,
    createEmptyCard,
    createEmptyCardGroup
  }
};