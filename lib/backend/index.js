import './support';
import api from './api';
import Contructor from './class';
import messager from './messager';
import bootstrap from './bootstrap';
import {
  install
} from './components';
import app, {
  Pages
} from '~/app.js';

let currentPageOptions;

install(Contructor);

messager
  .recevie('PAGE_LOADED', (data, callback) => {
    callback(currentPageOptions = Pages[data]);
    api.system.config(Pages[data].configs);
  })
  .recevie('CLIENT_CREATED', (data) => {
    let context = data.context ? Contructor.instance(data.context) : null;
    let componentOptions = !context ? currentPageOptions : context.$components[data.component];
    new Contructor(componentOptions, {
      context,
      props: data.props,
      events: data.events,
      componentName: data.component,
      componentId: data.id
    }).$mount();
  })
  .recevie('CLIENT_INVOKE_UPDATE', (data) => {
    let instance = Contructor.instance(data.id);
    instance.$setPropsData(data.props);
    instance.$setEventsData(data.events);
    instance.$update();
  })
  .recevie('CLIENT_INVOKE', (data) => {
    Contructor.instance(data.id).$invoke(data.method, ...data.args);
  });

bootstrap(app);