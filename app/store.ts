import Vue from 'vue';
import Vuex from 'vuex';
import { User } from 'nativescript-plugin-firebase';
import firebase, { LoginOptions, CreateUserOptions } from 'nativescript-plugin-firebase';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: {} as User,
    observations: []
  },
  mutations: {
    ADD_OBSERVATION(state, payload){
      state.observations.push(payload)
    },
    CLEAR_OBSERVATIONS(state, payload){
      state.observations = []
    },
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
    saveImage({commit, state}, payload){
      let db = firebase.firestore
      db.collection("users").doc(state.user.uid).collection("observations")
      .add(
        {
          'date': Date.now(),
          'location': payload.part,
          'nickname': payload.name,
          'side' : payload.side,
          'info': payload.info,
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
          alert('Form uploaded!')
        })
      })
    },
    getObservationCollerction({commit, state}){
      commit('CLEAR_OBSERVATIONS')
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
      return state.user
    },
    getLoggedIn(state) {
      return state.loggedIn
    },
    getObservations(state) {
      return state.observations;
    }
  }
});
