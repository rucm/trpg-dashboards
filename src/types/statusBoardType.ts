
export type TemplateType = 'default' | 'sw' | 'goblinSlayer';

export type CharacterPartItemMessage = {
  add: string,
  sub: string,
  cancel: string
};

export type CharacterPartItem = {
  id: string,
  name: string,
  current: number,
  max: number,
  color: string,
  msg: CharacterPartItemMessage
};

export type CharacterPart = {
  id: string,
  name: string,
  items: Array<CharacterPartItem>,
  order: number
};

export type Character = {
  id: string,
  name: string,
  parts: Array<CharacterPart>,
  order: number
};

export type State = {
  roomId: string,
  characters: Array<Character>,
  template: TemplateType
};
