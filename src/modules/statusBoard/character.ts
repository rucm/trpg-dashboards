import { Character, CharacterParameter, CharacterPart } from "@/types/statusBoard";
import { reactive } from "@vue/composition-api";

export const useStatusBoardCharacterModule = () => {

  function copyCharacter (character: Character): Character {
    return {
      id: character.id,
      name: character.name,
      parts: JSON.parse(JSON.stringify(character.parts)),
      order: character.order
    };
  }

  function copyPart (part: CharacterPart): CharacterPart {
    return {
      id: part.id,
      name: part.name,
      parameters: JSON.parse(JSON.stringify(part.parameters))
    };
  }

  function copyParameter (parameter: CharacterParameter): CharacterParameter {
    return {
      name: parameter.name,
      current: parameter.current,
      max: parameter.max,
      color: parameter.color
    };
  }

  return {
    copyCharacter,
    copyPart,
    copyParameter
  }
};