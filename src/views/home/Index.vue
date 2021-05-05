<template>
  <td-container>
    <td-row>
      <td-col md="10">
        <home-header :title="appConfig.headers.tool" ></home-header>
      </td-col>
      <td-col md="10">
        <td-row justify-md="start" class="pa-0">
          <td-col md="6" v-for="tool in appConfig.tools" :key="tool.id" class="pa-0">
            <home-tool-card :title="tool.name" :content="tool.content" :link="tool.link"></home-tool-card>
          </td-col>
        </td-row>
      </td-col>
    </td-row>
  </td-container>
</template>
<script lang="ts">
import TdContainer from '@/layouts/TdContainer.vue';
import TdRow from '@/layouts/TdRow.vue';
import TdCol from '@/layouts/TdCol.vue';
import HomeToolCard from '@/components/home/HomeToolCard.vue';
import HomeHeader from '@/components/home/HomeHeader.vue';
import { defineComponent } from '@vue/composition-api';
import { useGlobalModule } from '@/modules/global';

export default defineComponent({
  components: { TdContainer, TdRow, TdCol, HomeToolCard, HomeHeader },

  setup () {
    const { appConfig } = useGlobalModule();

    return {
      appConfig
    };
  }
});
</script>