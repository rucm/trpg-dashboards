
export type CardItem = {
  label: string,
  current: number,
  max: number,
  color: string
};

export type Card = {
  name: string,
  items: Array<CardItem>
};

export type CardGroup = {
  name: string,
  cards: Array<Card>
};

export type CharacterPartItemMessage = {
  add: string,
  sub: string,
  cancel: string
};

export type CharacterPartItem = {
  name: string,
  current: number,
  max: number,
  color: string,
  msg: CharacterPartItemMessage
};

export type CharacterPart = {
  name: string,
  items: Array<CharacterPartItem>
};

export type Character = {
  name: string,
  parts: Array<CharacterPart>
};

export type State = {
  roomId: string,
  groups: Array<CardGroup>,
  characters: Array<Character>,
  template: string
};

export type FormState = {
  roomId: string,
  errorMessages: Array<string>
};