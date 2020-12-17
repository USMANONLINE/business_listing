<template>
  <q-layout view="hHh lpR fff">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          Business listing
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer dark :width="200" show-if-above v-model="left" side="left" bordered>
      <q-scroll-area class="fit">
        <q-list>

          <q-item clickable v-ripple :to="{ name: 'Category' }" active-class="bg-grey" exact>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              Category
            </q-item-section>
          </q-item>
          <q-separator class="bg-white" />

          <q-item clickable v-ripple :to="{ name: 'listing' }" active-class="bg-grey" exact>
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>
            <q-item-section>
              Listing
            </q-item-section>
          </q-item>
          <q-separator class="bg-white" />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="power_settings_new" />
            </q-item-section>
            <q-item-section>
              Logout
            </q-item-section>
          </q-item>
          <q-separator class="bg-white" />

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          &copy; Business listing {{ new Date().getFullYear() }}
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false
    }
  }
}
</script>
