import { ref, reactive, computed, InjectionKey } from '@vue/composition-api';
import { Room, State, Character } from '@/types/statusBoard';
import { firestore } from '@/plugins/firebase';

export const useStatusBoardStoreModule = () => {

  const unsubscribeListener = ref<Function>(() => true);

  const state = reactive<State>({
    roomId: '',
    template: 'default',
    characters: [],
  });

  function initialize (room: Room): void {
    state.roomId = room.roomId;
    state.template = room.template;
  }

  function subscribe (): boolean {
    if (!state.roomId) return false;

    const roomRef = firestore.collection('statusBoardRooms').doc(state.roomId);
    const charactersRef = roomRef.collection('characters').orderBy('order', 'asc');

    unsubscribeListener.value = charactersRef.onSnapshot(query => {
      for (const change of query.docChanges()) {

        if (change.type === 'added') {
          const data = change.doc.data() as Character;
          state.characters.push({
            id: change.doc.id,
            name: data.name,
            parameters: data.parameters,
            order: data.order
          });
        }

        if (change.type === 'modified') {
          const character = state.characters.find(v => v.id === change.doc.id);
          if (!character) return;
          const data = change.doc.data() as Character;
          character.name = data.name;
          character.parameters = data.parameters;
          character.order = data.order;
        }

        if (change.type === 'removed') {
          const characters = state.characters.filter(v => v.id !== change.doc.id);
          state.characters = characters;
        }
      }
    });
    
    return true;
  }

  function unsubscribe (): void {
    unsubscribeListener.value();
  }

  return {
    room: computed(() => <Room>{ roomId: state.roomId, template: state.template }),
    characters: computed(() => state.characters),
    initialize,
    subscribe,
    unsubscribe,
  };
};

export type StatusBoardStoreModule = ReturnType<typeof useStatusBoardStoreModule>;
export const StatusBoardStoreModuleKey: InjectionKey<StatusBoardStoreModule> = Symbol('StatusBoardStoreModule');