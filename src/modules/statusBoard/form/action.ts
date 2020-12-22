import { FormState } from '@/types/statusBoardType';
import { firestore } from '@/plugins/firebase';
import { useEmptyCardTemplate } from '@/modules/statusBoard/template';

export const useStatusBoardFormActions = (state: FormState) => {

  const template = useEmptyCardTemplate();

  async function isExistRoomId () {
    console.log(state.roomId);
    const itemRef = await firestore.collection('rooms').doc(state.roomId);
    const doc = await itemRef.get();
    console.log(doc.exists);
    return doc.exists;
  }

  async function createNewBoard () {
    const itemRef = await firestore.collection('rooms').doc(state.roomId);
    const board = {
      template: 'sw',
      groups: template.createEmptyCardGroup('sw'),
    };

    await itemRef.set(board);
  }

  return {
    isExistRoomId,
    createNewBoard
  }
};