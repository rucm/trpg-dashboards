<template>
  <status-board-form-wrap-box>
    <v-btn block color="primary">Enter</v-btn>
  </status-board-form-wrap-box>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import StatusBoardFormWrapBox from './StatusBoardFormWrapBox.vue';

export default defineComponent({

  components: { StatusBoardFormWrapBox }
});
</script>