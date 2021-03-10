
export type TemplateType = 'default' | 'sw' | 'goblinslayer';

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
