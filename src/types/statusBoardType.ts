
export type CardItem = {
  label: string,
  current: number,
  max: number
};

export type Card = {
  name: string,
  items: Array<CardItem>
};

export type CardGroup = {
  name: string,
  cards: Array<Card>
};

export type State = {
  roomId: string,
  groups: Array<CardGroup>,
  template: string
};

export type FormState = {
  roomId: string,
  dialog: boolean
};