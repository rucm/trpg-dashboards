import { Room, TemplateType } from '@/types/statusBoard';
import { firestore, firebase } from '@/plugins/firebase';

export const useStatusBoardRoomModule = () => {

  async function fetch (roomId: string): Promise<Room | undefined> {
    const roomRef = firestore.collection('statusBoardRoom').doc(roomId);
    const roomDoc = await roomRef.get();
    if (!roomDoc.exists) return undefined;

    return {
      roomId: roomDoc.id,
      template: roomDoc.get('template') as TemplateType
    };
  }

  async function exists (roomId: string): Promise<boolean> {
    const roomRef = firestore.collection('statusBoardRoom').doc(roomId);
    const roomDoc = await roomRef.get();
    return roomDoc.exists;
  }

  async function create (roomId: string, template: TemplateType): Promise<boolean> {
    if (await exists(roomId)) return false;

    const room = {
      roomId: roomId,
      template: template,
      characters: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const roomRef = firestore.collection('statusBoardRooms').doc(roomId);
    await roomRef.set(room);
    return true;
  }

  return {
    fetch,
    exists,
    create
  };
};