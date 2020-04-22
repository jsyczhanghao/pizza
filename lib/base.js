import Pizza from 'pizza';

let INSTANCES = {};

export default class extends Pizza {
  constructor(componentOptions, options = {}) {
    super(componentOptions, options);
    INSTANCES[this.$componentId] = this;
  }

  static instance(id) {
    return INSTANCES[id];
  }
}