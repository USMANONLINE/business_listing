<template>
  <q-page padding>
    <div class="row wrap justify-center content-center items-center">
      <q-input
        style="width: 700px"
        type="search"
        name="search"
        outlined
        dense
        placeholder="Search businesses ..."
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div class="row q-mt-sm">
      <div class="col-xs-12 col-sm-12 col-md-3 q-pa-xs" v-for="(business, index) in listings" :key="index">
        <q-card class="my-card" flat bordered>
          <q-img
            style="width: 100%; height: 180px"
            :src="getImgSource(business.images)"
          />

          <q-card-section>
            <div class="text-subtitle1 q-mt-sm q-mb-xs">{{ business.name }}</div>
            <div class="text-caption text-grey">{{ business.description }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat color="primary" label="View" :to="{ name: 'Business_View', params: { id: business.id } }" />
          </q-card-actions>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    listings: []
  }),

  methods: {
    getImgSource (images) {
      if (images.length > 0) {
        return images[0].name
      } else {
        return this.domain + '/business.png'
      }
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
