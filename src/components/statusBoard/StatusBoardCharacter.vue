<template>
  <td-col :md="5">
    <v-card flat>

      <v-card-title>
        <span>{{ character.name }}</span>
        <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon><v-icon color="red">mdi-delete</v-icon></v-btn>
      </v-card-title>

      <v-card-text></v-card-text>

    </v-card>
  </td-col>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import TdCol from '@/layouts/TdCol.vue';
import { Character } from '@/types/statusBoard';

export default defineComponent({
  components: { TdCol },

  props: {
    character: { type: Object as PropType<Character>, required: true }
  },

  setup (props) {

  }
});
</script>