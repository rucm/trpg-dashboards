import { Character, CharacterParameter } from '@/types/statusBoard';
import { computed, InjectionKey } from '@vue/composition-api';

export const useStatusBoardCharacterModule = (character: Character) => {

  const parts = computed(() => {
    const partsList = Array.from(new Set(character.parameters.map(p => p.partsName)));
      const result: { id: number; partsName: string; parameters: CharacterParameter[] }[] = [];
      partsList.forEach((partsName, index) => {
        result.push({
          id: index,
          partsName: partsName,
          parameters: character.parameters.filter(parameter => parameter.partsName === partsName)
        });
      });
      return result;
  });

  return {
    parts
  };
};

export type StatusBoardCharacterModule = ReturnType<typeof useStatusBoardCharacterModule>;
export const StatusBoardCharacterModuleKey: InjectionKey<StatusBoardCharacterModule> = Symbol('StatusBoardCharacterModule');