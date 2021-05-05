import { InjectionKey, computed } from '@vue/composition-api';

export const useGlobalModule = () => {

  const appConfig = computed(() => {
    return {
      tools: [
        { 
          id: 'statusBoard',
          name: 'ステータスボード',
          content: 'キャラクターのステータスを管理するツールです。',
          link: '/statusboard'
        }
      ],
      title: 'TRPG Dashboard',
      headers: {
        tool: 'ツール一覧'
      }
    };
  })

  return {
    appConfig
  };
};

export type GlobalModule = ReturnType<typeof useGlobalModule>;
export const GlobalKey: InjectionKey<GlobalModule> = Symbol('GlobalModule');