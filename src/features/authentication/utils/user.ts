import { defineStore } from 'pinia';
interface UserAuth {
    token?: string | undefined
}

export const useStoreAuth = defineStore('authentication', {
  state: (): UserAuth => ({
  }),
  getters: {
    getToken: (state: UserAuth): string | undefined => {
      return state.token;
    }

  },
  actions: {
    updateToken(token:string): void {
      this.token = token;
    },

  }
});
