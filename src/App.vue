<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useTodoStore } from '@/stores/todo.store'

const todoStore = useTodoStore()
const title = ref('')
const filter = ref<'all' | 'active' | 'done'>('all')

let stopRealtime: null | (() => void) = null

const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todoStore.todos.filter((todo) => !todo.is_done)
  }

  if (filter.value === 'done') {
    return todoStore.todos.filter((todo) => todo.is_done)
  }

  return todoStore.todos
})

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => {
  stopRealtime?.()
})

async function onAdd() {
  await todoStore.addTodo(title.value)
  title.value = ''
}
</script>

<template>
  <main class="app">
    <section class="card">
      <h1>Vue + Hasura Todo App</h1>

      <form class="form" @submit.prevent="onAdd">
        <input
          v-model="title"
          type="text"
          placeholder="Enter todo title"
        />

        <button type="submit">Add</button>
      </form>

      <p v-if="todoStore.loading">Loading todos...</p>
      <p v-if="todoStore.error" class="error">{{ todoStore.error }}</p>

      <div class="filters">
        <button
          :class="{ active: filter === 'all' }"
          @click="filter = 'all'"
        >
          All
        </button>

        <button
          :class="{ active: filter === 'active' }"
          @click="filter = 'active'"
        >
          Active
        </button>

        <button
          :class="{ active: filter === 'done' }"
          @click="filter = 'done'"
        >
          Done
        </button>
      </div>

      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="todo-item"
        >
          <label>
            <input
              type="checkbox"
              :checked="todo.is_done"
              @change="todoStore.toggleTodo(todo)"
            />

            <span :class="{ done: todo.is_done }">
              {{ todo.title }}
            </span>
          </label>

          <button class="delete" @click="todoStore.deleteTodo(todo.id)">
            Delete
          </button>
        </li>
      </ul>

      <p v-if="filteredTodos.length === 0">
        No todos found.
      </p>
    </section>
  </main>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #f5f5f5;
  padding: 40px;
}

.card {
  width: 100%;
  max-width: 640px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 10%);
}

h1 {
  margin-bottom: 24px;
}

.form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

input[type='text'] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
}

button {
  cursor: pointer;
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: white;
}

.filters {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}

.filters button {
  background: #64748b;
}

.filters button.active {
  background: #16a34a;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
}

.todo-item label {
  display: flex;
  gap: 8px;
  align-items: center;
}

.done {
  text-decoration: line-through;
  color: #64748b;
}

.delete {
  background: #dc2626;
}

.error {
  color: #dc2626;
}
</style>