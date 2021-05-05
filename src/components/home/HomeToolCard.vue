<template>
  <v-card link :to="link">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ content }}</v-card-text>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  
  props: {
    title: { type: String as PropType<string>, required: true },
    link: { type: String as PropType<string>, required: true },
    content: { type: String as PropType<string>, required: false }
  }
});
</script>