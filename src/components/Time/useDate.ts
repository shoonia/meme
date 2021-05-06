interface IReturnedDate {
  label?: string;
  iso?: string;
  a11y?: string;
}

export const useDate = (date: number): IReturnedDate => {
  const t = new Date(date);

  return t.toString() !== 'Invalid Date'
    ? {
      label: t.toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }),
      a11y: t.toLocaleString([], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      iso: t.toISOString(),
    }
    : {};
};
