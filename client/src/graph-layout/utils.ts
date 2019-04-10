const removeAt = <T extends any[]>(arr: T, i: number) => [
  ...arr.slice(0, i),
  ...arr.slice(i + 1)
];

export { removeAt };
