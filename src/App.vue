<template>
  <v-app>
    
    <v-app-bar app color="primary" dark dense>
      <v-toolbar-title @click="onPushRouteHome">TRPG Dashboards</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

export default defineComponent({
  name: 'App',

  setup(props: {}, ctx: SetupContext) {

    function onPushRouteHome() {
      if (ctx.root.$route.path !== '/') {
        ctx.root.$router.push('/');
      }
    }

    return {
      onPushRouteHome
    };
  }
});
</script>
