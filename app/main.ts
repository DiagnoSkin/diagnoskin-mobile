import Vue from 'nativescript-vue';
import Login from '@/views/Login.vue';
import firebase from 'nativescript-plugin-firebase';
import store from './store';

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
firebase.init({})
  .then(() => console.log('Firebase initialized'))
  .catch(() => console.log('Could not initialize firebase'));

new Vue({
  store,
  render: h => h('frame', [h(Login)])
}).$start()
