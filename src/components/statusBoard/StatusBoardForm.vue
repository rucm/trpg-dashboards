<template>
  <status-board-wrap-box>
    <v-card flat>
      <v-card-text>
        <status-board-form-search-field></status-board-form-search-field>
        <status-board-form-enter-button></status-board-form-enter-button>
      </v-card-text>
    </v-card>
  </status-board-wrap-box>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import StatusBoardWrapBox from './StatusBoardWrapBox.vue';
import StatusBoardFormSearchField from './forms/StatusBoardFormSearchField.vue';
import StatusBoardFormEnterButton from './forms/StatusBoardFormEnterButton.vue';

export default defineComponent({

  components: { StatusBoardWrapBox, StatusBoardFormSearchField, StatusBoardFormEnterButton },
});
</script>