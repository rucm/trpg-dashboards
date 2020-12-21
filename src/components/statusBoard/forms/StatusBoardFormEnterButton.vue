<template>
  <status-board-form-box>
    <v-btn>Enter</v-btn>
  </status-board-form-box>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import StatusBoardFormBox from './StatusBoardFormBox.vue';

export default defineComponent({

  components: { StatusBoardFormBox }
});
</script>