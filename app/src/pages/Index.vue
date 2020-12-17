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
      <div class="col-xs-12 col-sm-12 col-md-4">
        <q-card bordered>
          <p>Working</p>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
