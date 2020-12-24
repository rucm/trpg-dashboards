<template>
  <status-board-wrap-box>
    <v-card>
      <v-card-title>{{ cardGroup.name }}</v-card-title>
      <v-card-text>
        <status-board-card
          v-for="(card, index) in cardGroup.cards"
          :key="index"
          :enableDisplayName="enableDisplayName"
          :cardGroupIndex="cardGroupIndex"
          :cardIndex="index"
        ></status-board-card>
      </v-card-text>
    </v-card>
  </status-board-wrap-box>
</template>
<script lang="ts">
import { defineComponent, inject, PropType, computed } from '@vue/composition-api';
import StatusBoardWrapBox from '@/components/statusBoard/common/StatusBoardWrapBox.vue';
import StatusBoardCard from './StatusBoardCard.vue';
import { StatusBoardModuleKey, StatusBoardModule } from '@/modules/statusBoard/editor';

export default defineComponent({

  components: { StatusBoardWrapBox, StatusBoardCard },

  props: {
    cardGroupIndex: { type: Number as PropType<number>, required: true }
  },

  setup (props) {
    const { state } = inject(StatusBoardModuleKey) as StatusBoardModule;
    const cardGroup = state.groups[props.cardGroupIndex];

    const enableDisplayName = computed(() => (cardGroup.cards.length > 1));

    return {
      cardGroup,
      enableDisplayName
    };
  }
});
</script>