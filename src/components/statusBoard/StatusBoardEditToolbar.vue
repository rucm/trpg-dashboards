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
import { StatusBoardStoreModule, StatusBoardStoreModuleKey } from '@/modules/statusBoard/store';

export default defineComponent({

  components: { TdCol },

  setup () {

    const store = inject(StatusBoardStoreModuleKey) as StatusBoardStoreModule;

    const create = async () => {
      await store.create('新規キャラクター');
    }

    return {
      create
    };
  }
});
</script>