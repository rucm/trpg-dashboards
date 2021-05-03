<template>
  <v-bottom-sheet @input="input" :value="value">
    <v-card tile height="200">
      <v-card-title>
        <span>パラメータ変更</span>
        <span>（{{ localState.selectParameter.name }}）</span>
      </v-card-title>
      <v-card-text class="pt-0 pb-0">
        <v-row class="pa-0" justify="center">
          <v-col class="pa-0" cols="2" md="1" align-self="center">
            <v-btn tile small block color="secondary" @click="sub(10)">-10</v-btn>
          </v-col>
          <v-col class="pa-0 pl-1" cols="2" md="1" align-self="center">
            <v-btn tile small block color="secondary" @click="sub(1)">-1</v-btn>
          </v-col>
          <v-col class="pt-0 pb-0" cols="4" md="2" align-self="center">
            <v-text-field type="number" v-model="localState.selectParameter.current"></v-text-field>
          </v-col>
          <v-col class="pa-0 pr-1" cols="2" md="1" align-self="center">
            <v-btn tile small block color="secondary" @click="add(1)">+1</v-btn>
          </v-col>
          <v-col class="pa-0" cols="2" md="1" align-self="center">
            <v-btn tile small block color="secondary" @click="add(10)">+10</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text min-width="100" @click="done" color="primary">完了</v-btn>
        <v-btn text min-width="100" @click="input(false)">キャンセル</v-btn>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>
<script lang="ts">
import { CharacterParameter, CharacterPart } from '@/types/statusBoard';
import { defineComponent, PropType, reactive, SetupContext, watch } from '@vue/composition-api';

export default defineComponent({

  props: {
    value: { type: Boolean as PropType<boolean>, required: true },
    part: { type: Object as PropType<CharacterPart>, required: true },
    select: { type: String as PropType<string>, required: false, default: '' }
  },

  setup (props, ctx: SetupContext) {

    function initParameter (): CharacterParameter {
      const parameter = props.part.parameters.find(p => p.name === props.select);
      if (!parameter) return { current: 0, max: 0, color: '', name: 'NO DATA' };
      return {
        name: parameter.name,
        current: parameter.current,
        max: parameter.max,
        color: parameter.color
      };
    }

    const localState = reactive({
      selectParameter: initParameter()
    });

    watch(() => props.value, showDialog => {
      if (!showDialog) return;
      localState.selectParameter = initParameter()
    });

    function input (value: boolean): void {
      ctx.emit('input', value);
    }

    function done (): void {
      if (localState.selectParameter.name === 'NO DATA') return;
      input(false);
      ctx.emit('done', localState.selectParameter);
    }

    function add (value: number): void {
      if (localState.selectParameter.name === 'NO DATA') return;
      localState.selectParameter.current += value;
    }

    function sub (value: number): void {
      if (localState.selectParameter.name === 'NO DATA') return;
      localState.selectParameter.current -= value;
    }

    return {
      localState,
      input,
      done,
      add,
      sub
    };
  }
});
</script>