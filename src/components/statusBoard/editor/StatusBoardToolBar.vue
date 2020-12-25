<template>
  <status-board-wrap-box>
    <v-row class="pt-0 pb-0">
      <v-col class="pt-0 pb-0" cols="8">
        <span class="font-weight-bold">ステータスボード</span>
      </v-col>
      <v-col class="pt-0 pb-0" cols="4">
        <v-btn block color="primary" @click="addNewCardGroup">新規作成</v-btn>
      </v-col>
    </v-row>
  </status-board-wrap-box>
</template>
<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api';
import StatusBoardWrapBox from '@/components/statusBoard/common/StatusBoardWrapBox.vue';
import { StatusBoardModuleKey, StatusBoardModule } from '@/modules/statusBoard/editor';
import { useEmptyCardTemplate } from '@/modules/statusBoard/template';

export default defineComponent({

  components: { StatusBoardWrapBox },

  setup () {
    const { state, updateStatus } = inject(StatusBoardModuleKey) as StatusBoardModule;
    const template = useEmptyCardTemplate();

    async function addNewCardGroup () {
      state.groups.push(template.createEmptyCardGroup(state.template));
      await updateStatus();
    }

    return {
      addNewCardGroup
    };
  }
});

</script>