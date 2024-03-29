<template>
  <v-dialog @input="input" :value="value" max-width="400">
    <v-card>

      <v-card-title>編集</v-card-title>
      
      <v-card-text>
        <v-row class="pa-0">
          <v-col class="pt-0 pb-0" cols="12">
            <v-text-field v-model="localState.character.name" label="キャラクター名"></v-text-field>
          </v-col>
          <v-col class="pt-0 pb-0" cols="12" v-for="(part, index) in localState.character.parts" :key="part.id">
            <v-row class="pt-0 pb-0">
              <v-col class="pt-0 pb-0" cols="4">
                <v-text-field label="部位" v-model="part.name" :readonly="index < 1"></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0" cols="7">
                <v-row class="pt-0 pb-0">
                  <v-col class="pt-0 pb-0" cols="6" v-for="p in part.parameters" :key="p.name">
                    <v-text-field type="number" :label="p.name" v-model.number="p.max"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="pa-0" cols="1">
                <v-btn icon height="100%" @click="remove(part.id)" :disabled="index < 1">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="pt-0 pb-0" cols="12">
            <v-btn @click="add" tile color="secondary">
              <v-icon>mdi-plus</v-icon>
              <span>部位追加</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text min-width="100" @click="done" color="primary">完了</v-btn>
        <v-btn text min-width="100" @click="input(false)">キャンセル</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { useStatusBoardCharacterModule } from '@/modules/statusBoard/character';
import { StatusBoardStoreModule, StatusBoardStoreModuleKey } from '@/modules/statusBoard/store';
import { useStatusBoardTemplateModule } from '@/modules/statusBoard/template';
import { Character, CharacterPart } from '@/types/statusBoard';
import { defineComponent, reactive, SetupContext, PropType, inject, watch } from '@vue/composition-api';

export default defineComponent({

  props: {
    value: { type: Boolean as PropType<boolean>, required: true },
    character: { type: Object as PropType<Character>, required: true }
  },

  setup (props, ctx: SetupContext) {

    const { room } = inject(StatusBoardStoreModuleKey) as StatusBoardStoreModule;
    const characterModule = useStatusBoardCharacterModule();
    const template = useStatusBoardTemplateModule();

    const localState = reactive({
      character: characterModule.copyCharacter(props.character)
    });

    watch(() => props.value, showDialog => {
      if (!showDialog) return;
      localState.character = characterModule.copyCharacter(props.character);
    });

    function input (value: boolean): void {
      ctx.emit('input', value);
    }

    function done (): void {
      ctx.emit('done', localState.character);
      input(false);
    }

    function add (): void {
      localState.character.parts.push(template.createPart(room.value.template));
    }

    function remove (id: string): void {
      localState.character.parts = localState.character.parts.filter(p => p.id !== id)
    }

    return {
      localState,
      input,
      done,
      add,
      remove
    }
  }
});
</script>