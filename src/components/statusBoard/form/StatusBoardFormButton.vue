<template>
  <status-board-form-wrap-box>
    <v-btn block color="primary" @click="onClick">Enter</v-btn>
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
    const state = module.state;

    async function onClick () {
      if (state.roomId === '') return;
      if (!await module.isExistRoomId()) {
        state.errorMessages.push('存在しないルームIDです');
        return;
      }
    }

    return {
      onClick
    };
  }
});
</script>