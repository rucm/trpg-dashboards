import { firestore } from '@/plugins/firebase';
import { CharacterParameter } from '@/types/statusBoard';
import { useStatusBoardTemplateModule } from '@/modules/statusBoard/template';
import { StatusBoardStoreModule } from '@/modules/statusBoard/store';
import { InjectionKey } from '@vue/composition-api';

export const useStatusBoardCharacterModule = (store: StatusBoardStoreModule) => {

  const characterTemplate = useStatusBoardTemplateModule();
  
  async function create (name: string): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(store.room.value.roomId);
    await roomRef.collection('characters').add({
      name: name,
      parameters: characterTemplate.createCharacterParameters(store.room.value.template),
      order: Math.max(...store.characters.value.map(c => c.order), 0) + 1
    });
  }
  
  async function remove (characterId: string): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(store.room.value.roomId);
    const characterRef = roomRef.collection('characters').doc(characterId);
    if (!(await characterRef.get()).exists) return;
    await characterRef.delete();
  }
  
  async function updateName (characterId: string, name: string): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(store.room.value.roomId);
    const characterRef = roomRef.collection('characters').doc(characterId);
    if (!(await characterRef.get()).exists) return;
    await characterRef.update({ name: name });
  }
  
  async function updateParameters (characterId: string, parameters: Array<CharacterParameter>): Promise<void> {
    const roomRef = firestore.collection('statusBoardRooms').doc(store.room.value.roomId);
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

export type StatusBoardCharacterModule = ReturnType<typeof useStatusBoardCharacterModule>;
export const StatusBoardCharacterModuleKey: InjectionKey<StatusBoardCharacterModule> = Symbol('StatusBoardCharacterModule');