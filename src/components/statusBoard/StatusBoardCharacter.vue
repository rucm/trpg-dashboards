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
      <status-board-character-part
        v-for="part in character.parts"
        :key="part.id"
        :characterId="character.id"
        :part="part"
      ></status-board-character-part>
    </v-card-text>

    <status-board-character-edit-dialog
      v-model="localState.editDialog"
      :character="character"
      @done="updateCharacter"
    ></status-board-character-edit-dialog>

    <status-board-character-remove-dialog
      v-model="localState.removeDialog"
      @done="removeCharacter(character.id)"
    ></status-board-character-remove-dialog>

  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropType, inject, reactive } from '@vue/composition-api';
import StatusBoardCharacterParameter from '@/components/statusBoard/StatusBoardCharacterParameter.vue';
import StatusBoardCharacterPart from '@/components/statusBoard/StatusBoardCharacterPart.vue';
import StatusBoardCharacterEditDialog from '@/components/statusBoard/StatusBoardCharacterEditDialog.vue';
import StatusBoardCharacterRemoveDialog from '@/components/statusBoard/StatusBoardCharacterRemoveDialog.vue';
import { Character } from '@/types/statusBoard';
import { StatusBoardStoreModule, StatusBoardStoreModuleKey } from '@/modules/statusBoard/store';

export default defineComponent({

  components: { StatusBoardCharacterParameter, StatusBoardCharacterPart, StatusBoardCharacterEditDialog, StatusBoardCharacterRemoveDialog },

  props: {
    character: { type: Object as PropType<Character>, required: true }
  },

  setup () {
    const { removeCharacter, updateCharacter } = inject(StatusBoardStoreModuleKey) as StatusBoardStoreModule;

    const localState = reactive({
      editDialog: false,
      removeDialog: false
    });

    return {
      localState,
      removeCharacter,
      updateCharacter
    };
  }
});
</script>