<template>
  <v-row>
    <v-col cols="12" class="pa-0 pl-3" v-show="enableDisplayName">
      <span class="font-weight-bold">{{ card.name }}</span>
    </v-col>
    <v-col cols="12" class="pa-0 pb-1" v-for="(item, index) in card.items" :key="index">
      <status-board-card-item
        :cardGroupIndex="cardGroupIndex"
        :cardIndex="cardIndex"
        :cardItemIndex="index"
      ></status-board-card-item>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { defineComponent, PropType, inject, computed } from '@vue/composition-api';
import { StatusBoardModule, StatusBoardModuleKey } from '@/modules/statusBoard/editor';
import StatusBoardCardItem from './StatusBoardCardItem.vue';

export default defineComponent({

  components: { StatusBoardCardItem },

  props: {
    enableDisplayName: { type: Boolean as PropType<boolean>, required: false, default: true },
    cardGroupIndex: { type: Number as PropType<number>, required: true },
    cardIndex: { type: Number as PropType<number>, required: true }
  },

  setup (props) {
    const { getCard } = inject(StatusBoardModuleKey) as StatusBoardModule;
    const card = computed(() => getCard(props.cardGroupIndex, props.cardIndex));

    return {
      card
    };
  }
});

</script>