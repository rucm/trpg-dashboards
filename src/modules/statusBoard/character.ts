import { Character } from '@/types/statusBoard';
import { InjectionKey } from '@vue/composition-api';

export const useStatusBoardCharacterModule = (character: Character) => {

  return {
  };
};

export type StatusBoardCharacterModule = ReturnType<typeof useStatusBoardCharacterModule>;
export const StatusBoardCharacterModuleKey: InjectionKey<StatusBoardCharacterModule> = Symbol('StatusBoardCharacterModule');