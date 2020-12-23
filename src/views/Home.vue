<template>
  <home-container>
    <home-header title="ツール一覧" content="TRPG補助系ツールの一覧です。"></home-header>
    <home-app-card 
      v-for="app in appsInfo"
      :key="app.id"
      :title="app.name"
      :content="app.content"
      :link="app.link"
    ></home-app-card>
  </home-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import HomeContainer from '@/components/home/HomeContainer.vue';
import HomeHeader from '@/components/home/HomeHeader.vue';
import HomeAppCard from '@/components/home/HomeAppCard.vue';
import { useGlobalModule } from '@/modules/global';

export default defineComponent({
  name: 'Home',

  components: { HomeContainer, HomeHeader, HomeAppCard },

  setup () {
    const { appsInfo } = useGlobalModule();

    return {
      appsInfo
    };
  }
});
</script>
