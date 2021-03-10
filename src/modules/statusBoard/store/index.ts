import { InjectionKey } from '@vue/composition-api';
import { useStatusBoardState } from './state';
import { useStatusBoardAction } from './action';

export const useStatusBoardStoreModule = () => {

  const state = useStatusBoardState();
  const action = useStatusBoardAction(state);

  return {
    state,
    ...action
  };
};

export type StatusBoardStoreModule = ReturnType<typeof useStatusBoardStoreModule>;
export const StatusBoardStoreModuleKey: InjectionKey<StatusBoardStoreModule> = Symbol('StatusBoardStoreModule');