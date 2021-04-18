<template>
  <td-row>
    <status-board-edit-toolbar></status-board-edit-toolbar>
    <td-col :md="10" class="pa-0">
      <td-row justify-md="start" class="pa-0">
        <td-col :md="6" v-for="character in characters" :key="character.id">
          <status-board-character :character="character"></status-board-character>
        </td-col>
      </td-row>
    </td-col>
  </td-row>
</template>
<script lang="ts">
import { defineComponent, provide, SetupContext, onMounted, onBeforeUnmount } from '@vue/composition-api';
import { useStatusBoardStoreModule, StatusBoardStoreModuleKey } from '@/modules/statusBoard/store';
import { useStatusBoardRoomModule } from '@/modules/statusBoard/room';
import TdRow from '@/layouts/TdRow.vue';
import TdCol from '@/layouts/TdCol.vue';
import StatusBoardCharacter from '@/components/statusBoard/StatusBoardCharacter.vue';
import StatusBoardEditToolbar from '@/components/statusBoard/StatusBoardEditToolbar.vue';

export default defineComponent({

  components: { TdRow, TdCol, StatusBoardCharacter, StatusBoardEditToolbar },

  setup (props: {}, ctx: SetupContext) {

    const storeModule = useStatusBoardStoreModule();
    const roomModule = useStatusBoardRoomModule();
    provide(StatusBoardStoreModuleKey, storeModule);

    onMounted(async () => {
      const room = await roomModule.fetch(ctx.root.$route.params['roomId'] as string);
      if (!room.roomId) {
        ctx.root.$router.push('/statusboard');
        return;
      }
      storeModule.initialize(room);
      storeModule.subscribe();
    });

    onBeforeUnmount(() => {
      storeModule.unsubscribe();
    });

    return {
      characters: storeModule.characters
    };
  }
});
</script>