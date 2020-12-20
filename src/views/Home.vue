<template>
  <home-container>
    <home-header title="ツール一覧" content="TRPG補助系ツールの一覧です。"></home-header>
    <home-app-card title="test" content="これはてすとです" link="/test"></home-app-card>
  </home-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, onMounted } from '@vue/composition-api';
import HomeContainer from '@/components/home/HomeContainer.vue';
import HomeHeader from '@/components/home/HomeHeader.vue';
import HomeAppCard from '@/components/home/HomeAppCard.vue';

export default defineComponent({
  name: 'Home',

  components: { HomeContainer, HomeHeader, HomeAppCard },

  setup(props: {}, ctx: SetupContext) {

    onMounted(()=> {
      console.log(ctx);
    });
  }
});
</script>
