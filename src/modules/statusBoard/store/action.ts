import { ref } from '@vue/composition-api';
import { TemplateType, State, Character } from '@/types/statusBoardType';
import { useCharacterTemplate } from '@/modules/statusBoard/characterTemplate';
import { firebase, firestore } from '@/plugins/firebase';

export const useStatusBoardAction = (state: State) => {

  const unsubscribeListener = ref<Function>(() => true);
  const characterTemplate = useCharacterTemplate();

  async function fetchRoom (roomId: string): Promise<boolean> {
    const roomRef = await firestore.collection('statusBoardRoom').doc(roomId);
    const roomDoc = await roomRef.get();

    if (!roomDoc.exists) return false;

    state.roomId = roomId;
    state.template = roomDoc.get('template') as TemplateType;

    return true;
  }

  async function existsRoomId (roomId: string): Promise<boolean> {
    const roomRef = await firestore.collection('statusBoardRooms').doc(roomId);
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
    const roomRef = await firestore.collection('statusBoardRooms').doc(roomId);
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
            parts: data.parts,
            order: data.order
          });
        }

        if (change.type === 'modified') {
          let character = state.characters.find(v => v.id === change.doc.id);
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

  function unsubscribe () {
    unsubscribeListener.value();
  }

  return {
    fetchRoom,
    existsRoomId,
    createNewRoom,
    subscribe,
    unsubscribe
  };
}