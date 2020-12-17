<template>
  <q-page padding>
    <q-dialog v-model="dialog.newCategory">
      <q-card style="width: 450px">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>New Category</q-toolbar-title>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-toolbar>
        <q-card-section>
          <q-form @submit.prevent="createCategory">
            <q-input
              autofocus
              v-model.trim="category.title"
              type="text"
              name="category"
              outlined
              label="Category"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type category']"
            />
            <q-btn
              label="Save"
              type="submit"
              color="primary"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.updateCategory">
      <q-card style="width: 450px">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>Update Category</q-toolbar-title>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-toolbar>
        <q-card-section>
          <q-form @submit.prevent="updateCategory">
            <q-input
              autofocus
              v-model.trim="category.title"
              type="text"
              name="category"
              outlined
              label="Category"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type category']"
            />
            <q-btn
              label="Save"
              type="submit"
              color="primary"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row">
      <div class="q-pa-xs col-xs-12 col-sm-12 col-md-3" v-for="(cat, index) in categories" :key="index">
        <q-card class="bg-blue-5 text-white">
          <q-card-section>
            <div class="text-h6">{{ cat.title }}</div>
            <div class="text-subtitle2">{{ new Date(cat.createdAt).toDateString() }}</div>
          </q-card-section>
          <q-separator class="bg-white" />
          <q-card-actions align="right">
            <q-btn flat @click="category = Object.assign({}, cat), dialog.updateCategory = !dialog.updateCategory">Edit</q-btn>
            <q-btn flat @click="deleteCategory(cat.id)">Delete</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="dialog.newCategory = !dialog.newCategory" fab icon="add" glossy color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    dialog: {
      newCategory: false,
      updateCategory: false
    },
    category: {},
    categories: []
  }),

  methods: {
    createCategory () {
      this.post('/category', this.category).then(response => {
        this.success('Category created successfully')
        this.categories.push(response.data)
        this.dialog.newCategory = !this.dialog.newCategory
        this.category = {}
      }).catch(error => {
        this.failure('Unable to create category. Please try again !')
        return error
      })
    },

    updateCategory () {
      const endpoint = '/category/' + this.category.id
      this.put(endpoint, this.category).then(response => {
        const index = this.categories.findIndex(category => category.id === this.category.id)
        this.categories[index] = this.category
        this.success('Category created successfully')
        this.dialog.updateCategory = !this.dialog.updateCategory
        this.category = {}
      }).catch(error => {
        this.failure('Unable to load category')
        return error
      })
    },

    deleteCategory (id) {
      const endpoint = '/category/' + id
      this.delete(endpoint).then(response => {
        const index = this.categories.findIndex(category => category.id === id)
        this.categories.splice(index, 1)
        this.success('Category deleted successfully')
      }).catch(error => {
        this.failure('Unable to delete category')
        return error
      })
    }
  },

  mounted () {
    this.get('/category').then(response => {
      this.categories = response.data
    }).catch(error => {
      this.failure('Unable to load categories. Please check your network connection')
      return error
    })
  }
}
</script>

<style scoped>

</style>
