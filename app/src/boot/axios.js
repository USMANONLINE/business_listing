import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

const server = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

Vue.mixin({
  methods: {
    get (endpoint) {
      return server.get(endpoint)
    },
    put (endpoint, data) {
      return server.put(endpoint, data)
    },
    post (endpoint, data) {
      return server.post(endpoint, data)
    },
    delete (endpoint) {
      return server.delete(endpoint)
    },

    // Notifications
    success (message) {
      Notify.create({
        type: 'positive',
        message
      })
    },
    failure (message) {
      Notify.create({
        type: 'negative',
        message
      })
    },
    info (message) {
      Notify.create({
        type: 'info',
        message
      })
    },
    warning (message) {
      Notify.create({
        type: 'warning',
        message
      })
    }
  }
})

export { server }
