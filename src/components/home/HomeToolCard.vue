<template>
  <td-col :md="5">
    <v-card link :to="link">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ content }}</v-card-text>
    </v-card>
  </td-col>
</template>
<script lang="ts">
import TdCol from '@/layouts/TdCol.vue';
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  components: { TdCol },
  props: {
    title: { type: String as PropType<string>, required: true },
    link: { type: String as PropType<string>, required: true },
    content: { type: String as PropType<string>, required: false }
  }
});
</script>