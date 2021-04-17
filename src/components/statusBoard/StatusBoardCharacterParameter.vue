<template>
  <div class="pb-2 d-flex align-center">
    <div class="pr-2" style="min-width: 4em; text-align: center;">{{ parameter.name }}</div>
    <v-progress-linear
      height="1.5em"
      striped
      :value="parameter.current"
      :color="parameter.color">
      <template v-slot:default="{ value }">
        <div>{{ value }} / {{ parameter.max }}</div>
      </template>
    </v-progress-linear>
  </div>
</template>
<script lang="ts">
import { CharacterParameter } from '@/types/statusBoard';
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  
  props: {
    parameter: { type: Object as PropType<CharacterParameter>, required: true }
  }
});
</script>