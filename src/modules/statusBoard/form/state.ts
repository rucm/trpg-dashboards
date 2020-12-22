import { reactive } from '@vue/composition-api';
import { FormState } from '@/types/statusBoardType';

export const useStatusBoardFormState = () => {

  const state = reactive<FormState>({
    roomId: '',
    dialog: false
  });

  return state;
};