<template>
  <v-container fluid>
    <v-row class="mb-4">
      <v-col md="6" offset-md="3" sm="8" offset-sm="2">
        <v-card class="pa-2" tile>test</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { defineComponent, SetupContext, onMounted } from '@vue/composition-api';

type Props = {
};

export default defineComponent({
  name: 'Home',
  setup(props: Props, ctx: SetupContext) {

    onMounted(()=> {
      console.log(ctx.root);
    });
  }
});
</script>
