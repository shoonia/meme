export const getElementById = (id: string): HTMLElement => {
  return document.getElementById(id) as HTMLElement;
};

export const classNames = (...className: (string | undefined | false)[]): string => {
  return className.filter(Boolean).join(' ');
};

export const isUndefined = (val: unknown): val is undefined => {
  return typeof val === 'undefined';
};
