<template>
  <div class="pb-3 d-flex align-center">
    <div class="pr-2" style="min-width: 4em; text-align: center;">{{ parameter.name }}</div>
    <v-progress-linear
      height="1.5em"
      striped
      :value="parcentage"
      :color="parameter.color">
      <template v-slot:default="{}">
        <div>{{ parameter.current }} / {{ parameter.max }}</div>
      </template>
    </v-progress-linear>
    <v-btn tile height="1.5em" color="secondary" @click="select">
      <v-icon>mdi-swap-vertical-bold</v-icon>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { CharacterParameter } from '@/types/statusBoard';
import { defineComponent, PropType, computed, SetupContext } from '@vue/composition-api';

export default defineComponent({
  
  props: {
    parameter: { type: Object as PropType<CharacterParameter>, required: true }
  },

  setup (props, ctx: SetupContext) {

    const parcentage = computed(() => props.parameter.max === 0 ? 0 : Math.ceil(props.parameter.current / props.parameter.max * 100));

    function select (): void {
      ctx.emit('select', props.parameter.name);
    }

    return {
      parcentage,
      select
    };
  }
});
</script>