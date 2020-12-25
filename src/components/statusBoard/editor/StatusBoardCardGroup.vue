<template>
  <status-board-wrap-box>
    <v-card>
      <v-card-title>
        <span>{{ cardGroup.name }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="localState.dialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
        <status-board-card-group-dialog
          v-model="localState.dialog"
          :cardGroupIndex="cardGroupIndex"
        ></status-board-card-group-dialog>
      </v-card-title>
      <v-card-text>
        <status-board-card
          v-for="(card, index) in cardGroup.cards"
          :key="index"
          :enableDisplayName="localState.enableDisplayCardName"
          :cardGroupIndex="cardGroupIndex"
          :cardIndex="index"
        ></status-board-card>
      </v-card-text>
    </v-card>
  </status-board-wrap-box>
</template>
<script lang="ts">
import { defineComponent, inject, PropType, computed, reactive } from '@vue/composition-api';
import StatusBoardWrapBox from '@/components/statusBoard/common/StatusBoardWrapBox.vue';
import StatusBoardCardGroupDialog from './dialog/StatusBoardCardGroupDialog.vue';
import StatusBoardCard from './StatusBoardCard.vue';
import { StatusBoardModuleKey, StatusBoardModule } from '@/modules/statusBoard/editor';

export default defineComponent({

  components: { StatusBoardWrapBox, StatusBoardCard, StatusBoardCardGroupDialog },

  props: {
    cardGroupIndex: { type: Number as PropType<number>, required: true }
  },

  setup (props) {
    const { getCardGroup } = inject(StatusBoardModuleKey) as StatusBoardModule;
    const cardGroup = computed(() => getCardGroup(props.cardGroupIndex));

    const localState = reactive({
      enableDisplayCardName: computed(() => (cardGroup.value.cards.length > 1)),
      dialog: false
    });

    return {
      cardGroup,
      localState
    };
  }
});
</script>