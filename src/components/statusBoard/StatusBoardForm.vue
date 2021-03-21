<template>
  <td-col :md="5" :sm="10">
    <v-card flat>
      <v-card-title class="title">ステータスボード</v-card-title>
      <v-card-text>
        <v-text-field label="ルームID"></v-text-field>
        <v-text-field label="パスワード"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <td-row justify="space-around">
          <v-btn color="secondary" width="45%">新規作成</v-btn>
          <v-btn color="accent" width="45%">入室</v-btn>
        </td-row>
      </v-card-actions>
    </v-card>
  </td-col>
</template>
<script lang="ts">
import TdRow from '@/layouts/TdRow.vue';
import TdCol from '@/layouts/TdCol.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: { TdRow, TdCol }
});
</script>