<template>
  <v-app>

    <v-app-bar app color="primary" dark dense>
      <v-toolbar-title @click="onPushRouteHome" style="cursor: pointer;">
        {{ appConfig.title }}
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';
import { useGlobalModule } from '@/modules/global';

export default defineComponent({
  name: 'App',

  setup(props: {}, ctx: SetupContext) {

    const { appConfig } = useGlobalModule();

    function onPushRouteHome() {
      if (ctx.root.$route.path !== '/') {
        ctx.root.$router.push('/');
      }
    }

    return {
      appConfig,
      onPushRouteHome
    };
  }
});
</script>
