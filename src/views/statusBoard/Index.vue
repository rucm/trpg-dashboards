<template>
  <status-board-container>
    <status-board-form></status-board-form>
  </status-board-container>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import StatusBoardContainer from '@/components/statusBoard/StatusBoardContainer.vue';
import StatusBoardForm from '@/components/statusBoard/StatusBoardForm.vue';

export default defineComponent({

  components: { StatusBoardContainer, StatusBoardForm }
});
</script>