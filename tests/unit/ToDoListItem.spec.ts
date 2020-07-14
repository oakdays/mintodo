// @ts-nocheck
import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import ToDoListItem from '@/components/ToDoListItem.vue'

// Mount the component
const wrapper = shallowMount(ToDoListItem)

// Here are some Jest tests, though you can
// use any test runner/assertion library combo you prefer
describe('ToDoListItem', () => {
  it('isn\'t rendered without an item', () => {
    // use default props, item is null by default
    expect(wrapper.find('#to-do-0').exists()).toBe(false)
  })

  it('renders everything but the edit input with normal props', async () => {
    wrapper.setProps({
      index: 0,
      item: {
        isDone: false,
        text: 'Task 1'
      }
    })
    await Vue.nextTick()

    expect(wrapper.find('#to-do-0').exists()).toBe(true)
    expect(wrapper.find('#to-do-0-input').exists()).toBe(false)
  })

  it('shows edit input if the item text is clicked on', async () => {
    wrapper.setProps({
      index: 0,
      item: {
        isDone: false,
        text: 'Task 1'
      }
    })
    await Vue.nextTick()

    expect(wrapper.find('#to-do-0-input').exists()).toBe(false)
    await wrapper.find('#to-do-0-text').trigger('click')

    expect(wrapper.find('#to-do-0-input').exists()).toBe(true)
  })

  it('edits the item text if the input is submitted', async () => {
    wrapper.setProps({
      index: 0,
      item: {
        isDone: false,
        text: 'Task 1'
      }
    })
    wrapper.setData({
      draftItemText: 'Task 2',
      isEditing: true
    })
    await Vue.nextTick()

    const editInput = wrapper.find('#to-do-0-input')
    await editInput.trigger('submit')

    expect(wrapper.find('#to-do-0-input').exists()).toBe(false)
    expect(wrapper.vm.isEditing).toBe(false)
    expect(wrapper.vm.item.text).toBe('Task 2')
  })

  it('emits a delete event when the x is clicked on', async () => {
    wrapper.setProps({
      index: 0,
      item: {
        isDone: false,
        text: 'Task 1'
      }
    })
    await Vue.nextTick()
    await wrapper.find('#to-do-0-x').trigger('click')

    expect(wrapper.emitted().delete).toBeTruthy()
  })
})