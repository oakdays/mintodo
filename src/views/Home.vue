<template>
  <div class="m-5">
    <p class="text-xl font-bold mb-5">
      Mintodo 🍃
    </p>

    <form
      class="mb-5"
      @submit.prevent="addToDo"
    >
      <input
        type="text"
        class="appearance-none w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:border-green-500"
        placeholder="Write a new To Do here"
        v-model="newToDo"
      >
    </form>

    <to-do-list
      v-if="filteredToDos.length"
      :items="filteredToDos"
      @itemDelete="item => deleteToDo(item)"
      class="mb-5"
    />

    <ul class="flex mb-5">
      <li class="mr-3">
        <a
          class="inline-block rounded py-1 px-3 cursor-pointer border font-semibold"
          :class="{
            'border-green-500 bg-green-500 text-white': activeFilter === 'all',
            'hover:border-green-500 text-green-500': activeFilter !== 'all'
          }"
          @click="setFilter('all')"
        >
          All
        </a>
      </li>
      <li class="mr-3">
        <a
          class="inline-block rounded py-1 px-3 cursor-pointer border font-semibold"
          :class="{
            'border-green-500 bg-green-500 text-white': activeFilter === 'active',
            'hover:border-green-500 text-green-500': activeFilter !== 'active'
          }"
          @click="setFilter('active')"
        >
          Active
        </a>
      </li>
      <li class="mr-3">
        <a
          class="inline-block rounded py-1 px-3 cursor-pointer border font-semibold"
          :class="{
            'border-green-500 bg-green-500 text-white': activeFilter === 'done',
            'hover:border-green-500 text-green-500': activeFilter !== 'done'
          }"
          @click="setFilter('done')"
        >
          Done
        </a>
      </li>
    </ul>

    <button
      class="bg-white hover:border-green-300 py-2 px-4 border rounded shadow focus:outline-none focus:border-green-500"
      @click="completeAllToDos"
    >
      Check all
    </button>

    <button
      class="bg-white float-right hover:border-green-300 py-2 px-4 border rounded shadow focus:outline-none focus:border-green-500"
      @click="deleteDoneToDos"
    >
      Clear completed
    </button>
  </div>
</template>

<script>
import ToDoList from '@/components/ToDoList'

export default {
  components: {
    ToDoList
  },
  data () {
    return {
      newToDo: '',
      toDos: [],
      activeFilter: 'all'
    }
  },
  computed: {
    activeToDos () {
      return this.toDos.filter(toDo => !toDo.isDone)
    },
    doneToDos () {
      return this.toDos.filter(toDo => toDo.isDone)
    },
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
    addToDo () {
      if (this.newToDo) {
        this.toDos.push({
          text: this.newToDo,
          isDone: false
        })
        this.newToDo = ''
      }
    },
    completeAllToDos () {
      this.toDos.forEach(toDo => {
        toDo.isDone = true
      })
    },
    deleteDoneToDos () {
      this.toDos = this.activeToDos
    },
    deleteToDo (item) {
      this.toDos.splice(this.toDos.indexOf(item), 1)
    },
    setFilter (filter) {
      this.activeFilter = filter
    }
  }
}
</script>
