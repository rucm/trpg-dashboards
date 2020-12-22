<template>
  <status-board-form-wrap-box>
    <v-btn block color="primary" @click="isExistRoomId">Enter</v-btn>
  </status-board-form-wrap-box>
</template>
<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api';
import StatusBoardFormWrapBox from './StatusBoardFormWrapBox.vue';
import { StatusBoardFormModuleKey, StatusBoardFormModule } from '@/modules/statusBoard/form';

export default defineComponent({

  components: { StatusBoardFormWrapBox },

  setup () {

    const module = inject(StatusBoardFormModuleKey) as StatusBoardFormModule;

    return {
      isExistRoomId: module.isExistRoomId
    };
  }
});
</script>