export default class {
  constructor(messager, fn) {
    this.messager = messager;
    this.messager.addEventListener('message', (event) => {
      event.data.data = event.data.data == null ? null : JSON.parse(event.data.data);
      fn(event.data);
    });
  }

  send(instance, type, data) {
    this.messager.postMessage({
      id: instance.$componentId,
      data: data ? JSON.stringify(data) : null,
      type
    }, void 0);
  }
}