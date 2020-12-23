import { InjectionKey, readonly } from '@vue/composition-api';

export const useGlobalModule = () => {

  const appsInfo = readonly({
    statusBoard: {
      id: 'statusboard',
      name: 'ステータスボード',
      content: 'キャラクターのステータスを管理するツールです。',
      link: '/statusboard'
    }
  });

  return {
    appsInfo
  };
};

export type GlobalModule = ReturnType<typeof useGlobalModule>;
export const GlobalKey: InjectionKey<GlobalModule> = Symbol('GlobalModule');