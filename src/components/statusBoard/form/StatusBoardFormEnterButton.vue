<template>
  <status-board-form-wrap-box>
    <v-btn block color="primary" @click="onClick">Enter</v-btn>
  </status-board-form-wrap-box>
</template>
<script lang="ts">
import { defineComponent, inject, SetupContext } from '@vue/composition-api';
import StatusBoardFormWrapBox from './StatusBoardFormWrapBox.vue';
import { StatusBoardFormModuleKey, StatusBoardFormModule } from '@/modules/statusBoard/form';

export default defineComponent({

  components: { StatusBoardFormWrapBox },

  setup (props: {}, ctx: SetupContext) {
    const module = inject(StatusBoardFormModuleKey) as StatusBoardFormModule;
    const state = module.state;

    async function onClick () {
      if (state.roomId === '') return;
      if (!await module.isExistRoomId()) {
        module.showErrorMessage('存在しないルームIDです');
        return;
      }

      ctx.root.$router.push('/statusboard/' + state.roomId);
    }

    return {
      onClick
    };
  }
});
</script>