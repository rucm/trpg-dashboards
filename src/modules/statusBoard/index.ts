import { InjectionKey } from '@vue/composition-api';
import useStatusBoardState from './state';
import { useEmptyCardTemplate } from './template';

export const useStatusBoardModule = () => {

  const state = useStatusBoardState();

  const emptyCardTemplate = useEmptyCardTemplate('sw');

  return {
    state,
    ...emptyCardTemplate
  };
};

export type StatusBoardModule = ReturnType<typeof useStatusBoardModule>;
export const StatusBoardKey: InjectionKey<StatusBoardModule> = Symbol('StatusBoardModule');