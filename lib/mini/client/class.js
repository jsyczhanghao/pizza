import BaseContructor from '../base';
import {
  PizzaContructor,
  helper,
} from 'pizza';
import {
  send
} from './messager';
import util from './helper';

const $update = helper.util.throttle(function () {
  send(this, 'CLIENT_INVOKE_UPDATE', {
    props: this.$propsData,
    context: this.$context ? this.$context.$componentId : null
  });
}, 0);


class MiniClientPizza extends BaseContructor {
  constructor(componentOptions, options = {}) {
    super(componentOptions, options);
    send(this, 'CLIENT_CREATED', {
      props: this.$propsData,
      context: this.$context ? this.$context.$componentId : null,
      component: this.$componentName,
    });
  }

  $invoke(method, argv1, ...args) {
    if (/\[object \w*Event\]/.test(Object.prototype.toString.call(argv1))) {
      argv1 = util.formatEvent(argv1);
    }

    send(this, 'CLIENT_INVOKE', [method, argv1, ...args]);
  }

  $update() {
    $update.call(this);
  }

  $mount(element) {
    this._mountElement = element;
  }

  $invokeMount(element) {
    super.$mount(element);
  }
}


export default PizzaContructor.set(MiniClientPizza);