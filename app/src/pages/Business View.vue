<template>
  <q-page class="flex flex-center">
    <q-card style="width: 500px">
      <q-card-section v-if="business.images !== undefined && business.images.length === 0">
        <q-img
          :src="domain + 'business.png'"
        />
      </q-card-section>
      <q-card-section v-if="business.images !== undefined && business.images.length > 0">
        <q-carousel
          autoplay
          animated
          v-model="slide"
          arrows
          navigation
          infinite
        >
          <q-carousel-slide
            v-for="(img, index) in business.images"
            :key="index"
            :name="index + 1"
            :img-src="img.name" />
        </q-carousel>
      </q-card-section>
      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <q-item-label>{{ business.name }}</q-item-label>
            <q-item-label caption>Name</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple :href="'mailto:' +business.email" tag="a">
          <q-item-section>
            <q-item-label>{{ business.email }}</q-item-label>
            <q-item-label caption>Email Address</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple tag="a" :href="'tel:'+business.phone">
          <q-item-section>
            <q-item-label>{{ business.phone }}</q-item-label>
            <q-item-label caption>Phone Number</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple tag="a" :href="business.url">
          <q-item-section>
            <q-item-label>{{ business.url }}</q-item-label>
            <q-item-label caption>Website</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>{{ business.views }}</q-item-label>
            <q-item-label caption>Views</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-card-section>
        <div class="text-subtitle1">Category</div>
        <q-chip icon="assignment" v-for="(category, index) in business.categories" :key="index">{{ category.title }}</q-chip>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <div class="text-subtitle1">Description</div>
        <div class="text-caption">{{ business.description }}</div>
      </q-card-section>

      <q-separator/>
      <q-card-section>
        <div class="text-subtitle1">Address</div>
        <div class="text-caption">{{ business.address }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    business: {},
    slide: 1
  }),
  mounted () {
    const endpoint = '/listing/' + this.$route.params.id
    this.get(endpoint).then(response => {
      response.data.views++
      return this.put(endpoint, response.data).then(res => {
        this.business = response.data
      })
    }).catch(error => {
      this.failure('Business not found')
      return error
    })
  }
}
</script>

<style scoped>

</style>
