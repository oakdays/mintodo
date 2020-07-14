<template>
  <div>
    <to-do-list-item
      v-for="(item, index) in items"
      :key="index"
      :index="index"
      :item="item"
      @delete="emitDelete(item)"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import ToDoListItem from './ToDoListItem.vue'
import { ToDo } from '../../types'

export default Vue.extend({
  components: {
    ToDoListItem
  },
  props: {
    items: { type: Array as PropType<ToDo[]>, default: () => [] }
  },
  methods: {
    emitDelete (item: ToDo) {
      this.$emit('itemDelete', item)
    }
  }
})
</script>