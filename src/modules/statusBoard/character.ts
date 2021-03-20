import { firestore, firebase } from '@/plugins/firebase';
import { Character, CharacterParameter } from '@/types/statusBoard';
import { useStatusBoardTemplateModule } from '@/modules/statusBoard/template';
import { StatusBoardStoreModule } from '@/modules/statusBoard/store';

export const useStatusBoardCharacterModule = (store: StatusBoardStoreModule) => {

  const characterTemplate = useStatusBoardTemplateModule();
  const roomRef = firestore.collection('statusBoardRooms').doc(store.room.value.roomId);

  async function create (name: string): Promise<void> {
    await roomRef.collection('characters').add({
      name: name,
      parameters: characterTemplate.createCharacterParameters(store.room.value.template),
      order: Math.max(...store.characters.value.map(c => c.order)) + 1
    });
  }

  async function remove (characterId: string): Promise<void> {
    const characterRef = roomRef.collection('characters').doc(characterId);
    if (!(await characterRef.get()).exists) return;
    await characterRef.delete();
  }
  
  async function updateName (characterId: string, name: string): Promise<void> {
    const characterRef = roomRef.collection('characters').doc(characterId);
    if (!(await characterRef.get()).exists) return;
    await characterRef.update({ name: name });
  }
  
  async function updateParameters (characterId: string, parameters: Array<CharacterParameter>): Promise<void> {
    const characterRef = roomRef.collection('characters').doc(characterId);
    if (!(await characterRef.get()).exists) return;
    await characterRef.update({ parameters: parameters });
  }

  return {
    create,
    remove,
    updateName,
    updateParameters
  };
};