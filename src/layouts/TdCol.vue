<template>
  <v-col :cols="cols" :md="md" :sm="sm">
    <slot></slot>
  </v-col>
</template>
<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api';

export default defineComponent({

  props: {
    cols: { type: String as PropType<string>, required: false, default: '11' },
    md: { type: String as PropType<string>, required: false, default: '8' },
    sm: { type: String as PropType<string>, required: false, default: '10' }
  }
});
</script>