import { InjectionKey } from '@vue/composition-api';
import { useStatusBoardFormState } from './state';
import { useStatusBoardFormActions } from './action';

export const useStatusBoardFormModule = () => {

  const state = useStatusBoardFormState();

  const actions = useStatusBoardFormActions(state);

  return {
    state,
    ...actions
  };
};

export type StatusBoardFormModule = ReturnType<typeof useStatusBoardFormModule>;
export const StatusBoardFormModuleKey: InjectionKey<StatusBoardFormModule> = Symbol('StatusBoardFormModule');