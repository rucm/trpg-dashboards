import { ref } from '@vue/composition-api';
import { TemplateType, State, Character } from '@/types/statusBoardType';
import { useCharacterTemplate } from '@/modules/statusBoard/characterTemplate';
import { firebase, firestore } from '@/plugins/firebase';

export const useStatusBoardAction = (state: State) => {

  const unsubscribeListener = ref<Function>(() => true);
  const characterTemplate = useCharacterTemplate();

  async function fetchRoom (roomId: string): Promise<boolean> {
    const roomRef = firestore.collection('statusBoardRoom').doc(roomId);
    const roomDoc = await roomRef.get();

    if (!roomDoc.exists) return false;

    state.roomId = roomId;
    state.template = roomDoc.get('template') as TemplateType;

    return true;
  }

  async function existsRoomId (roomId: string): Promise<boolean> {
    const roomRef = firestore.collection('statusBoardRooms').doc(roomId);
    const roomDoc = await roomRef.get();
    return roomDoc.exists;
  }

  async function createNewRoom (roomId: string, template: TemplateType): Promise<boolean> {
    if (await existsRoomId(roomId)) return false;

    const room = {
      roomId: roomId,
      template: template,
      characters: [characterTemplate.createEmptyCharacter(template)],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    const roomRef = firestore.collection('statusBoardRooms').doc(roomId);
    await roomRef.set(room);
    return true;
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
            parts: data.parts.sort((p1, p2) => p1.order - p2.order),
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

  async function addCharacter (character: Character): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(state.roomId);
    await roomRef.collection('characters').add({
      name: character.name,
      parts: character.parts,
      order: Math.max(...state.characters.map(c => c.order)) + 1
    });
  }

  async function updateCharacter (character: Character): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(state.roomId);
    const characterRef = roomRef.collection('characters').doc(character.id);
    await characterRef.update({
      name: character.name,
      parts: character.parts,
      order: character.order
    });
  }

  async function removeCharacter (character: Character): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(state.roomId);
    const characterRef = roomRef.collection('characters').doc(character.id);
    await characterRef.delete();
  }

  return {
    fetchRoom,
    existsRoomId,
    createNewRoom,
    subscribe,
    unsubscribe,
    addCharacter,
    updateCharacter,
    removeCharacter
  };
}