<template>
  <status-board-wrap-box>
    <span class="h1">{{ title }}</span>
  </status-board-wrap-box>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import StatusBoardWrapBox from '@/components/statusBoard/common/StatusBoardWrapBox.vue';

export default defineComponent({

  components: { StatusBoardWrapBox },

  props: {
    title: { type: String as PropType<string>, required: true }
  }
});
</script>