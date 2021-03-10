import { CharacterPartItem, CharacterPart, Character } from '@/types/statusBoardType';
import templateData from '@/assets/template.json';

export const useCharacterTemplate = () => {

  function createEmptyCharacterPartItems (template: string): Array<CharacterPartItem> {
    if (template === 'sw') return templateData.sw;
    else if (template === 'goblinSlayer') return templateData.goblinSlayer;
    return templateData.default;
  }

  function createEmptyCharacterPart (template: string): CharacterPart {
    return { name: '本体', items: createEmptyCharacterPartItems(template) };
  }

  function createEmptyCharacter (template: string): Character {
    return {
      id: '',
      name: 'キャラクター', 
      parts: [createEmptyCharacterPart(template)],
      order: 0
    };
  }

  return {
    createEmptyCharacterPartItems,
    createEmptyCharacterPart,
    createEmptyCharacter
  }
};