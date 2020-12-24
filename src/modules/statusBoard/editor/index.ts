import { InjectionKey } from '@vue/composition-api';
import { useStatusBoardState } from './state';
import { useStatusBoardActions } from './action';

export const useStatusBoardModule = () => {

  const state = useStatusBoardState();
  const actions = useStatusBoardActions(state);

  return {
    state,
    ...actions
  };
};

export type StatusBoardModule = ReturnType<typeof useStatusBoardModule>;
export const StatusBoardModuleKey: InjectionKey<StatusBoardModule> = Symbol('StatusBoardModule');