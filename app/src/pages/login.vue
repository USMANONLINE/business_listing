<template>
  <q-page class="flex flex-center">
    <q-card style="width: 350px">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title class="text-center">Sign in</q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <q-form>
          <q-input
            type="text"
            name="username"
            label="Account Username"
            outlined
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type name']"
          >
            <template v-slot:prepend>
              <q-icon name="account_circle" />
            </template>
          </q-input>
          <q-input
            type="password"
            name="password"
            label="Account Password"
            outlined
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type password']"
          >
            <template v-slot:prepend>
              <q-icon name="vpn_key" />
            </template>
          </q-input>
          <q-btn
            label="Sign in"
            :to="{ name: 'Category' }"
            color="primary"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
