import { ref } from '@vue/composition-api';
import { State, CardGroup, Card, CardItem } from '@/types/statusBoardType';
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

  function addCard (cardGroupIndex: number, name: string) {
    const card = template.createEmptyCard(state.template);
    card.name = name;
    state.groups[cardGroupIndex].cards.push(card);
  }

  function removeCardGroup (cardGroupIndex: number) {
    state.groups.slice(cardGroupIndex, 1);
  }

  function removeCard (cardGroupIndex: number, cardIndex: number) {
    state.groups[cardGroupIndex].cards.slice(cardIndex, 1);
  }

  async function updateStatus () {
    const itemRef = firestore.collection('rooms').doc(state.roomId);
    const doc = await itemRef.get();   
    if (!doc.exists) return false;
    await itemRef.update({ groups: state.groups });
    return true;
  }

  async function updateCard(cardGroupIndex: number, cardIndex: number, card: Card) {
    state.groups[cardGroupIndex].cards[cardIndex] = card;
    await updateStatus();
  }

  async function updateCardItem(cardGroupIndex: number, cardIndex: number, cardItemIndex: number, cardItem: CardItem) {
    state.groups[cardGroupIndex].cards[cardIndex].items[cardItemIndex] = cardItem;
    await updateStatus();
  }


  function subscribe () {
    const itemRef = firestore.doc('rooms/' + state.roomId);
    unsubscribeFunc.value = itemRef.onSnapshot((doc) => {
      console.log('test');
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
    removeCardGroup,
    removeCard,
    updateStatus,
    updateCard,
    updateCardItem,
    subscribe,
    unsubscribe
  };
}