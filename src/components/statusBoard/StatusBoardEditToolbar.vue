<template>
  <v-toolbar dense flat>
    <v-toolbar-title>ステータスボード</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn tile small color="secondary" @click="create">新規作成</v-btn>
  </v-toolbar>
</template>
<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api';
import { StatusBoardStoreModule, StatusBoardStoreModuleKey } from '@/modules/statusBoard/store';

export default defineComponent({

  setup () {
    const store = inject(StatusBoardStoreModuleKey) as StatusBoardStoreModule;
    return {
      create: async () => { await store.createCharacter('新規キャラクター'); }
    };
  }
});
</script>