import { reactive } from '@vue/composition-api';
import { State } from '@/types/statusBoardType';

export const useStatusBoardState = () => {

  const state = reactive<State>({
    roomId: '',
    groups: [],
    template: 'sw'
  });

  return state;
};