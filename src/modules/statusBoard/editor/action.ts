import { ref } from '@vue/composition-api';
import { State, CardGroup } from '@/types/statusBoardType';
import { useEmptyCardTemplate } from '@/modules/statusBoard/template';
import { firestore } from '@/plugins/firebase';


export const useStatusBoardActions = (state: State) => {

  const template = useEmptyCardTemplate();
  const unsubscribeFunc = ref<Function>(() => true);

  async function fetchRoomData (roomId: string) {
    const itemRef = await firestore.collection('rooms').doc(roomId);
    const doc = await itemRef.get();
    
    if (!doc.exists) return false;

    state.roomId = roomId;
    state.template = doc.get('template') as string;
    state.groups = doc.get('groups') as Array<CardGroup>;

    return true;
  }

  function addCardGroup (name: string) {
    const cardGroup = template.createEmptyCardGroup(state.template);
    cardGroup.name = name;
    state.groups.push(cardGroup);
  }

  function addCard (index: number, name: string) {
    const card = template.createEmptyCard(state.template);
    card.name = name;
    state.groups[index].cards.push(card);
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
    addCardGroup,
    addCard,
    subscribe,
    unsubscribe
  };
}