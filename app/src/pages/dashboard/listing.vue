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

    <q-table
      :columns="columns"
      :data="listings"
      :filter="search"
    >
      <template v-slot:top>
        <q-space/>
        <q-input placeholder="Search" borderless dense debounce="300" color="primary" v-model.trim="search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="no" :props="props">{{ listings.indexOf(props.row) + 1 }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="email" :props="props">{{ props.row.email }}</q-td>
          <q-td key="phone" :props="props">{{ props.row.phone }}</q-td>
          <q-td key="url" :props="props">{{ props.row.url }}</q-td>
          <q-td key="views" :props="props">{{ props.row.views }}</q-td>
          <q-td key="visible" :props="props">{{ props.row.visible }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn @click="temp = props.row, dialog.info = true" round color="positive" icon="info" size="sm" flat dense>
              <q-tooltip>More Info</q-tooltip>
            </q-btn>
            <q-btn @click="deleteListing(props.row.id)" round color="negative" icon="delete" size="sm" flat dense>
              <q-tooltip>Delete</q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="dialog.info">
      <q-card style="width: 450px">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>Info</q-toolbar-title>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-toolbar>
        <q-card-section v-if="temp.images !== undefined && temp.images.length === 0">
          <q-img
            :src="domain + 'business.png'"
          />
        </q-card-section>
        <q-card-section v-if="temp.images !== undefined && temp.images.length > 0">
          <q-carousel
            autoplay
            animated
            v-model="slide"
            arrows
            navigation
            infinite
          >
            <q-carousel-slide
              v-for="(img, index) in temp.images"
              :key="index"
              :name="index + 1"
              :img-src="img.name" />
          </q-carousel>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div class="text-subtitle1">Category</div>
          <q-chip icon="assignment" v-for="(category, index) in temp.categories" :key="index">{{ category.title }}</q-chip>
        </q-card-section>

        <q-separator/>
        <q-card-section>
          <div class="text-subtitle1">Description</div>
          <div class="text-caption">{{ temp.description }}</div>
        </q-card-section>

        <q-separator/>
        <q-card-section>
          <div class="text-subtitle1">Address</div>
          <div class="text-caption">{{ temp.address }}</div>
        </q-card-section>

        <q-separator/>
        <q-card-actions align="right">
          <q-btn label="Hide Business" flat color="primary" @click="hideBusiness(temp)"/>
        </q-card-actions>
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
    search: '',
    slide: 1,
    temp: {},
    dialog: {
      info: false,
      newListing: false
    },

    columns: [
      { name: 'no', label: 'No', field: 'no', sortable: true },
      { name: 'name', label: 'Name', field: 'name', sortable: true },
      { name: 'email', label: 'Email', field: 'email', sortable: true },
      { name: 'phone', label: 'Phone', field: 'phone', sortable: true },
      { name: 'url', label: 'Url', field: 'url', sortable: true },
      { name: 'views', label: 'Views', field: 'views', sortable: true },
      { name: 'visible', label: 'Visible', field: 'visible', sortable: true },
      { name: 'actions', label: 'Actions', field: 'actions', sortable: true }
    ],

    listing: { files: null },
    listings: [],
    categories: [],
    categoriesTitle: []
  }),

  methods: {
    deleteListing (id) {
      const endpoint = '/listing/' + id
      this.delete(endpoint).then(response => {
        const index = this.listings.findIndex(lst => lst.id === id)
        this.listings.splice(index, 1)
        this.success('Business deleted successfully')
      }).catch(error => {
        this.failure('Unable to delete errors')
        return error
      })
    },
    hideBusiness (business) {
      const copy = Object.assign({}, business)
      const endpoint = '/listing/' + copy.id
      copy.visible = !copy.visible
      this.put(endpoint, copy).then(response => {
        this.success('Business visibility changed successfully')
        this.dialog.info = !this.dialog.info
        const lst = this.listings.findIndex(ls => ls.id === business.id)
        this.listings[lst] = copy
        this.listings = this.listings.slice()
      }).catch(error => {
        console.log(error)
        this.failure('Unable to change business visibility')
        return error
      })
    },
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

        this.post('/listing-categories', categories).then(r => {
          this.post('/listing-images', images).then(res => {
            this.success('Listing created successfully')
            this.dialog.newListing = !this.dialog.newListing
            this.listing = { files: null }
            this.getBusiness(response.data.id)
          }).catch(err => {
            this.success('Listing created successfully')
            this.dialog.newListing = !this.dialog.newListing
            this.listing = { files: null }
            this.getBusiness(response.data.id)
            return err
          })
        }).catch(e => {
          this.failure('Unable to upload listing. Please try again !')
          return e
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
            images.push({ name: this.domain + path.substring(7) })
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
    },

    getBusiness (id) {
      this.get('/listing/' + id).then(response => {
        this.listings.push(response.data)
      }).catch(error => {
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
