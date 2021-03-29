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
        <v-btn icon><v-icon color="red" @click="remove">mdi-delete</v-icon></v-btn>
      </v-card-actions>

    </v-card>
  </td-col>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api';
import TdRow from '@/layouts/TdRow.vue';
import TdCol from '@/layouts/TdCol.vue';
import { Character } from '@/types/statusBoard';
import { StatusBoardCharacterModuleKey, StatusBoardCharacterModule } from '@/modules/statusBoard/character';

export default defineComponent({
  components: { TdRow, TdCol },

  props: {
    character: { type: Object as PropType<Character>, required: true }
  },

  setup (props) {
    
    const characterModule = inject(StatusBoardCharacterModuleKey) as StatusBoardCharacterModule;

    const remove = () => {
      characterModule.remove(props.character.id);
    }

    return {
      remove
    };
  }
});
</script>