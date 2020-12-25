<template>
  <status-board-container>
    <status-board-tool-bar></status-board-tool-bar>
    <status-board-card-group
      v-for="(group, index) in state.groups"
      :key="index"
      :cardGroupIndex="index"
    ></status-board-card-group>
  </status-board-container>
</template>
<script lang="ts">
import { defineComponent, provide, SetupContext, onMounted, onBeforeUnmount } from '@vue/composition-api';
import StatusBoardContainer from '@/components/statusBoard/common/StatusBoardContainer.vue';
import StatusBoardToolBar from '@/components/statusBoard/editor/StatusBoardToolBar.vue';
import StatusBoardCardGroup from '@/components/statusBoard/editor/StatusBoardCardGroup.vue';
import { useStatusBoardModule, StatusBoardModuleKey } from '@/modules/statusBoard/editor';

export default defineComponent({

  components: { StatusBoardContainer, StatusBoardToolBar, StatusBoardCardGroup },

  setup (props: {}, ctx: SetupContext) {
    const statusBoardModule = useStatusBoardModule();
    provide(StatusBoardModuleKey, statusBoardModule);

    onMounted(async () => {
      const roomId = ctx.root.$route.params['roomId'] as string;
      const result = await statusBoardModule.fetchRoomData(roomId);
      if (!result) ctx.root.$router.push('/statusboard');

      statusBoardModule.subscribe();
      console.log('subscribe');
    });

    onBeforeUnmount(() => {
      statusBoardModule.unsubscribe();
    })

    const state = statusBoardModule.state;

    return {
      state
    };
  }
});
</script>