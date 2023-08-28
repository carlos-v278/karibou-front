import { defineStore } from 'pinia';
import {Apartment, Building, Person, UserProfile} from 'src/utils/interfaces';
interface UserInfos {
 userProfile: UserProfile | null;
  allRoles: string[];
  userApartments:  null | Apartment[];
  userBuildings:  null | Building[];
  allUsersFromBuildings?: Person[];

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
    allUsersFromBuildings: undefined

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
    getAllUsersFromBuildings: (state: UserInfos):  undefined| Person[] => {
      return state.allUsersFromBuildings;
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
    updateAllUsersFromBuildings(allUsers : Person[]): void
    {
      this.allUsersFromBuildings?.forEach((oldMember:Person) =>{
        this.allUsersFromBuildings = allUsers.filter((newMember:Person) => newMember.id != oldMember.id)
      })
    },
  }
});
