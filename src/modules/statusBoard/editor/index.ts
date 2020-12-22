import { InjectionKey } from '@vue/composition-api';
import { useStatusBoardState } from './state';
import { useEmptyCardTemplate } from '../template';

export const useStatusBoardModule = () => {

  const state = useStatusBoardState();

  const emptyCardTemplate = useEmptyCardTemplate();

  return {
    state,
    ...emptyCardTemplate
  };
};

export type StatusBoardModule = ReturnType<typeof useStatusBoardModule>;
export const StatusBoardModuleKey: InjectionKey<StatusBoardModule> = Symbol('StatusBoardModule');