<template>
  <td-container>
    <td-row>
      <home-header :title="appConfig.headers.tool" ></home-header>
      <home-tool-card 
        v-for="tool in appConfig.tools"
        :key="tool.id"
        :title="tool.name"
        :content="tool.content"
        :link="tool.link"
      ></home-tool-card>
    </td-row>
  </td-container>
</template>
<script lang="ts">
import TdContainer from '@/layouts/TdContainer.vue';
import TdRow from '@/layouts/TdRow.vue';
import HomeToolCard from '@/components/home/HomeToolCard.vue';
import HomeHeader from '@/components/home/HomeHeader.vue';
import { defineComponent } from '@vue/composition-api';
import { useGlobalModule } from '@/modules/global';

export default defineComponent({
  components: { TdContainer, TdRow, HomeToolCard, HomeHeader },

  setup () {
    const { appConfig } = useGlobalModule();

    return {
      appConfig
    };
  }
});
</script>