import { defineStore } from 'pinia';
import {UserProfile} from 'src/utils/interfaces';
interface UserInfos {
 userProfile: UserProfile | null,
  allRoles: string[]
}

export const useUserStore = defineStore('user-infos', {
  state: (): UserInfos => ({
    userProfile: null,
    allRoles:[
      'syndicate',
      'owner',
      'tenant'
    ]
  }),
  getters: {
    getUserProfile: (state: UserInfos): null | UserProfile => {
      return state.userProfile;
    },
    getAllRoles: (state: UserInfos): string[] | UserProfile => {
      return state.allRoles;
    },

  },
  actions: {
    updateUserProfile(profile: UserProfile): void {
      this.userProfile = profile;
      this.userProfile.picture = 'http://127.0.0.1:8080' + this.userProfile.picture
    },

  }
});
