
export type TemplateType = 'default' | 'sw' | 'goblinSlayer';

export type CharacterParameter = {
  name: string,
  current: number,
  max: number,
  color: string
};

export type CharacterPart = {
  id: string,
  name: string
  parameters: Array<CharacterParameter>
};

export type Character = {
  id: string,
  name: string,
  parts: Array<CharacterPart>,
  order: number
};

export type Room = {
  roomId: string,
  name: string,
  template: TemplateType
};

export type State = {
  room: Room,
  characters: Array<Character>
};

export type FormState = {
  name: string,
  password: string,
  link: string
}
