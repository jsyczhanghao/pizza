import Contructor from './class';
import { connect, send } from './messager';
import {install} from './components';
import App from 'app/app';
import configs from 'app/app.json';
import messager from '../messager';

let Pages = {};
let currentPageOptions;

configs.pages.map((page) => {
  import(`app/${page}`).then((options) => {
    Pages[page] = options.default;
  })
});

install(Contructor);
connect((eventData) => {
  let { id, type, data } = eventData;
  let instance = Contructor.instance(id);

  switch (type) {
    case 'PAGE_LOADED':
      send({}, 'CREATE_ROOT', currentPageOptions = Pages[data]);
      break;

    case 'CLIENT_CREATED':
      let context = Contructor.instance(data.context);
      let componentOptions = data.context == undefined ? currentPageOptions : context.$components[data.component];
      new Contructor(componentOptions, {
        context,
        props: data.props,
        componentName: data.component,
        componentId: id
      }).$mount();
      break;

    case 'CLIENT_INVOKE_UPDATE':
      instance.$setPropsData(data.props);
      instance.$update();
      break;

    case 'CLIENT_INVOKE':
      instance.$invoke(...data);
      break;
  };
});

// messager.receive('PAGE_LOADED', (data) => {
//   messager.send('CREATE_ROOT', currentPageOptions = Pages[data]);
// });

// messager.receive('CLIENT_CREATED', () => {

// });