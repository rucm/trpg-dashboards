<template>
  <status-board-container>
    <status-board-form></status-board-form>
  </status-board-container>
</template>
<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api';
import StatusBoardContainer from '@/components/statusBoard/common/StatusBoardContainer.vue';
import StatusBoardForm from '@/components/statusBoard/form/StatusBoardForm.vue';
import { useStatusBoardFormModule, StatusBoardFormModuleKey } from '@/modules/statusBoard/form';


export default defineComponent({

  components: { StatusBoardContainer, StatusBoardForm },

  setup () {
    provide(StatusBoardFormModuleKey, useStatusBoardFormModule());
  }
});
</script>