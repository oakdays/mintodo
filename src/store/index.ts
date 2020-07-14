import Vue from 'vue'
import Vuex from 'vuex'
import { ToDo, State } from 'types'

Vue.use(Vuex)

const state: State = {
  toDos: []
}

export default new Vuex.Store({
  state,
  getters: {
    activeToDos (state) {
      return state.toDos.filter((toDo: ToDo) => !toDo.isDone)
    },
    doneToDos (state) {
      return state.toDos.filter((toDo: ToDo) => toDo.isDone)
    },
  },
  actions: {},
  mutations: {
    addToDo (state, toDo: ToDo) {
      state.toDos.push(toDo)
    },
    deleteToDo (state, index: number) {
      state.toDos.splice(index, 1)
    },
    setToDos (state, payload: ToDo[]) {
      state.toDos = payload
    },
    setToDosAsActive (state) {
      state.toDos.forEach((toDo: ToDo) => {
        toDo.isDone = false
      })
    },
    setToDosAsDone (state) {
      state.toDos.forEach((toDo: ToDo) => {
        toDo.isDone = true
      })
    }
  },
  modules: {}
})
