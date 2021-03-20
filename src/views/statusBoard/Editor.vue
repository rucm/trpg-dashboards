<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent, provide, SetupContext, onMounted, onBeforeUnmount } from '@vue/composition-api';

export default defineComponent({

  setup (props: {}, ctx: SetupContext) {

    onMounted(async () => {
      const roomId = ctx.root.$route.params['roomId'] as string;
    });

    // onBeforeUnmount(() => {
    // })

    return {
    };
  }
});
</script>