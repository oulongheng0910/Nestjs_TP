import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apolloClient } from '@/apollo/client'
import {
  GET_TODOS,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  TODOS_SUB,
} from '@/graphql/todos'

export type Todo = {
  id: string
  title: string
  is_done: boolean
  created_at: string
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTodos() {
    loading.value = true
    error.value = null

    try {
      const { data } = await apolloClient.query<{ todos: Todo[] }>({
        query: GET_TODOS,
        fetchPolicy: 'network-only',
      })

      todos.value = data.todos
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = 'Failed to load todos'
      }
    } finally {
      loading.value = false
    }
  }

  async function addTodo(title: string) {
    const clean = title.trim()

    if (!clean) return

    await apolloClient.mutate({
      mutation: ADD_TODO,
      variables: {
        title: clean,
      },
    })

    await fetchTodos()
  }

  async function toggleTodo(todo: Todo) {
    await apolloClient.mutate({
      mutation: TOGGLE_TODO,
      variables: {
        id: todo.id,
        done: !todo.is_done,
      },
    })

    await fetchTodos()
  }

  async function deleteTodo(id: string) {
    await apolloClient.mutate({
      mutation: DELETE_TODO,
      variables: {
        id,
      },
    })

    await fetchTodos()
  }

  function startRealtime() {
    const observable = apolloClient.subscribe<{ todos: Todo[] }>({
      query: TODOS_SUB,
    })

    const subscription = observable.subscribe({
      next: ({ data }) => {
        if (data?.todos) {
          todos.value = data.todos
        }
      },
      error: (e) => {
        console.error('Subscription error:', e)
      },
    })

    return () => subscription.unsubscribe()
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startRealtime,
  }
})