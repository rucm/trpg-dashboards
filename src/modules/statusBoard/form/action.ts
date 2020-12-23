import { FormState } from '@/types/statusBoardType';
import { firebase, firestore } from '@/plugins/firebase';
import { useEmptyCardTemplate } from '@/modules/statusBoard/template';

export const useStatusBoardFormActions = (state: FormState) => {

  const template = useEmptyCardTemplate();

  async function isExistRoomId (): Promise<boolean> {
    if (state.roomId === '') return false;
    const itemRef = await firestore.collection('rooms').doc(state.roomId);
    const doc = await itemRef.get();
    return doc.exists;
  }
  
  async function createNewBoard (): Promise<void> {
    if (state.roomId === '') return;

    const itemRef = await firestore.collection('rooms').doc(state.roomId);
    const doc = await itemRef.get();
    if (doc.exists) return;

    const board = {
      roomId: state.roomId,
      template: 'sw',
      groups: [template.createEmptyCardGroup('sw')],
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    await itemRef.set(board);
  }

  return {
    isExistRoomId,
    createNewBoard
  }
};