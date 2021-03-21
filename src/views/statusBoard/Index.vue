<template>
  <td-container>
    <td-row>
      <status-board-form></status-board-form>
    </td-row>
  </td-container>
</template>
<script lang="ts">
import TdContainer from '@/layouts/TdContainer.vue';
import TdRow from '@/layouts/TdRow.vue';
import StatusBoardForm from '@/components/statusBoard/StatusBoardForm.vue';
import StatusBoardHeader from '@/components/statusBoard/StatusBoardHeader.vue';
import { defineComponent, provide } from '@vue/composition-api';

export default defineComponent({
  components: { 
    TdContainer,
    TdRow,
    StatusBoardHeader,
    StatusBoardForm
  }
});
</script>