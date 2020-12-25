import { ref } from '@vue/composition-api';
import { State, CardGroup, Card, CardItem } from '@/types/statusBoardType';
import { firestore } from '@/plugins/firebase';


export const useStatusBoardActions = (state: State) => {

  const unsubscribeFunc = ref<Function>(() => true);

  async function fetchRoomData (roomId: string): Promise<boolean> {
    const itemRef = await firestore.collection('rooms').doc(roomId);
    const doc = await itemRef.get();
    
    if (!doc.exists) return false;

    state.roomId = roomId;
    state.template = doc.get('template') as string;
    state.groups = doc.get('groups') as Array<CardGroup>;

    return true;
  }

  function removeCardGroup (cardGroupIndex: number) {
    state.groups.splice(cardGroupIndex, 1);
  }

  function getCardGroup (cardGroupIndex: number): CardGroup {
    return state.groups[cardGroupIndex];
  }

  function getCard (cardGroupIndex: number, cardIndex: number): Card {
    return state.groups[cardGroupIndex].cards[cardIndex];
  }

  function getCardItem (cardGroupIndex: number, cardIndex: number, cardItemIndex: number): CardItem {
    return state.groups[cardGroupIndex].cards[cardIndex].items[cardItemIndex];
  }

  async function updateStatus () {
    const itemRef = firestore.collection('rooms').doc(state.roomId);
    const doc = await itemRef.get();
    if (!doc.exists) return false;
    await itemRef.update({ groups: state.groups });
    return true;
  }

  function subscribe () {
    const itemRef = firestore.doc('rooms/' + state.roomId);
    unsubscribeFunc.value = itemRef.onSnapshot((doc) => {
      state.groups = doc.get('groups') as Array<CardGroup>;
    });
  }

  function unsubscribe () {
    unsubscribeFunc.value();
  }

  return {
    fetchRoomData,
    removeCardGroup,
    getCardGroup,
    getCard,
    getCardItem,
    updateStatus,
    subscribe,
    unsubscribe
  };
}