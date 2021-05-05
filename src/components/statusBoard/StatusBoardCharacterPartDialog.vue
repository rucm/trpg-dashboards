<template>
  <v-bottom-sheet @input="input" :value="value">
    <v-card tile height="200">
      <v-card-title>
        <span>パラメータ変更</span>
        <span>（{{ localState.parameter.name }}）</span>
      </v-card-title>
      <v-card-text class="pt-0 pb-0">
        <v-row class="pa-0" justify="center">
          <v-col cols="12" class="pt-0 pb-0">
            <v-row class="pa-0" justify="center">
              <v-col class="pa-0" cols="2" md="1" align-self="center">
                <v-btn tile small block color="secondary" @click="sub(10)">-10</v-btn>
              </v-col>
              <v-col class="pa-0 pl-1" cols="2" md="1" align-self="center">
                <v-btn tile small block color="secondary" @click="sub(1)">-1</v-btn>
              </v-col>
              <v-col class="pt-0 pb-0" cols="4" md="2" align-self="center">
                <v-text-field height="1.5em" type="number" v-model="localState.parameter.current"></v-text-field>
              </v-col>
              <v-col class="pa-0 pr-1" cols="2" md="1" align-self="center">
                <v-btn tile small block color="secondary" @click="add(1)">+1</v-btn>
              </v-col>
              <v-col class="pa-0" cols="2" md="1" align-self="center">
                <v-btn tile small block color="secondary" @click="add(10)">+10</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" class="pa-0 text-center">
            <v-btn tile small color="secondary" @click="reset">最大値に合わせる</v-btn>
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
import { useStatusBoardCharacterModule } from '@/modules/statusBoard/character';
import { CharacterParameter, CharacterPart } from '@/types/statusBoard';
import { defineComponent, PropType, reactive, SetupContext, watch } from '@vue/composition-api';

export default defineComponent({

  props: {
    value: { type: Boolean as PropType<boolean>, required: true },
    part: { type: Object as PropType<CharacterPart>, required: true },
    select: { type: String as PropType<string>, required: false, default: '' }
  },

  setup (props, ctx: SetupContext) {

    const characterModule = useStatusBoardCharacterModule();

    function initParameter (): CharacterParameter {
      const parameter = props.part.parameters.find(p => p.name === props.select);
      if (!parameter) return { current: 0, max: 0, color: '', name: 'NO DATA' };
      return characterModule.copyParameter(parameter);
    }

    const localState = reactive({
      parameter: initParameter()
    });

    watch(() => props.value, showDialog => {
      if (!showDialog) return;
      localState.parameter = initParameter()
    });

    function input (value: boolean): void {
      ctx.emit('input', value);
    }

    function done (): void {
      if (localState.parameter.name === 'NO DATA') return;
      input(false);
      ctx.emit('done', localState.parameter);
    }

    function add (value: number): void {
      if (localState.parameter.name === 'NO DATA') return;
      localState.parameter.current += value;
    }

    function sub (value: number): void {
      if (localState.parameter.name === 'NO DATA') return;
      localState.parameter.current -= value;
    }

    function reset (): void {
      if (localState.parameter.name === 'NO DATA') return;
      localState.parameter.current = localState.parameter.max;
    }

    return {
      localState,
      input,
      done,
      add,
      sub,
      reset
    };
  }
});
</script>