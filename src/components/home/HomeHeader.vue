<template>
  <home-wrap-box>
    <span class="h1">{{ title }}</span>
  </home-wrap-box>
</template>
<script lang="ts">
import HomeWrapBox from '@/components/home/HomeWrapBox.vue';
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  name: 'HomeHeader',

  components: { HomeWrapBox },

  props: {
    title: { type: String as PropType<string>, required: true }
  }
});
</script>