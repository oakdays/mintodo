<template>
  <div class="mb-1">
    <form
      v-if="isEditing"
      @submit.prevent="editItem"
    >
      <input
        type="text"
        class="appearance-none w-full border rounded py-1 px-2 leading-tight focus:outline-none focus:border-green-500"
        v-model="draftItemText"
        :ref="`toDo${index}`"
      >
    </form>

    <template v-else>
      <input
        class="mr-2 leading-tight"
        type="checkbox"
        v-model="item.isDone"
      >

      <span
        class="cursor-pointer"
        :class="{'line-through text-gray-500':  item.isDone}"
        @click="startEditingItem"
      >
        {{ item.text }}
      </span>

      <span
        class="float-right font-bold cursor-pointer"
        @click="emitDelete"
      >
        x
      </span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    // Needed for having a dynamic ref to the editing input
    index: { type: Number, default: 0 },
    // Item structure: { text: string, isDone: boolean }
    item: { type: Object, default: () => {} }
  },
  data () {
    return {
      isEditing: false,
      draftItemText: ''
    }
  },
  methods: {
    startEditingItem () {
      this.draftItemText = this.item.text
      this.isEditing = true
      this.$nextTick(() => {
        this.$refs[`toDo${this.index}`].focus()
      })
    },
    editItem () {
      this.item.text = this.draftItemText
      this.isEditing = false
    },
    emitDelete () {
      this.$emit('delete')
    }
  }
}
</script>