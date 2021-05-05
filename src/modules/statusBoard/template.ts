import { v4 as uuidv4 } from 'uuid';
import { TemplateType, CharacterParameter, CharacterPart } from '@/types/statusBoard';
import templateData from '@/assets/characterParameterTemplate.json';

export const useStatusBoardTemplateModule = () => {

  function createParameters (template: TemplateType): Array<CharacterParameter> {
    if (template === 'sw') return JSON.parse(JSON.stringify(templateData.sw));
    if (template === 'goblinSlayer') return JSON.parse(JSON.stringify(templateData.goblinSlayer));
    return JSON.parse(JSON.stringify(templateData.default));
  }

  function createPart (template: TemplateType, name?: string): CharacterPart {
    return {
      id: uuidv4(),
      name: !name ? '新規部位' : name,
      parameters: createParameters(template)
    };
  }

  return {
    createParameters,
    createPart
  };
};