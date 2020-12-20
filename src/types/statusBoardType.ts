
export interface CardItem {
  label: string,
  value: number
};

export interface Card {
  label: string,
  parts: Array<CardItem>
};

export interface State {
  id: number,
  cards: Array<Card>,
  createdAt: Date,
  updatedAt: Date
};