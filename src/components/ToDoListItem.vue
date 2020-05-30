<template>
  <div class="mb-1">
    <input
      v-if="!isEditing"
      class="mr-2 leading-tight"
      type="checkbox"
      v-model="item.isDone"
    >

    <span
      v-if="!isEditing"
      class="cursor-pointer"
      :class="{'line-through text-gray-500':  item.isDone}"
      @click="startEditingItem"
    >
      {{ item.text }}
    </span>
    <form
      v-else
      @submit.prevent="editItem"
    >
      <input
        type="text"
        class="appearance-none w-full border rounded py-1 px-2 leading-tight focus:outline-none focus:border-green-500"
        v-model="draftItemText"
        :ref="`toDo${index}`"
      >
    </form>

    <span
      v-if="!isEditing"
      class="float-right font-bold cursor-pointer"
      @click="emitDelete"
    >
      x
    </span>
  </div>
</template>

<script>
export default {
  props: {
    // Item structure: { text: string, isDone: boolean }
    index: { type: Number, default: 0 },
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