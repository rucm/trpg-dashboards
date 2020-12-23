<template>
  <status-board-container>

  </status-board-container>
</template>
<script lang="ts">
import { defineComponent, provide, SetupContext, onMounted } from '@vue/composition-api';
import StatusBoardContainer from '@/components/statusBoard/common/StatusBoardContainer.vue';
import { useStatusBoardModule, StatusBoardModuleKey } from '@/modules/statusBoard/editor';

export default defineComponent({

  components: { StatusBoardContainer },

  setup (props: {}, ctx: SetupContext) {
    const statusBoardModule = useStatusBoardModule();
    provide(StatusBoardModuleKey, statusBoardModule);

    onMounted(async () => {
      const roomId = ctx.root.$route.params['roomId'] as string;
      const result = await statusBoardModule.fetchRoomData(roomId);
      if (!result) ctx.root.$router.push('/statusboard');
    });
  }
});
</script>