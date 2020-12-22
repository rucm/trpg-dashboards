<template>
  <status-board-form-wrap-box>
    <v-text-field hide-details="auto"></v-text-field>
  </status-board-form-wrap-box>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import StatusBoardFormWrapBox from './StatusBoardFormWrapBox.vue';

export default defineComponent({

  components: { StatusBoardFormWrapBox },

  props: {
    label: { type: String as PropType<string>, required: true }
  }
});
</script>