<template>
  <td-col :md="10">
    <v-toolbar dense flat>
      <v-toolbar-title>ステータスボード</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="create">新規作成</v-btn>
    </v-toolbar>
  </td-col>
</template>
<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api';
import TdCol from '@/layouts/TdCol.vue';
import { StatusBoardCharacterModule, StatusBoardCharacterModuleKey } from '@/modules/statusBoard/character';

export default defineComponent({

  components: { TdCol },

  setup () {

    const characterModule = inject(StatusBoardCharacterModuleKey) as StatusBoardCharacterModule;

    const create = async () => {
      await characterModule.create('新規キャラクター');
    }

    return {
      create
    };
  }
});
</script>