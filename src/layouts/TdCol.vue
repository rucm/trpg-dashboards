<template>
  <v-col :md="md" :sm="sm">
    <slot></slot>
  </v-col>
</template>
<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api';

export default defineComponent({

  props: {
    sm: { type: Number as PropType<number>, required: false, default: 10 },
    md: { type: Number as PropType<number>, required: false, default: 8 }
  }
});
</script>