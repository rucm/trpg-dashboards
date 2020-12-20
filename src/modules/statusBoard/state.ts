import { reactive } from '@vue/composition-api';
import { State } from '@/types/statusBoardType';

export default function useStatusBoardState () {

  const state = reactive<State>({
    id: '',
    groups: [],
    template: 'sw'
  });

  return state;
};