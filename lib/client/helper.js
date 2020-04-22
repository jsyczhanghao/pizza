import {helper} from 'pizza';

const VIEWPORT= {
  width: window.innerWidth,
  height: window.innerHeight
};

export default {
  pick(data) {
    let _ = {};

    for (let key in data) {
      if (typeof data[key] != 'object') _[key] = data[key];
    }

    return _;
  },

  formatEvent(e) {
    let _ = this.pick(e);
    _.touches = helper.util.map(e.touches || [], (touch) => this.pick(touch));
    _.dataset = e.dataset;

    if (e.type == 'scroll') {
      _.scrollLeft = e.target.scrollLeft;
      _.scrollTop = e.target.scrollTop;
    }
    
    return _;
  }
}