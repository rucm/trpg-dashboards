<template>
  <v-dialog @input="emitInput" :value="value" width="300">
    <v-card>
      <v-card-title>編集</v-card-title>
      <v-card-text>
        <v-row>
          <v-col class="pt-0 pb-0" cols="12">
            <v-text-field v-model="localState.editGroup.name" label="キャラクター名"></v-text-field>
          </v-col>
          <v-col class="pt-0 pb-0" cols="12" v-for="(card, index) in localState.editGroup.cards" :key="index">
            <v-row class="pt-0 pb-0">
              <v-col class="pt-0 pb-0" cols="4">{{ card.name }}</v-col>
              <v-col class="pt-0 pb-0" cols="4">
                <v-text-field type="number" :label="card.items[0].label" v-model.number="card.items[0].max"></v-text-field>
              </v-col>
              <v-col class="pt-0 pb-0" cols="4">
                <v-text-field type="number" :label="card.items[1].label" v-model.number="card.items[1].max"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="pt-0 pb-0" cols="12">
            <v-checkbox v-model="localState.resetValue" label="現在値をリセットする"></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="done" color="primary">完了</v-btn>
        <v-btn text @click="emitInput(false)">キャンセル</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, SetupContext, inject, computed, reactive, watch } from '@vue/composition-api';
import { StatusBoardModuleKey, StatusBoardModule } from '@/modules/statusBoard/editor';
import { CardGroup } from '@/types/statusBoardType';

export default defineComponent({

  props: {
    value: { type: Boolean as PropType<boolean>, required: true },
    cardGroupIndex: { type: Number as PropType<number>, required: true }
  },

  setup (props, ctx: SetupContext) {
    const { getCardGroup, updateStatus } = inject(StatusBoardModuleKey) as StatusBoardModule;
    const cardGroup = computed(() => getCardGroup(props.cardGroupIndex));
    
    const localState = reactive({
      editGroup: JSON.parse(JSON.stringify(cardGroup.value)) as CardGroup,
      resetValue: false
    });

    watch(() => props.value, (v) => {
      if (!v) return;
      localState.editGroup = JSON.parse(JSON.stringify(cardGroup.value)) as CardGroup;
      localState.resetValue = false;
    });

    function emitInput (v: boolean) {
      ctx.emit('input', v);
    }

    async function done () {
      cardGroup.value.name = localState.editGroup.name;
      localState.editGroup.cards.forEach((card, cardIndex) => {
        card.items.forEach((item, cardItemIndex) => {
          cardGroup.value.cards[cardIndex].items[cardItemIndex].max = item.max;
          if (localState.resetValue) {
            cardGroup.value.cards[cardIndex].items[cardItemIndex].current = item.max;
          }
        });
      });
      await updateStatus();
      emitInput(false);
    }

    return {
      cardGroup,
      localState,
      emitInput,
      done
    };
  }
});

</script>