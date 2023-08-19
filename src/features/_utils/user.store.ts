import { defineStore } from 'pinia';
import {Apartment, Building, UserProfile} from 'src/utils/interfaces';
interface UserInfos {
 userProfile: UserProfile | null;
  allRoles: string[];
  userApartments:  null | Apartment[];
  userBuildings:  null | Building[];

}

export const useUserStore = defineStore('user-infos', {
  state: (): UserInfos => ({
    userProfile: null,
    allRoles:[
      'syndicate',
      'owner',
      'tenant'
    ],
    userApartments: null,
    userBuildings: null,

  }),
  getters: {
    getUserProfile: (state: UserInfos): null | UserProfile => {
      return state.userProfile;
    },
    getAllRoles: (state: UserInfos): string[] | UserProfile => {
      return state.allRoles;
    },
    getApartments: (state: UserInfos): null | Apartment[] => {
      return state.userApartments;
    },
    getBuildings: (state: UserInfos): null | Building[] => {
      return state.userBuildings;
    },
  },
  actions: {
    updateUserProfile(profile: UserProfile): void {
      this.userProfile = profile;
    },
    updateUserApartments(apartments: Apartment[]): void {
      this.userApartments = apartments;
    },
    updateUserBuildings(buildings: Building[]): void {
      this.userBuildings = buildings;
    },
    removeUserBuildings(): void {
      this.userBuildings = null;
    },
    removeUserApartments(): void {
      this.userApartments = null;
    },
    removeUserProfile(): void {
      this.userProfile = null;
    },
  }
});
