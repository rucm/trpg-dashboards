<template>
  <status-board-form-box>
    <v-text-field></v-text-field>
  </status-board-form-box>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import StatusBoardFormBox from './StatusBoardFormBox.vue';

export default defineComponent({

  components: { StatusBoardFormBox }
});
</script>