export const total = (instruments: any, key: string) => {
  type Object = { [x: string]: any; }
  const k = `${key}`
  return instruments.reduce(
    (a: Object, c: Object) => {
      return { [k]: a[k] + c[k] };
    },
    { [k]: 0 }
  )[k];
};