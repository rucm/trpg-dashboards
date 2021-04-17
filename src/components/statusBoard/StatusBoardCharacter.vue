<template>
  <td-col :md="6">
    <v-card shaped tile>

      <v-card-title>
        <span>{{ character.name }}</span>
      </v-card-title>

      <v-card-text>
        <div v-for="part in parts" :key="part.id">
          <div>{{ part.partsName }}</div>
          <status-board-character-parameter
            v-for="parameter in part.parameters"
            :key="parameter.name"
            :parameter="parameter"
          ></status-board-character-parameter>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="localState.editDialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon><v-icon color="red" @click="remove">mdi-delete</v-icon></v-btn>
      </v-card-actions>

      <status-board-character-edit-dialog
        v-model="localState.editDialog"
        :character="character"
        @done="update"
      ></status-board-character-edit-dialog>

    </v-card>
  </td-col>
</template>
<script lang="ts">
import { defineComponent, PropType, inject, reactive } from '@vue/composition-api';
import TdRow from '@/layouts/TdRow.vue';
import TdCol from '@/layouts/TdCol.vue';
import StatusBoardCharacterParameter from '@/components/statusBoard/StatusBoardCharacterParameter.vue';
import StatusBoardCharacterEditDialog from '@/components/statusBoard/StatusBoardCharacterEditDialog.vue';
import { Character } from '@/types/statusBoard';
import { StatusBoardStoreModule, StatusBoardStoreModuleKey } from '@/modules/statusBoard/store';
import { useStatusBoardCharacterModule } from '@/modules/statusBoard/character';

export default defineComponent({
  components: { TdRow, TdCol, StatusBoardCharacterParameter, StatusBoardCharacterEditDialog },

  props: {
    character: { type: Object as PropType<Character>, required: true }
  },

  setup (props) {
    const store = inject(StatusBoardStoreModuleKey) as StatusBoardStoreModule;
    const characterModule = useStatusBoardCharacterModule(props.character);

    const localState = reactive({
      editDialog: false
    });

    const remove = () => {
      store.remove(props.character.id);
    }

    return {
      localState,
      remove,
      update: store.update,
      parts: characterModule.parts
    };
  }
});
</script>