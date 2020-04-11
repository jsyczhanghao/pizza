import Messager from '../messager';
import Contructor from './class';

let messager;

export const connect = (fn) => {
  messager = new Messager(self, fn);
};

export const send = (...args) => {
  messager.send(...args);
};