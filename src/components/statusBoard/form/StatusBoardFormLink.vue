<template>
  <status-board-form-wrap-box>
    <v-btn block>新規作成</v-btn>
  </status-board-form-wrap-box>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import StatusBoardFormWrapBox from './StatusBoardFormWrapBox.vue';

export default defineComponent({

  components: { StatusBoardFormWrapBox }
});
</script>