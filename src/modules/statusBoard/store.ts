import { ref, reactive, computed, InjectionKey } from '@vue/composition-api';
import { Room, State, Character } from '@/types/statusBoard';
import { firestore } from '@/plugins/firebase';
import { useStatusBoardTemplateModule } from '@/modules/statusBoard/template';

export const useStatusBoardStoreModule = () => {

  const unsubscribeListener = ref<Function>(() => true);
  const characterTemplate = useStatusBoardTemplateModule();

  const state = reactive<State>({
    room: { roomId: '', name: '', template: 'default' },
    characters: [],
  });

  function initialize (room: Room): void {
    state.room = room;
  }

  function subscribe (): boolean {
    if (!state.room.roomId) return false;

    const roomRef = firestore.collection('statusBoardRooms').doc(state.room.roomId);
    const charactersRef = roomRef.collection('characters').orderBy('order', 'asc');

    unsubscribeListener.value = charactersRef.onSnapshot(query => {
      for (const change of query.docChanges()) {

        if (change.type === 'added') {
          const data = change.doc.data() as Character;
          state.characters.push({
            id: change.doc.id,
            name: data.name,
            parts: data.parts,
            order: data.order
          });
        }

        if (change.type === 'modified') {
          const character = state.characters.find(v => v.id === change.doc.id);
          if (!character) return;
          const data = change.doc.data() as Character;
          character.name = data.name;
          character.parts = data.parts;
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

  async function create (name: string): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(state.room.roomId);
    await roomRef.collection('characters').add({
      name: name,
      parts: [
        { name: '本体', parameters: characterTemplate.createCharacterParameters(state.room.template) }
      ],
      order: Math.max(...state.characters.map(c => c.order), 0) + 1
    });
  }

  async function remove (characterId: string): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(state.room.roomId);
    const characterRef = roomRef.collection('characters').doc(characterId);
    if (!(await characterRef.get()).exists) return;
    await characterRef.delete();
  }
  
  async function update (character: Character): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(state.room.roomId);
    const characterRef = roomRef.collection('characters').doc(character.id);
    if (!(await characterRef.get()).exists) return;
    await characterRef.update({
      name: character.name,
      parts: character.parts,
      order: character.order
    });
  }

  return {
    room: computed(() => state.room),
    characters: computed(() => state.characters),
    initialize,
    subscribe,
    unsubscribe,
    create,
    remove,
    update
  };
};

export type StatusBoardStoreModule = ReturnType<typeof useStatusBoardStoreModule>;
export const StatusBoardStoreModuleKey: InjectionKey<StatusBoardStoreModule> = Symbol('StatusBoardStoreModule');