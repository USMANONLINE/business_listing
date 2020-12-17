<template>
  <q-page padding>
    <q-dialog v-model="dialog.newListing">
      <q-card style="width: 450px">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>New Business</q-toolbar-title>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-toolbar>
        <q-card-section>
          <q-form @submit.prevent="createListing">
            <q-input
              v-model.trim="listing.name"
              autofocus
              type="text"
              name="business"
              outlined
              lazy-rules
              label="Name"
              :rules="[ val => val && val.length > 0 || 'Please type name']"
            />
            <q-input
              v-model.trim="listing.description"
              autogrow
              type="text"
              name="description"
              outlined
              lazy-rules
              label="Description"
              :rules="[ val => val && val.length > 0 || 'Please type description']"
              counter
              shadow-text
            />
            <q-input
              v-model.trim="listing.url"
              type="url"
              name="url"
              outlined
              lazy-rules
              label="Website"
              :rules="[ val => val && val.length > 0 || 'Please type website']"
            />
            <q-input
              v-model.trim="listing.email"
              type="email"
              name="email"
              outlined
              lazy-rules
              label="Email Address"
              :rules="[ val => val && val.length > 0 || 'Please type email']"
            />
            <q-input
              v-model.trim="listing.phone"
              type="tel"
              name="phone"
              outlined
              lazy-rules
              label="Phone Number"
              :rules="[ val => val && val.length > 0 || 'Please type phone']"
            />
            <q-input
              v-model.trim="listing.address"
              type="text"
              name="address"
              outlined
              lazy-rules
              label="Address"
              :rules="[ val => val && val.length > 0 || 'Please type address']"
            />
            <q-select
              multiple
              @filter="loadCategories"
              :options="categoriesTitle"
              v-model.trim="listing.categories"
              outlined
              lazy-rules
              label="Category"
              :rules="[ val => val && val.length > 0 || 'Please select category']"
            />
            <q-file @input="uploadPicture" multiple v-model.trim="listing.files" label="Pictures" outlined counter>
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-btn
              label="Save"
              type="submit"
              color="primary"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="dialog.newListing = !dialog.newListing" fab icon="add" glossy color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { server } from 'boot/axios'

export default {
  data: () => ({
    dialog: {
      newListing: false
    },

    listing: { files: null },
    listings: [],
    categories: [],
    categoriesTitle: []
  }),

  methods: {
    createListing () {
      const lst = {
        name: this.listing.name,
        description: this.listing.description,
        url: this.listing.url,
        email: this.listing.email,
        phone: this.listing.phone,
        address: this.listing.address
      }

      this.post('/listing', lst).then(response => {
        const images = []
        this.listing.images.forEach(image => {
          images.push({ listingId: response.data.id, imageId: image })
        })

        const categories = []
        this.listing.categories.forEach(category => {
          const sample = this.categories.find(cat => cat.title === category)
          categories.push({ listingId: response.data.id, categoryId: sample.id })
        })

        this.post('/listing-images', images).then(res => {
          this.post('/listing-categories', categories).then(r => {
            this.success('Listing created successfully')
            this.dialog.newListing = !this.dialog.newListing
            this.listing = { files: null }
          }).catch(e => {
            this.failure('Unable to upload listing. Please try again !')
            return e
          })
        }).catch(err => {
          this.failure('Unable to upload listing. Please try again !')
          return err
        })
      }).catch(error => {
        this.failure('Unable to upload listing. Please try again !')
        return error
      })
    },

    uploadPicture (files) {
      const formdata = new FormData()
      for (let index = 0; index < files.length; index++) {
        formdata.append('file' + index, files[index])
      }
      server.post('/picture-upload', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        const images = []
        const imagekeys = Object.keys(response.data)
        if (imagekeys.length > 1) {
          for (let index = 0; index < imagekeys.length; index++) {
            const path = response.data[imagekeys[index]].path
            images.push({ name: path.substring(7) })
          }
          return this.post('/images', images).then(res => {
            this.listing.images = res.data.map(img => img.id)
          }).catch(err => {
            this.failure('Unable to upload images. Please try again !')
            return err
          })
        } else {
          const img = response.data[imagekeys[0]].path
          return this.post('/image', { name: img.substring(7) }).then(res => {
            this.listing.images = [response.data.id]
          }).catch(err => {
            this.failure('Unable to upload images. Please try again !')
            return err
          })
        }
      }).catch(error => {
        this.failure('Unable to upload images. Please try again !')
        return error
      })
    },

    loadCategories (val, update, abort) {
      this.get('/category').then(response => {
        update(() => {
          this.categories = response.data
          this.categoriesTitle = response.data.map(category => category.title)
        })
      }).catch(error => {
        this.failure('Unable to load categories')
        return error
      })
    }
  },
  mounted () {
    this.get('/listing').then(response => {
      this.listings = response.data
    }).catch(error => {
      this.failure('Unable to load listings')
      return error
    })
  }
}
</script>

<style scoped>

</style>
