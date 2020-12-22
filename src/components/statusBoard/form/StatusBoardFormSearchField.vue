<template>
  <status-board-form-wrap-box>
    <v-text-field hide-details="auto" v-model="state.roomId"></v-text-field>
  </status-board-form-wrap-box>
</template>
<script lang="ts">
import { defineComponent, PropType, inject, toRefs } from '@vue/composition-api';
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

    return {
      state
    };
  }
});
</script>