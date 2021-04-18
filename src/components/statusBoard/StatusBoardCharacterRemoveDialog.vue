<template>
  <v-dialog @input="input" :value="value" max-width="400">
    <v-card>
      <v-card-title>本当に削除しますか？</v-card-title>
      <v-card-actions class="pt-6">
        <v-spacer></v-spacer>
        <v-btn min-width="100" @click="done" text color="error">削除</v-btn>
        <v-btn min-width="100" @click="input(false)" text>キャンセル</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api';

export default defineComponent({

  props: {
    value: { type: Boolean as PropType<boolean>, required: true }
  },

  setup (props, ctx: SetupContext) {

    function input (value: boolean) {
      ctx.emit('input', value);
    }

    function done () {
      ctx.emit('done');
    }

    return {
      input,
      done
    };
  }
});
</script>