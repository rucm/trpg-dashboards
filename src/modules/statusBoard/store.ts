import { ref, reactive, computed, InjectionKey } from '@vue/composition-api';
import { Room, State, Character, CharacterPart, CharacterParameter } from '@/types/statusBoard';
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

  async function createCharacter (name: string): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(state.room.roomId);
    if (!(await roomRef.get()).exists) return;
    await roomRef.collection('characters').add({
      name: name,
      parts: [characterTemplate.createPart(state.room.template, '本体')],
      order: Math.max(...state.characters.map(c => c.order), 0) + 1
    });
  }
  
  async function removeCharacter (characterId: string): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(state.room.roomId);
    if (!(await roomRef.get()).exists) return;
    const characterRef = roomRef.collection('characters').doc(characterId);
    if (!(await characterRef.get()).exists) return;
    await characterRef.delete();
  }
  
  async function updateCharacter (character: Character): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(state.room.roomId);
    if (!(await roomRef.get()).exists) return;
    const characterRef = roomRef.collection('characters').doc(character.id);
    if (!(await characterRef.get()).exists) return;
    await characterRef.update({
      name: character.name,
      parts: character.parts,
      order: character.order
    });
  }

  async function createCharacterPart (characterId: string, name: string): Promise<void> {
    const character = state.characters.find(c => c.id === characterId);
    if (!character || character.parts.find(c => c.name === name)) return;
    const part = characterTemplate.createPart(state.room.template, name);
    character.parts.push(part);
    await updateCharacter(character);
  }
  
  async function removeCharacterPart (characterId: string, partId: string): Promise<void> {
    const character = state.characters.find(c => c.id === characterId);
    if (!character) return;
    character.parts = character.parts.filter(c => c.id !== partId);
    await updateCharacter(character);
  }
  
  async function updateCharacterPart (characterId: string, characterPart: CharacterPart): Promise<void> {
    const character = state.characters.find(c => c.id === characterId);
    if (!character) return;
    const part = character.parts.find(p => p.id === characterPart.id);
    if (!part) return;
    part.name = characterPart.name;
    await updateCharacter(character);
  }

  return {
    room: computed(() => state.room),
    characters: computed(() => state.characters),
    initialize,
    subscribe,
    unsubscribe,
    createCharacter,
    removeCharacter,
    updateCharacter,
    createCharacterPart,
    removeCharacterPart,
    updateCharacterPart
  };
};

export type StatusBoardStoreModule = ReturnType<typeof useStatusBoardStoreModule>;
export const StatusBoardStoreModuleKey: InjectionKey<StatusBoardStoreModule> = Symbol('StatusBoardStoreModule');