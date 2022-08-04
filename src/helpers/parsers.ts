import { lookup } from "../domain/lookupTables";
//string methods
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const deCamelize = (str: string) => {
  return str
    .split("")
    .map((char, i) => {
      if (i === 0) {
        char = char.toUpperCase();
      }
      return char === char.toUpperCase() ? ` ${char}` : char;
    })
    .join("");
}


export function getPartyNameById(id: string) {
  return deCamelize(lookup[id].name || lookup[id].id) 
}


//object methods
export const adaptToList = () => {
  
}