import { reactive } from '@vue/composition-api';
import { State } from '@/types/statusBoardType';

export const useStatusBoardState = () => {

  const state = reactive<State>({
    roomId: '',
    characters: [],
    template: 'default'
  });

  return state;
};