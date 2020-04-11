import Messager from '../messager';
import Contructor from './class';
import Worker from '../background';

let messager;

export const connect = (fn) => {
  messager = new Messager(Worker(), fn);
};

export const send = (...args) => {
  messager.send(...args);
};