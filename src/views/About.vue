<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
import { SetupContext, defineComponent, onMounted } from '@vue/composition-api';

type Props = {};

export default defineComponent({
  
  setup(props: Props, ctx: SetupContext) {

    onMounted(()=> {
      console.log('about');
      console.log(ctx.root.$route.path);
    })
  }

});

</script>
