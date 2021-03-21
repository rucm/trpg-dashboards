<template>
  <td-col :md="10">
    <v-sheet class="pa-1 headline">{{ title }}</v-sheet>
  </td-col>
</template>
<script lang="ts">
import TdCol from '@/layouts/TdCol.vue';
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({

  components: { TdCol },
  props: {
    title: { type: String as PropType<string>, required: true }
  }
});
</script>