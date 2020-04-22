import Contructor from '../class';

const success = (data) => {
  return {
    status: 1,
    data
  };
};

const error = (err) => {
  return {
    status: 0,
    err
  };
};

const api = {
  'dom.boundingClientRect': ({id, selector}) => {
    let el = Contructor.instance(id).$el.querySelector(selector);
    return el ? success(el.getBoundingClientRect()) : error(`no match dom in [${selector}]~`);
  },

  'dom.screen': () => success({
    width: window.innerWidth,
    height: window.innerHeight,
  }),

  'navigator.push': (url) => {
    location.href = '?' + url;
    return success();
  }
};

export default (method, args) => {
  return Promise.resolve(method in api ? api[method](args) : error(`api [${method}] is not exists~`));
};