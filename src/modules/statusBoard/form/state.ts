import { reactive, watch } from '@vue/composition-api';
import { FormState } from '@/types/statusBoardType';

export const useStatusBoardFormState = () => {

  const state = reactive<FormState>({
    roomId: '',
    errorMessages: []
  });

  watch(() => state.roomId, () => {
    if (state.roomId === '') state.errorMessages.splice(0);
  })

  return state;
};