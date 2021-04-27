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
