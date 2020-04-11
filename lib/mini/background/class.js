import BaseContructor from '../base';
import {PizzaContructor} from 'pizza';
import { send } from './messager';

class MiniPizza extends BaseContructor {
  _patch(vnode) {
    this.$vnode = vnode;
    send(this, this.$mounted ? 'UPDATE' : 'MOUNT', vnode);
  }
}

export default PizzaContructor.set(MiniPizza);