<template>
  <div>
    <div>{{ part.name }}</div>
    <status-board-character-parameter
      v-for="parameter in part.parameters"
      :key="parameter.name"
      :parameter="parameter"
      @select="select"
    ></status-board-character-parameter>
    <status-board-character-part-dialog
      v-model="localState.editDialog"
      :part="part"
      :select="localState.selectParameter"
      @done="done"
    ></status-board-character-part-dialog>
  </div>
</template>
<script lang="ts">
import { CharacterPart, CharacterParameter } from '@/types/statusBoard';
import { StatusBoardStoreModuleKey, StatusBoardStoreModule } from '@/modules/statusBoard/store';
import { defineComponent, PropType, inject, reactive } from '@vue/composition-api';
import StatusBoardCharacterParameter from '@/components/statusBoard/StatusBoardCharacterParameter.vue';
import StatusBoardCharacterPartDialog from '@/components/statusBoard/StatusBoardCharacterPartDialog.vue';

export default defineComponent({

  components: { StatusBoardCharacterParameter, StatusBoardCharacterPartDialog },

  props: {
    characterId: { type: String as PropType<string>, required: true },
    part: { type: Object as PropType<CharacterPart>, required: true }
  },

  setup (props) {

    const localState = reactive({
      editDialog: false,
      selectParameter: ''
    });

    const { updateCharacterPart } = inject(StatusBoardStoreModuleKey) as StatusBoardStoreModule;

    function initPart (): CharacterPart {
      return {
        id: props.part.id,
        name: props.part.name,
        parameters: JSON.parse(JSON.stringify(props.part.parameters))
      };
    }

    function select (name: string): void {
      localState.editDialog = true;
      localState.selectParameter = name;
    }

    async function done (editParameter: CharacterParameter): Promise<void> {
      const part = initPart();
      const parameter = part.parameters.find(p => p.name === editParameter.name);
      if (!parameter) return;
      parameter.current = editParameter.current;
      await updateCharacterPart(props.characterId, part);
    }

    return {
      localState,
      select,
      done
    };
  }
});
</script>