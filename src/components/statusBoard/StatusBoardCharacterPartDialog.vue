<template>
  <v-bottom-sheet @input="input" :value="value">
    <v-card tile height="200">
      <v-card-title>{{ localState.selectParameter.name }}</v-card-title>
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

    return {
      localState,
      input,
      done
    };
  }
});
</script>