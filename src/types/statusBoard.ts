
export type TemplateType = 'default' | 'sw' | 'goblinSlayer';

export type CharacterParameter = {
  partsName: string,
  name: string,
  current: number,
  max: number,
  color: string,
};

export type Character = {
  id: string,
  name: string,
  parameters: Array<CharacterParameter>
  order: number
};

export type Room = {
  roomId: string,
  template: TemplateType
};

export type State = {
  roomId: string,
  template: TemplateType,
  characters: Array<Character>
};
