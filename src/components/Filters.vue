<template>
  <ul class="flex mb-5">
    <li
      v-for="(option, index) in options"
      :key="index"
      class="mr-3"
    >
      <a
        class="inline-block rounded py-1 px-3 cursor-pointer border font-semibold"
        :class="{
          'border-green-500 bg-green-500 text-white': value === option.toLowerCase(),
          'hover:border-green-500 text-green-500': value !== option.toLowerCase()
        }"
        @click="setFilter(option.toLowerCase())"
      >
        {{ option }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

interface FiltersData {
  activeFilter: string
}

export default Vue.extend({
  props: {
    value: { type: String, default: '' },
    options: { type: Array, default: () => [] }
  },
  data (): FiltersData {
    return {
      activeFilter: ''
    }
  },
  watch: {
    activeFilter (val: string) {
      this.$emit('input', val)
    },
    value (val: string) {
      this.activeFilter = val
    }
  },
  methods: {
    setFilter (option: string) {
      this.activeFilter = option
    }
  }
})
</script>
