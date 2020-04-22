export default class {
  constructor(messager) {
    this.messager = messager;
    this.listeners = {};
    this.messager.addEventListener('message', (event) => {
      let {id, type, data} = event.data;
      data = data == null ? data : JSON.parse(data);
      this.listeners[type] && this.listeners[type](data, this.send.bind(this, id));
    });
  }

  recevie(type, fn, once) {
    this.listeners[type] = (...args) => {
      fn(...args);
      once && delete this.listeners[type];
    };

    return this;
  }

  send(type, data, callback) {
    let id = `${Math.random()}#${Math.random()}`;
    this.messager.postMessage({
      id,
      data: data ? JSON.stringify(data) : null,
      type
    }, void 0);
    callback && this.recevie(id, callback, true);
  }
}