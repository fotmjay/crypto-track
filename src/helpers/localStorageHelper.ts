import { Token } from "../shared/types/types";

export const lsGet = {
  list: (key: string) => {
    const list = localStorage.getItem(key);
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  },
  date: (key: string) => {
    const date = localStorage.getItem(key);
    if (date) {
      return Date.parse(date);
    } else {
      return undefined;
    }
  },
  prices: (key: string) => {
    const obj = localStorage.getItem(key);
    if (obj) {
      return JSON.parse(obj);
    } else {
      return {};
    }
  },
};

export const lsSet = {
  date: (key: string) => {
    const date = new Date().toISOString();
    localStorage.setItem(key, date);
    return Date.parse(date);
  },
};

export const lsKey = {
  format: (token: Token) => {
    return `${token.id}Transactions`;
  },
};
