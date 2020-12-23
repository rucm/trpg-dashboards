<template>
  <status-board-form-wrap-box>
    <v-text-field
      v-model="state.roomId"
      hide-details="auto"
      label="ルームID"
      :rules="rules"
      :error-messages="state.errorMessages"
    ></v-text-field>
  </status-board-form-wrap-box>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api';
import StatusBoardFormWrapBox from './StatusBoardFormWrapBox.vue';
import { StatusBoardFormModuleKey, StatusBoardFormModule } from '@/modules/statusBoard/form';

export default defineComponent({

  components: { StatusBoardFormWrapBox },

  props: {
    label: { type: String as PropType<string>, required: false }
  },

  setup () {
    const module = inject(StatusBoardFormModuleKey) as StatusBoardFormModule;
    const state = module.state;
    
    const rules = [
      (v: string) => !(v === '') || 'ルームIDを入力してください'
    ];

    return {
      state,
      rules
    };
  }
});
</script>