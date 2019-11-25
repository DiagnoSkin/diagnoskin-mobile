import Vue from 'vue';
import Vuex from 'vuex';
import { User } from 'nativescript-plugin-firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: {} as User,
  },
  mutations: {
    SET_LOGGED_OUT(state) {
      state.user = null
      state.loggedIn = false
    },
    SET_LOGGED_IN(state, user) {
      state.user = user
      state.loggedIn = true
    },
  },
  actions: {
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getLoggedIn(state) {
      return state.loggedIn
    }
  }
});
