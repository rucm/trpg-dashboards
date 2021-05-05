<template>
  <v-sheet class="pa-1 headline">{{ title }}</v-sheet>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({

  props: {
    title: { type: String as PropType<string>, required: true }
  }
});
</script>