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

<script>
import ToDoListItem from './ToDoListItem'

export default {
  components: {
    ToDoListItem
  },
  props: {
    items: { type: Array, default: () => [] }
  },
  methods: {
    emitDelete (item) {
      this.$emit('itemDelete', item)
    }
  }
}
</script>