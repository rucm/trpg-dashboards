<template>
  <v-row :justify="justify" :justify-md="justifyMd" :justify-sm="justifySm">
    <slot></slot>
  </v-row>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  
  props: {
    justify: { type: String as PropType<string>, required: false, default: 'center' },
    justifyMd: { type: String as PropType<string>, required: false, default: 'center' },
    justifySm: { type: String as PropType<string>, required: false, default: 'center' }
  }
});

</script>