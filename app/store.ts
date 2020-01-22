import Vue from 'vue';
import Vuex from 'vuex';
import { User } from 'nativescript-plugin-firebase';
import firebase, { LoginOptions, CreateUserOptions } from 'nativescript-plugin-firebase';
import App from '@/views/App.vue'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: {} as User,
    observations: [],
    observationPhotos: [],
    currentObservation: {}
    
  },
  mutations: {
    ADD_OBSERVATION(state, payload){
      state.observations.push(payload)
    },
    ADD_OBSERVATION_PHOTO(state, payload){
      state.observationPhotos.push(payload)
    },
    CLEAR_OBSERVATIONS(state, payload){
      state.observations = []
    },
    CLEAR_OBSERVATION_PHOTO(state, payload){
      state.observationPhotos = []
    },
    SET_CURRENT_OSERVATION(state, payload){
      state.currentObservation = payload;
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
    async saveImage({commit, state}, payload){
      let nameDate = Date.now(),
      db = firebase.firestore;
      const result = await db.collection("users").doc(state.user.uid).collection("observations")
        .add({
            'date': nameDate,
            'location': payload.part,
            'nickname': payload.name,
            'side' : payload.side,
            'info': payload.info,
            'photoPath': ``
        })
      const a = await firebase.storage.uploadFile({
        remoteFullPath: `/${state.user.uid}/${result.id}/${nameDate}`,
        localFullPath: payload.src,
        onProgress: function(status) {
          console.log("Uploaded fraction: " + status.fractionCompleted);
          console.log("Percentage complete: " + status.percentageCompleted);
        }
      })
      const r = await db.collection("users").doc(state.user.uid).collection("observations").doc(result.id).collection("photos").add({
          'photoPath' : `/${state.user.uid}/${result.id}/${nameDate}`,
          'date': nameDate
        })
    },
    saveAdditionalImage({commit, state}, payload){
      let nameDate = Date.now(),
        db = firebase.firestore;
      db.collection("users").doc(state.user.uid).collection("observations").doc(state.currentObservation.id).collection('photos')
      .add(
        {
          'photoPath': `/${state.user.uid}/${state.currentObservation.id}/${nameDate}`,
          'date': nameDate
        }
      ).then(result => {
        firebase.storage
        .uploadFile({
          remoteFullPath: `/${state.user.uid}/${state.currentObservation.id}/${nameDate}`,
          localFullPath: payload.src,
          onProgress: function(status) {
            console.log("Uploaded fraction: " + status.fractionCompleted);
            console.log("Percentage complete: " + status.percentageCompleted);
          }
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
                  console.log("xddddddddddddddddddddd",change.doc.id)
                  let newObj = {
                    id: change.doc.id,
                    nickname: change.doc.data().nickname,
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
    },
    async getObservationPhotos({commit, state}){
      commit('CLEAR_OBSERVATION_PHOTO')
      let db = firebase.firestore;
      const  q = await db.collection("users").doc(state.user.uid).collection("observations").doc(state.currentObservation.id).collection('photos').get()
      for(let index = 0; index < q.docs.length; index++){
        let path = q.docs[index].data().photoPath;
        let date = q.docs[index].data().date
        let downloadedFile = await firebase.storage.getDownloadUrl({
          bucket: 'gs://diagnoskin-48e89.appspot.com/',
          remoteFullPath: path
        })
        commit('ADD_OBSERVATION_PHOTO', {downloadedFile, date})
      }
      // q.docs.forEach(doc => {
      //   let path = doc.data().photoPath;
      //   console.log(path, '---------------------------------------------')
      //   let downloadedFile = firebase.storage.getDownloadUrl({
      //     bucket: 'gs://diagnoskin-48e89.appspot.com/',
      //     remoteFullPath: path
      //   }).then(downloadedFile => {
      //     // alert('xd')
      //     console.log(downloadedFile)
      //     commit('ADD_OBSERVATION_PHOTO', {downloadedFile})
      //   }
      //   )
      // })
    },
    setCurrentObservation ({commit, state}, payload) {
      commit('SET_CURRENT_OSERVATION', payload.observation)
    }
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getCurrentObservation(state){
      return state.currentObservation
    },
    getLoggedIn(state) {
      return state.loggedIn
    },
    getObservations(state) {
      return state.observations;
    },
    getObservationPhotos(state) {
      return state.observationPhotos;
    }
  }
});
