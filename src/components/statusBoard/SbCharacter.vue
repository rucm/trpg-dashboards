<template>
  <td-col>
    <v-card flat>

      <v-card-title>
        <span>{{ character.name }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="localState.editDialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon @click="localState.deleteDialog = true"><v-icon color="red">mdi-delete</v-icon></v-btn>
      </v-card-title>

      <v-card-text>
        <sb-character-part></sb-character-part>
      </v-card-text>
    
    </v-card>
  </td-col>
</template>
<script lang="ts">
import TdCol from '@/layouts/TdCol.vue';
import SbCharacterPart from '@/components/statusBoard/SbCharacterPart.vue';
import { SetupContext, defineComponent, PropType, reactive } from '@vue/composition-api';
import { Character } from '@/types/statusBoard';

export default defineComponent({

  components: { 
    TdCol,
    SbCharacterPart
  },

  props: {
    character: { type: Object as PropType<Character>, required: true }
  },

  setup (props, ctx: SetupContext) {

    const localState = reactive({
      editDialog: false,
      deleteDialog: false
    });

    return {
      localState
    };
  }
});
</script>