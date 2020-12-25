<template>
  <v-btn block text @click="localState.dialog = true">
    <v-row>
      <v-col cols="2" class="pt-1 pb-1">
        <span class="font-weight-bold">{{ cardItem.label }}</span>
      </v-col>
      <v-col cols="7" class="pt-1 pb-1">
        <v-progress-linear
          :color="cardItem.color"
          height="20"
          :value="localState.progressStatus"
          striped
        ></v-progress-linear>
      </v-col>
      <v-col cols="3" class="pt-1 pb-1">
        <span class="font-weight-regular">{{ localState.statusText }}</span>
      </v-col>
    </v-row>
    <v-dialog v-model="localState.dialog" width="300">
      <v-card>
        <v-card-title>ステータス変更</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field type="number" :max="cardItem.max" v-model="localState.editValue"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="addValue" text color="blue darken-1">回復</v-btn>
          <v-btn @click="subValue" text color="blue darken-1">ダメージ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
<script lang="ts">
import { defineComponent, PropType, inject, computed, watch, reactive } from '@vue/composition-api';
import { StatusBoardModuleKey, StatusBoardModule } from '@/modules/statusBoard/editor';

export default defineComponent({

  props: {
    cardGroupIndex: { type: Number as PropType<number>, required: true },
    cardIndex: { type: Number as PropType<number>, required: true },
    cardItemIndex: { type: Number as PropType<number>, required: true }
  },

  setup (props) {
    const { updateStatus, getCardItem } = inject(StatusBoardModuleKey) as StatusBoardModule;
    const cardItem = computed(() => getCardItem(props.cardGroupIndex, props.cardIndex, props.cardItemIndex));

    const localState = reactive({
      dialog: false,
      editValue: 0,
      statusText: computed(() => `${cardItem.value.current} / ${cardItem.value.max}`),
      progressStatus: computed(() => cardItem.value.max === 0 ? 0 : (cardItem.value.current / cardItem.value.max) * 100)
    });

    async function addValue () {
      cardItem.value.current += Number(localState.editValue);
      localState.dialog = false;
      await updateStatus();
    }

    async function subValue () {
      cardItem.value.current -= Number(localState.editValue);
      localState.dialog = false;
      await updateStatus();
    }

    return {
      cardItem,
      localState,
      addValue,
      subValue
    }
  }
});
</script>