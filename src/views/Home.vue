<template>
  <div class="m-5">
    <p class="text-xl font-bold mb-5">
      Mintodo 🍃
    </p>

    <form
      class="mb-5"
      @submit.prevent="addNewToDo"
    >
      <input
        type="text"
        class="appearance-none w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:border-green-500"
        placeholder="Write a new To Do here"
        v-model="newToDo"
      >
    </form>

    <filters
      v-if="toDos.length"
      v-model="activeFilter"
      :options="filters"
    />

    <to-do-list
      v-if="filteredToDos.length"
      :items="filteredToDos"
      @itemDelete="item => deleteToDo(toDos.indexOf(item))"
      class="mb-5"
    />

    <template v-if="filteredToDos.length">
      <button
        class="bg-white hover:border-green-300 py-2 px-4 mr-2 border rounded shadow focus:outline-none focus:border-green-500"
        @click="setToDosAsDone"
      >
        Check all
      </button>
      <button
        class="bg-white hover:border-green-300 py-2 px-4 border rounded shadow focus:outline-none focus:border-green-500"
        @click="setToDosAsActive"
      >
        Uncheck all
      </button>

      <button
        class="bg-white float-right hover:border-green-300 py-2 px-4 border rounded shadow focus:outline-none focus:border-green-500"
        @click="setToDos(activeToDos)"
      >
        Clear completed
      </button>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import Filters from '@/components/Filters'
import ToDoList from '@/components/ToDoList'

export default {
  components: {
    Filters,
    ToDoList
  },
  data () {
    return {
      activeFilter: 'all',
      filters: ['All', 'Active', 'Done'],
      newToDo: ''
    }
  },
  computed: {
    ...mapState({
      toDos: state => state.toDos
    }),
    ...mapGetters([
      'activeToDos',
      'doneToDos'
    ]),
    filteredToDos () {
      switch (this.activeFilter) {
        case 'all':
          return this.toDos
        case 'active':
          return this.activeToDos
        case 'done':
          return this.doneToDos
        default:
          return this.toDos
      }
    }
  },
  methods: {
    ...mapMutations([
      'addToDo',
      'deleteToDo',
      'setToDos',
      'setToDosAsActive',
      'setToDosAsDone',
    ]),
    addNewToDo () {
      if (this.newToDo) {
        this.addToDo({
          text: this.newToDo,
          isDone: false
        })
        this.newToDo = ''
      }
    },
    setFilter (filter) {
      this.activeFilter = filter
    }
  }
}
</script>
