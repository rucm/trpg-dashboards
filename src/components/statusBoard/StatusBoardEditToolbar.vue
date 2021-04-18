<template>
  <v-toolbar dense flat>
    <v-toolbar-title>ステータスボード</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="secondary" @click="create">新規作成</v-btn>
  </v-toolbar>
</template>
<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api';
import { StatusBoardStoreModule, StatusBoardStoreModuleKey } from '@/modules/statusBoard/store';

export default defineComponent({

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