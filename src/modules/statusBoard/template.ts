import { TemplateType, CharacterParameter, CharacterPart } from '@/types/statusBoard';
import templateData from '@/assets/characterParameterTemplate.json';

export const useStatusBoardTemplateModule = () => {

  function createParameters (template: TemplateType): Array<CharacterParameter> {
    if (template === 'sw') return templateData.sw;
    if (template === 'goblinSlayer') return templateData.goblinSlayer;
    return templateData.default;
  }

  function createPart (template: TemplateType, name?: string): CharacterPart {
    return {
      name: !name ? '新規部位' : name,
      parameters: createParameters(template)
    };
  }

  return {
    createParameters,
    createPart
  };
};