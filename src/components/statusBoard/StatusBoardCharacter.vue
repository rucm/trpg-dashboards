<template>
  <td-col :md="5">
    <v-card shaped tile>

      <v-card-title>
        <span>{{ character.name }}</span>
      </v-card-title>

      <v-card-text>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon><v-icon color="red">mdi-delete</v-icon></v-btn>
      </v-card-actions>

    </v-card>
  </td-col>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import TdRow from '@/layouts/TdRow.vue';
import TdCol from '@/layouts/TdCol.vue';
import { Character } from '@/types/statusBoard';

export default defineComponent({
  components: { TdRow, TdCol },

  props: {
    character: { type: Object as PropType<Character>, required: true }
  },

  // setup (props) {
    
  // }
});
</script>