import { SetupContext, reactive, computed } from '@vue/composition-api';
import { useStatusBoardRoomModule } from '@/modules/statusBoard/room';
import { FormState } from '@/types/statusBoard';

export const useStatusBoardFormModule = (form: FormState, ctx: SetupContext) => {

  const roomModule = useStatusBoardRoomModule();

  const state = reactive({
    errorMessages: new Array<string>(),
    nameRules: [
      (v: string): boolean | string => !!v || 'ルーム名は必須項目です'
    ],
    passwordRules: [
      (v: string): boolean | string => !!v || 'パスワードは必須項目です'
    ]
  });

  async function submitCreate (): Promise<void> {
    if (!form.name || !form.password) return;

    if (await roomModule.exists(form.name, form.password)) {
      state.errorMessages.push('既に存在しています');
      setTimeout(() => { state.errorMessages.shift(); }, 5000);
      return;
    }

    const roomId = await roomModule.create(form.name, form.password, 'sw');
    await ctx.root.$router.push(form.link + '/' + roomId);
  }
  
  async function submitEnter (): Promise<void> {
    if (!form.name || !form.password) return;
    
    if (!(await roomModule.exists(form.name, form.password))) {
      state.errorMessages.push('存在しないルームです');
      setTimeout(() => { state.errorMessages.shift(); }, 5000);
      return;
    }

    const roomId = await roomModule.auth(form.name, form.password);
    await ctx.root.$router.push(form.link + '/' + roomId);
  }

  return {
    errorMessages: computed(() => state.errorMessages),
    nameRules: computed(() => state.nameRules),
    passwordRules: computed(() => state.passwordRules),
    submitCreate,
    submitEnter
  };
};