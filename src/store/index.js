import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toDos: []
  },
  getters: {
    activeToDos (state) {
      return state.toDos.filter(toDo => !toDo.isDone)
    },
    doneToDos (state) {
      return state.toDos.filter(toDo => toDo.isDone)
    },
  },
  actions: {},
  mutations: {
    addToDo (state, toDo) {
      state.toDos.push(toDo)
    },
    deleteToDo (state, index) {
      state.toDos.splice(index, 1)
    },
    setToDos (state, payload) {
      state.toDos = payload
    },
    setToDosAsActive (state) {
      state.toDos.forEach(toDo => {
        toDo.isDone = false
      })
    },
    setToDosAsDone (state) {
      state.toDos.forEach(toDo => {
        toDo.isDone = true
      })
    }
  },
  modules: {}
})
