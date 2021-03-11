import { TemplateType, CharacterPartItem, CharacterPart, Character } from '@/types/statusBoardType';
import templateData from '@/assets/statusBoardTemplate.json';

export const useCharacterTemplate = () => {

  function createEmptyCharacterPartItems (template: TemplateType): Array<CharacterPartItem> {
    if (template === 'sw') return templateData.sw;
    if (template === 'goblinSlayer') return templateData.goblinSlayer;
    return templateData.default;
  }

  function createEmptyCharacterPart (template: TemplateType): CharacterPart {
    return {
      id: 'part-0',
      name: '本体',
      items: createEmptyCharacterPartItems(template),
      order: 0
    };
  }

  function createEmptyCharacter (template: TemplateType): Character {
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