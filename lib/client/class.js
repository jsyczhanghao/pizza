import BaseContructor from '../base';
import {
  PizzaContructor,
  helper,
  config,
} from 'pizza';
import messager from './messager';
import util from './helper';

const $update = helper.util.throttle(function () {
  messager.send('CLIENT_INVOKE_UPDATE', {
    id: this.$componentId,
    props: this.$propsData,
    events: this.$eventsData,
    context: this.$context ? this.$context.$componentId : null
  });
}, 0);

class MiniClientPizza extends BaseContructor {
  constructor(componentOptions, options = {}) {
    super(componentOptions, {
      ...options,
      componentId: Math.random()
    });
    messager.send('CLIENT_CREATED', {
      props: this.$propsData,
      events: this.$eventsData,
      context: this.$context ? this.$context.$componentId : null,
      component: this.$componentName,
      id: this.$componentId,
    });
  }

  $invoke(method, argv1, ...args) {
    if (/\[object \w*Event\]/.test(Object.prototype.toString.call(argv1))) {
      argv1 = util.formatEvent(argv1);
    }

    messager.send('CLIENT_INVOKE', {
      id: this.$componentId,
      method,
      args: [argv1, ...args]
    });
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

config.prefixs.component = 'pizza-';
export default PizzaContructor.set(MiniClientPizza);