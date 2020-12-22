<template>
  <status-board-wrap-box>
    <status-board-form-search-field></status-board-form-search-field>
    <status-board-form-button></status-board-form-button>
    <status-board-form-link></status-board-form-link>
  </status-board-wrap-box>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import StatusBoardWrapBox from '@/components/statusBoard/common/StatusBoardWrapBox.vue';
import StatusBoardFormSearchField from './StatusBoardFormSearchField.vue';
import StatusBoardFormButton from './StatusBoardFormButton.vue';
import StatusBoardFormLink from './StatusBoardFormLink.vue';

export default defineComponent({

  components: { 
    StatusBoardWrapBox,
    StatusBoardFormSearchField,
    StatusBoardFormButton, 
    StatusBoardFormLink
  }
});
</script>