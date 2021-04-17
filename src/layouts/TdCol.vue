<template>
  <v-col :cols="cols" :md="md" :sm="sm">
    <slot></slot>
  </v-col>
</template>
<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api';

export default defineComponent({

  props: {
    cols: { type: Number as PropType<number>, required: false, default: 11 },
    md: { type: Number as PropType<number>, required: false, default: 8 },
    sm: { type: Number as PropType<number>, required: false, default: 10 }
  }
});
</script>