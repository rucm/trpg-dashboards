import { TemplateType, CharacterParameter } from '@/types/statusBoard';
import templateData from '@/assets/characterParameterTemplate.json';

export const useStatusBoardTemplateModule = () => {

  function createCharacterParameters (template: TemplateType): Array<CharacterParameter> {
    if (template === 'sw') return templateData.sw;
    if (template === 'goblinSlayer') return templateData.goblinSlayer;
    return templateData.default;
  }

  return {
    createCharacterParameters
  };
};