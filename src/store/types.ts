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
  isLoaded: boolean,
}

export interface IEvents {
  'items/load': IItem[];
}

export type TModule = StoreonModule<IState, IEvents>;
