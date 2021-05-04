import { StoreonModule } from 'storeon';

export interface IImage {
  src: string;
  width: number;
  height: number;
}

export interface IItem {
  id: string;
  title: string;
  body: string;
  date: number;
  image: IImage;
}

export interface IState {
  items: IItem[];
}

export interface IEvents {
  'items/set': IItem[];
}

export type TModule = StoreonModule<IState, IEvents>;
