<template>
  <td-col :md="5" :sm="8">
    <v-card flat>
      <v-card-title class="title">ステータスボード</v-card-title>
      <v-card-text>
        <v-text-field label="ルーム名" v-model="state.name" :error-messages="form.errorMessages.value" :rules="form.nameRules.value"></v-text-field>
        <v-text-field type="password" label="パスワード" v-model="state.password" :rules="form.passwordRules.value"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <td-row justify="center">
          <td-col :md="6" :sm="6">
            <v-btn color="secondary" block @click="form.submitCreate">新規作成</v-btn>
          </td-col>
          <td-col :md="6" :sm="6">
            <v-btn color="accent" block @click="form.submitEnter">入室</v-btn>
          </td-col>
        </td-row>
      </v-card-actions>
    </v-card>
  </td-col>
</template>
<script lang="ts">
import TdRow from '@/layouts/TdRow.vue';
import TdCol from '@/layouts/TdCol.vue';
import { defineComponent, reactive, SetupContext } from '@vue/composition-api';
import { useStatusBoardFormModule } from '@/modules/statusBoard/form';
import { FormState } from '@/types/statusBoard';

export default defineComponent({
  components: { TdRow, TdCol },

  setup (props: {}, ctx: SetupContext) {
    
    const state = reactive<FormState>({
      name: '',
      password: '',
      link: '/statusboard'
    });

    const form = useStatusBoardFormModule(state, ctx);

    return {
      state,
      form
    };
  }

});
</script>