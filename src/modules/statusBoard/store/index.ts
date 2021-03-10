import { InjectionKey } from '@vue/composition-api';
import { useStatusBoardState } from './state';
import { useStatusBoardAction } from './action';

export const useStatusBoardModule = () => {

  const state = useStatusBoardState();
  const action = useStatusBoardAction(state);

  return {
    state,
    ...action
  };
};

export type StatusBoardModule = ReturnType<typeof useStatusBoardModule>;
export const StatusBoardModuleKey: InjectionKey<StatusBoardModule> = Symbol('StatusBoardModule');