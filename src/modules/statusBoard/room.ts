import { Room, TemplateType } from '@/types/statusBoard';
import { firestore, firebase } from '@/plugins/firebase';

export const useStatusBoardRoomModule = () => {

  async function fetch (roomId: string, password: string): Promise<Room | undefined> {
    const query = await firestore.collection('statusBoardRoom')
      .where('roomId', '==', roomId)
      .where('password', '==', password).get();
    if (query.empty) return undefined;

    const roomDoc = query.docs[0];

    return {
      id: roomDoc.id,
      roomId: roomDoc.get('roomId') as string,
      template: roomDoc.get('template') as TemplateType
    };
  }

  async function exists (roomId: string, password: string): Promise<boolean> {
    const query = await firestore.collection('statusBoardRoom')
      .where('roomId', '==', roomId)
      .where('password', '==', password).get();
    return !query.empty;
  }

  async function create (roomId: string, password: string, template: TemplateType): Promise<boolean> {
    if (await exists(roomId, password)) return false;

    const room = {
      roomId: roomId,
      template: template,
      password: password,
      characters: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    await firestore.collection('statusBoardRooms').add(room);
    return true;
  }

  return {
    fetch,
    exists,
    create
  };
};