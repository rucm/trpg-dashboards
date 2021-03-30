<template>
  <td-col :md="5">
    <v-card shaped tile>

      <v-card-title>
        <span>{{ character.name }}</span>
      </v-card-title>

      <v-card-text>
        <div v-for="part in parts" :key="part.partsName">
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
        <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon><v-icon color="red" @click="remove">mdi-delete</v-icon></v-btn>
      </v-card-actions>

    </v-card>
  </td-col>
</template>
<script lang="ts">
import { defineComponent, PropType, inject, computed } from '@vue/composition-api';
import TdRow from '@/layouts/TdRow.vue';
import TdCol from '@/layouts/TdCol.vue';
import StatusBoardCharacterParameter from '@/components/statusBoard/StatusBoardCharacterParameter.vue';
import { Character, CharacterParameter } from '@/types/statusBoard';
import { StatusBoardCharacterModuleKey, StatusBoardCharacterModule } from '@/modules/statusBoard/character';

export default defineComponent({
  components: { TdRow, TdCol, StatusBoardCharacterParameter },

  props: {
    character: { type: Object as PropType<Character>, required: true }
  },

  setup (props) {
    
    const characterModule = inject(StatusBoardCharacterModuleKey) as StatusBoardCharacterModule;

    const remove = () => {
      characterModule.remove(props.character.id);
    }

    const parts = computed(() => {
      const partsList = Array.from(new Set(props.character.parameters.map(p => p.partsName)));
      const result: { partsName: string; parameters: CharacterParameter[] }[] = [];
      partsList.forEach(partsName => {
        result.push({
          partsName: partsName,
          parameters: props.character.parameters.filter(parameter => parameter.partsName === partsName)
        });
      });
      return result;
    });

    const test = () => {
      console.log('test');
    }

    return {
      remove,
      parts,
      test
    };
  }
});
</script>