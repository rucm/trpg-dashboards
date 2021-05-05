import { Room, TemplateType } from '@/types/statusBoard';
import { firestore, firebase } from '@/plugins/firebase';

export const useStatusBoardRoomModule = () => {

  async function fetch (roomId: string): Promise<Room> {
    const roomRef = firestore.collection('statusBoardRooms').doc(roomId);
    const roomDoc = await roomRef.get();

    if (!roomDoc.exists) return { roomId: '', name: '', template: 'default' };

    return {
      roomId: roomDoc.id,
      name: roomDoc.get('name') as string,
      template: roomDoc.get('template') as TemplateType
    };
  }

  async function auth (name: string, password: string): Promise<string> {
    const query = await firestore.collection('statusBoardRooms')
      .where('name', '==', name)
      .where('password', '==', password).get();
    if (query.empty) return '';

    const doc = query.docs[0];
    return doc.id;
  }

  async function exists (name: string, password: string): Promise<boolean> {
    const query = await firestore.collection('statusBoardRooms')
      .where('name', '==', name)
      .where('password', '==', password).get();
    return !query.empty;
  }

  async function create (roomId: string, password: string, template: TemplateType): Promise<string> {
    if (await exists(roomId, password)) return '';

    const room = {
      name: roomId,
      template: template,
      password: password,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const doc = await firestore.collection('statusBoardRooms').add(room);
    return doc.id;
  }

  return {
    fetch,
    auth,
    exists,
    create
  };
};