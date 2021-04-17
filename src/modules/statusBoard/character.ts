import { Character } from '@/types/statusBoard';
import { StatusBoardStoreModule } from '@/modules/statusBoard/store';
import { InjectionKey } from '@vue/composition-api';

export const useStatusBoardCharacterModule = (character: Character, store: StatusBoardStoreModule) => {

  async function updateName (name: string): Promise<void> {
    character.name = name;
    await store.update(character);
  }

  async function updateParameter (partsName: string, name: string, current: number, max: number): Promise<void> {
    const parameter = character.parameters.find(c => c.partsName === partsName && c.name === name);
    if (!parameter) return;
    parameter.current = current;
    parameter.max = max;
    await store.update(character);
  }

  return {
    updateName,
    updateParameter
  };
};

export type StatusBoardCharacterModule = ReturnType<typeof useStatusBoardCharacterModule>;
export const StatusBoardCharacterModuleKey: InjectionKey<StatusBoardCharacterModule> = Symbol('StatusBoardCharacterModule');