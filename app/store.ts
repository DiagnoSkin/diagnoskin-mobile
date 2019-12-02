import Vue from 'vue';
import Vuex from 'vuex';
import { User, Credential } from './model';
import firebase, { LoginOptions, CreateUserOptions } from 'nativescript-plugin-firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: {} as User,
    observations: []
  },
  mutations: {
    SET_USER(state, payload: User) {
      state.user = payload
    },
    SET_LOGGED_IN(state, payload: boolean) {
      state.loggedIn = payload;
    },
    ADD_OBSERVATION(state, payload){
      state.observations.push(payload)
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
    async loginUserAnon(context) {
      const firebaseLoginOptions = {
        type: firebase.LoginType.ANONYMOUS
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
    },
    saveImage({commit, state}, payload){
      let db = firebase.firestore
      db.collection("users").doc(state.user.uid).collection("observations")
      .add(
        {
          'date': Date.now(),
          'location': payload.part,
          'nickname': 'xdxd',
          'photoPath': ``
        }
      )
      .then(result => {
        firebase.storage
        .uploadFile({
          remoteFullPath: `/${state.user.uid}/${result.id}/z1.jpg`,
          localFullPath: payload.src,
          onProgress: function(status) {
            console.log("Uploaded fraction: " + status.fractionCompleted);
            console.log("Percentage complete: " + status.percentageCompleted);
          }
        })
        .then(a => {
          // alert('Form uploaded!')
        })
      })
    },
    getObservationCollerction({commit, state}){
      // alert("listening")
      let db = firebase.firestore;
      db.collection("users").doc(state.user.uid).collection("observations")
        .onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
              if (change.type === "added") {
                  console.log("New city gggg: ", change.doc.data());
                  let newObj = {
                    date: change.doc.data().date,
                    part: change.doc.data().location
                  }
                  commit('ADD_OBSERVATION', newObj)
              }
              if (change.type === "modified") {
                  console.log("Modified city: ", change.doc.data());
              }
              if (change.type === "removed") {
                  console.log("Removed city: ", change.doc.data());
              }
          });
        });
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getLoggedIn(state) {
      return state.loggedIn;
    },
    getObservations(state) {
      return state.observations;
    }
  }
});
