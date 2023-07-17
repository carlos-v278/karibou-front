import { defineStore } from 'pinia';
import {UserProfile} from 'src/utils/interfaces';
interface UserInfos {
 userRole?:string;
 userProfile: UserProfile | null
}

export const useUserStore = defineStore('user-infos', {
  state: (): UserInfos => ({
    userRole:'',
    userProfile: null
  }),
  getters: {
    getUserRole: (state: UserInfos): string | undefined => {
      return state.userRole;
    },
    getUserProfile: (state: UserInfos): null | UserProfile => {
      return state.userProfile;
    },

  },
  actions: {
    updateUserRole(role:string): void {
      this.userRole = role;
    },
    updateUserProfile(profile: UserProfile): void {
      this.userProfile = profile;
    },

  }
});
