<template>
  <v-dialog @input="emitInput" :value="value" width="300">
    <v-card>
      <v-card-title>本当に削除しますか？</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="remove" text color="error">削除</v-btn>
        <v-btn @click="emitInput(false)" text>キャンセル</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, SetupContext, inject } from '@vue/composition-api';
import { StatusBoardModuleKey, StatusBoardModule } from '@/modules/statusBoard/editor';

export default defineComponent({

  props: {
    value: { type: Boolean as PropType<boolean>, required: true },
    cardGroupIndex: { type: Number as PropType<number>, required: true }
  },

  setup (props, ctx: SetupContext) {
    const { removeCardGroup, updateStatus } = inject(StatusBoardModuleKey) as StatusBoardModule;
    
    function emitInput (v: boolean) {
      ctx.emit('input', v);
    }

    async function remove () {
      removeCardGroup(props.cardGroupIndex);
      await updateStatus();
      emitInput(false);
    }

    return {
      emitInput,
      remove
    }
  }
});
</script>