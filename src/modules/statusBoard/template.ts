import { TemplateType, CharacterParameter, Character } from '@/types/statusBoard';
import templateData from '@/assets/characterParameterTemplate.json';

export const useStatusBoardTemplateModule = () => {

  function createEmptyCharacterParameters (template: TemplateType): Array<CharacterParameter> {
    if (template === 'sw') return templateData.sw;
    if (template === 'goblinSlayer') return templateData.goblinSlayer;
    return templateData.default;
  }

  function createEmptyCharacter (template: TemplateType): Character {
    return {
      id: '',
      name: 'キャラクター', 
      parameters: createEmptyCharacterParameters(template),
      order: 0
    };
  }

  return {
    createEmptyCharacterParameters,
    createEmptyCharacter
  }
};