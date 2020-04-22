import BaseContructor from '../base';
import {
  PizzaContructor
} from 'pizza';
import messager from './messager';

class MiniPizza extends BaseContructor {
  _patch(vnode) {
    this.$vnode = vnode;
    messager.send(this.$mounted ? 'UPDATE' : 'MOUNT', {
      id: this.$componentId,
      vnode,
    });
  }
}

export default PizzaContructor.set(MiniPizza);