import Vue from 'vue';
import Vuex from 'vuex';
import { User, Credential } from './model';
import firebase, { LoginOptions, CreateUserOptions } from 'nativescript-plugin-firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: {} as User,
  },
  mutations: {
    SET_USER(state, payload: User) {
      state.user = payload
    },
    SET_LOGGED_IN(state, payload: boolean) {
      state.loggedIn = payload;
    }
  },
  actions: {
    async loginUserEmailPassword(context, payload: Credential) {
      const firebaseLoginOptions = {
        type: firebase.LoginType.PASSWORD,
        passwordOptions: {
          email: payload.email,
          password: payload.password
        },
      } as LoginOptions;
      const response = await firebase.login(firebaseLoginOptions);
      if (response) {
        context.commit('SET_USER', {
          uid: response.uid,
          email: response.email,
          name: response.displayName
        } as User);
        context.commit('SET_LOGGED_IN', true);
      }
      else {
        context.commit('SET_LOGGED_IN', false);
      }
    },
    async loginWithGoogle(context, payload: Credential) {

    },
    async signUpEmailPassword(context, payload: CreateUserOptions) {
      const response = await firebase.createUser(payload)
      if (response) {
        context.commit('SET_USER', {
          uid: response.uid,
          email: response.email,
          name: response.displayName
        } as User);
        context.commit('SET_LOGGED_IN', true);
      }
      else {
        context.commit('SET_LOGGED_IN', false);
      }
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getLoggedIn(state) {
      return state.loggedIn;
    }
  }
});
