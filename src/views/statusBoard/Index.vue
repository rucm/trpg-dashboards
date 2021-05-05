<template>
  <td-container>
    <td-row>
      <td-col md="5" sm="8">
        <status-board-form></status-board-form>
      </td-col>
    </td-row>
  </td-container>
</template>
<script lang="ts">
import TdContainer from '@/layouts/TdContainer.vue';
import TdRow from '@/layouts/TdRow.vue';
import TdCol from '@/layouts/TdCol.vue';
import StatusBoardForm from '@/components/statusBoard/StatusBoardForm.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: { 
    TdContainer,
    TdRow,
    TdCol,
    StatusBoardForm
  }
});
</script>