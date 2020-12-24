<template>
  <v-btn block text @click="dialog = true">
    <v-row>
      <v-col cols="2" class="pt-1 pb-1">
        <span class="font-weight-bold">{{ cardItem.label }}</span>
      </v-col>
      <v-col cols="7" class="pt-1 pb-1">
        <v-progress-linear
          :color="cardItem.color"
          height="20"
          :value="progressValue"
          striped
        ></v-progress-linear>
      </v-col>
      <v-col cols="3" class="pt-1 pb-1">
        <span class="font-weight-regular">{{ statusValue }}</span>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="300">
      <v-card>
        <v-card-title>ステータス変更</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field type="number" :max="cardItem.max.value" v-model="cardItem.current"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" text color="blue darken-1">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
<script lang="ts">
import { defineComponent, PropType, inject, computed, ref, watch } from '@vue/composition-api';
import { StatusBoardModuleKey, StatusBoardModule } from '@/modules/statusBoard/editor';

export default defineComponent({

  props: {
    cardGroupIndex: { type: Number as PropType<number>, required: true },
    cardIndex: { type: Number as PropType<number>, required: true },
    cardItemIndex: { type: Number as PropType<number>, required: true }
  },

  setup (props) {
    const { state, updateCardItem } = inject(StatusBoardModuleKey) as StatusBoardModule;
    const cardGroup = state.groups[props.cardGroupIndex];
    const card = cardGroup.cards[props.cardIndex];
    const cardItem = card.items[props.cardItemIndex];

    const progressValue = computed(() => {
      if (cardItem.max === 0) return 0;
      return (cardItem.current / cardItem.max) * 100;
    });

    const statusValue = computed(() => `${cardItem.current} / ${cardItem.max}`);

    const dialog = ref(false);

    watch(() => dialog.value, async (v) => {
      if (!v) await updateCardItem(props.cardGroupIndex, props.cardIndex, props.cardItemIndex, cardItem);
    });

    return {
      state,
      cardItem,
      progressValue,
      statusValue,
      dialog
    }
  }
});
</script>