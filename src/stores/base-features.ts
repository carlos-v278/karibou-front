import { defineStore } from 'pinia';
interface BaseFeatures {
  loadingAnime:boolean;
}

export const useStoreBaseFeatures = defineStore('baseFeatures', {
  state: (): BaseFeatures => ({
    loadingAnime:false
  }),
  getters: {
    getLoadingStatus: (state: BaseFeatures): boolean => {
      return state.loadingAnime;
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
