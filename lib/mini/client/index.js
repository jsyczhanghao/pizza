import Contructor from './class';
import { send, connect } from './messager';
import 'style-loader!css-loader!app/app.pass';

let page = 'pages/index/index';

connect((eventData) => {
  let { id, type, data } = eventData;
  let instance = Contructor.instance(id);

  switch (type) {
    case 'CREATE_ROOT':
      instance = new Contructor(data, {
        componentId: page
      });
      break;

    case 'UPDATE':
      instance.$render = () => data;
      instance.$forceUpdate();
      break;

    case 'MOUNT':
      instance.$render = () => data;
      instance.$invokeMount(id == page ? document.getElementById('app') : void 0);
  }
});
send({}, 'PAGE_LOADED', page);