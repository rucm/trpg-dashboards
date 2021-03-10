<template>
  <td-col>
    <v-card>

      <v-card-title>
        <span>{{ character.name }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="localState.editDialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon @click="localState.deleteDialog = true"><v-icon color="red">mdi-delete</v-icon></v-btn>
      </v-card-title>
    
    </v-card>
  </td-col>
</template>
<script lang="ts">
import TdCol from '@/layouts/TdCol.vue';
import SbCharacterPart from '@/components/statusBoard/SbCharacterPart.vue';
import { SetupContext, defineComponent, PropType, reactive } from '@vue/composition-api';
import { Character } from '@/types/statusBoardType';

export default defineComponent({

  components: { 
    TdCol,
    SbCharacterPart
  },

  props: {
    character: { type: Object as PropType<Character>, rewuired: true }
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