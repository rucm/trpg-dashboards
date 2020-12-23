<template>
  <status-board-wrap-box>
    <v-row>
      <v-col cols="4"></v-col>
    </v-row>
  </status-board-wrap-box>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import StatusBoardWrapBox from '@/components/statusBoard/common/StatusBoardWrapBox.vue';

export default defineComponent({

  components: { StatusBoardWrapBox },

  setup() {

  }
});

</script>