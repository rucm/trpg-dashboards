import { InjectionKey, reactive, readonly } from '@vue/composition-api';

export const useGlobalModule = () => {

  const appNames = readonly({
    statusBoard: 'ステータスボード'
  });

  return {
    appNames
  };
};

export type GlobalModule = ReturnType<typeof useGlobalModule>;
export const GlobalKey: InjectionKey<GlobalModule> = Symbol('GlobalModule');