<template>
  <v-card shaped tile>

    <v-card-title class="pl-0 pr-0">
      <v-toolbar dense flat>
        <v-toolbar-title>{{ character.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-dots-vertical</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-item @click="localState.editDialog = true">編集</v-list-item>
            <v-list-item @click="localState.removeDialog = true">削除</v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-card-title>

    <v-card-text>
      <div v-for="part in character.parts" :key="part.id">
        <div>{{ part.name }}</div>
        <status-board-character-parameter
          v-for="parameter in part.parameters"
          :key="parameter.name"
          :parameter="parameter"
        ></status-board-character-parameter>
      </div>
    </v-card-text>

    <status-board-character-edit-dialog
      v-model="localState.editDialog"
      :character="character"
      @done="update"
    ></status-board-character-edit-dialog>

    <status-board-character-remove-dialog
      v-model="localState.removeDialog"
      @done="remove(character.id)"
    ></status-board-character-remove-dialog>

  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropType, inject, reactive } from '@vue/composition-api';
import StatusBoardCharacterParameter from '@/components/statusBoard/StatusBoardCharacterParameter.vue';
import StatusBoardCharacterEditDialog from '@/components/statusBoard/StatusBoardCharacterEditDialog.vue';
import StatusBoardCharacterRemoveDialog from '@/components/statusBoard/StatusBoardCharacterRemoveDialog.vue';
import { Character } from '@/types/statusBoard';
import { StatusBoardStoreModule, StatusBoardStoreModuleKey } from '@/modules/statusBoard/store';

export default defineComponent({

  components: { StatusBoardCharacterParameter, StatusBoardCharacterEditDialog, StatusBoardCharacterRemoveDialog },

  props: {
    character: { type: Object as PropType<Character>, required: true }
  },

  setup () {
    const { remove, update } = inject(StatusBoardStoreModuleKey) as StatusBoardStoreModule;

    const localState = reactive({
      editDialog: false,
      removeDialog: false
    });

    return {
      localState,
      remove,
      update
    };
  }
});
</script>