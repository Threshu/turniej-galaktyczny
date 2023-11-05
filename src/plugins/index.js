import vuetify from './vuetify';
import pinia from '../store';
import router from '../router';
//import firebase from './firebase';

export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    //.use(firebase);
}
