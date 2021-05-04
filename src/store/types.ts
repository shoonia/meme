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
  date: string;
  image: IImage;
}

export interface ICache {
  [key: string]: IItem[];
}

export interface IState {
  items: IItem[];
  cache: ICache;
}

export interface IEvents {
  'items/set': IItem[];
}

export type TModule = StoreonModule<IState, IEvents>;
