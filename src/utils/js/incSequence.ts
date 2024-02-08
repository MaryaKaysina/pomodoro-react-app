interface ISequence {
  id: number;
  [key: string]: any;
}

export const incSequence = (data: ISequence[]): number => {
  return data
    .sort((a, b) => b.id - a.id)
    .slice(0, 1)[0].id + 1 || 0;
}
