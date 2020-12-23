<template>
  <status-board-wrap-box>
    <status-board-form-search-field></status-board-form-search-field>
    <status-board-form-enter-button></status-board-form-enter-button>
    <status-board-form-create-button></status-board-form-create-button>
  </status-board-wrap-box>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import StatusBoardWrapBox from '@/components/statusBoard/common/StatusBoardWrapBox.vue';
import StatusBoardFormSearchField from './StatusBoardFormSearchField.vue';
import StatusBoardFormEnterButton from './StatusBoardFormEnterButton.vue';
import StatusBoardFormCreateButton from './StatusBoardFormCreateButton.vue';

export default defineComponent({

  components: { 
    StatusBoardWrapBox,
    StatusBoardFormSearchField,
    StatusBoardFormEnterButton,
    StatusBoardFormCreateButton
  }
});
</script>