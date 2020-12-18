<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <router-link to="/about">about</router-link>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { defineComponent, SetupContext, onMounted } from '@vue/composition-api';

type Props = {
};

export default defineComponent({
  name: 'Home',
  setup(props: Props, ctx: SetupContext) {

    onMounted(()=> {
      console.log(ctx.root.$route);
    });
  }
});
</script>
