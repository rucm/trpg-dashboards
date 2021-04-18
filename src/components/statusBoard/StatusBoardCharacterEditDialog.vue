<template>
  <v-dialog @input="input" :value="value" max-width="300">
    <v-card>

      <v-card-title>編集</v-card-title>
      
      <v-card-text>
        <v-row class="pa-0">
          <v-col class="pt-0 pb-0" cols="12">
            <v-text-field v-model="editCharacter.name" label="キャラクター名"></v-text-field>
          </v-col>
          <v-col class="pt-0 pb-0" cols="12" v-for="part in editCharacter.parts" :key="part.id">
            <v-row class="pt-0 pb-0">
              <v-col class="pt-0 pb-0" cols="4">
                <v-text-field label="部位" v-model="part.name"></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0" cols="8">
                <v-row class="pt-0 pb-0">
                  <v-col class="pt-0 pb-0" cols="6" v-for="p in part.parameters" :key="p.name">
                    <v-text-field type="number" :label="p.name" v-model.number="p.max"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="done" color="primary">完了</v-btn>
        <v-btn text @click="input(false)">キャンセル</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Character } from '@/types/statusBoard';
import { defineComponent, reactive, SetupContext, PropType } from '@vue/composition-api';

export default defineComponent({

  props: {
    value: { type: Boolean as PropType<boolean>, required: true },
    character: { type: Object as PropType<Character>, required: true }
  },

  setup (props, ctx: SetupContext) {

    const editCharacter = reactive<Character>({
      id: props.character.id,
      name: props.character.name,
      parts: JSON.parse(JSON.stringify(props.character.parts)),
      order: props.character.order
    });

    function input (value: boolean) {
      ctx.emit('input', value);
    }

    function done () {
      ctx.emit('done', editCharacter);
      input(false);
    }

    return {
      editCharacter,
      input,
      done
    }
  }
});
</script>