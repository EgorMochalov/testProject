<template>
  <v-app>
    <v-main>
      <router-view :key="$route.fullPath">
      </router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
},

  data: () => ({
    //
  }),
}
</script>
