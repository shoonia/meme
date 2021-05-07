export const getElementById = (id: string): HTMLElement => {
  return document.getElementById(id) as HTMLElement;
};

export const isUndefined = (val: unknown): val is undefined => {
  return typeof val === 'undefined';
};
