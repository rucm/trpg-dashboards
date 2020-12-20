import { 
  InjectionKey,
  reactive
} from '@vue/composition-api';
import { State } from '@/types/statusBoardType';


export const useStatusBoard = () => {

  const state = reactive<State>({
    id: -1,
    cards: [],
    createdAt: new Date(),
    updatedAt: new Date()
  });

};

export type StatusBoardStore = ReturnType<typeof useStatusBoard>;
export const StatusBoardKey: InjectionKey<StatusBoardStore> = Symbol('StatusBoardStore');