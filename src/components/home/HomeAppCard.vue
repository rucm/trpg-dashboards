<template>
  <home-wrap-box>
    <v-card rounded link :to="link">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ content }}</v-card-text>
    </v-card>
  </home-wrap-box>
</template>
<script lang="ts">
import HomeWrapBox from '@/components/home/HomeWrapBox.vue';
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  name: 'HomeAppCard',

  components: { HomeWrapBox },

  props: {
    title: { type: String as PropType<string>, required: true },
    link: { type: String as PropType<string>, required: true },
    content: { type: String as PropType<string>, required: false }
  }
});
</script>