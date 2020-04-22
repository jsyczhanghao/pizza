import Contructor from './class';
import messager from './messager';
import 'style-loader!css-loader!~/app.pass';
import apiCall from './api';

const query = location.search.substr(1);
let [page, params] = query.split('?');
let rootMounted = false;

if (!page) {
  page = 'pages/index/index';
}

messager
  .recevie('UPDATE', ({id, vnode}) => {
    let instance = Contructor.instance(id);
    instance.$render = () => vnode;
    instance.$forceUpdate();
  }).recevie('MOUNT', ({id, vnode}) => {
    let instance = Contructor.instance(id);
    instance.$render = () => vnode;

    if (rootMounted) {
      instance.$invokeMount();
    } else {
      rootMounted = true;
      instance.$invokeMount(document.getElementById('app'));
    }
  }).recevie('API_CALL', ({
    method,
    args
  }, callback) => {
    apiCall(method, args).then(callback);
  })
  .send('PAGE_LOADED', page, (data) => {
    new Contructor(data);
  });