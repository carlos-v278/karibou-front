import { defineStore } from 'pinia';
interface BaseFeatures {
  loadingAnime:boolean;
  baseUrl:string;
}

export const useStoreBaseFeatures = defineStore('baseFeatures', {
  state: (): BaseFeatures => ({
    loadingAnime:false,
    baseUrl:'http://127.0.0.1:8080/',

  }),
  getters: {
    getLoadingStatus: (state: BaseFeatures): boolean => {
      return state.loadingAnime;
    },
    getBaseUrl: (state: BaseFeatures): string => {
      return state.baseUrl;
    }

  },
  actions: {
    enableLoading(): void {
      this.loadingAnime = true;
    },
    disableLoading(): void {
      this.loadingAnime = false;
    },

  }
});
