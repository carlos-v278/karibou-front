import Axios from './caller.service'
import {Apartment, Building, UserProfile} from 'src/utils/interfaces';

 const  getUserProfile = async <T>():Promise<T> =>{
   return await Axios.get('/api/me');
}

const saveUserProfile = (profile : UserProfile):void=>{
  const localProfile: string | null  = localStorage.getItem('userProfile');
  if(localProfile == null){
    localStorage.setItem('userProfile', JSON.stringify(profile))
  } else {
    localStorage.removeItem('userProfile')
    localStorage.setItem('userProfile', JSON.stringify(profile))
  }
}
const removeProfile = ():void=>{
  localStorage.removeItem('userProfile')
}
const getLocalUserProfile = (): UserProfile | undefined =>{
  const profile: string | null  = localStorage.getItem('userProfile');
  if(profile != null){
    return JSON.parse(profile)
  }
  return undefined;
}

const getUserApartments =<T>():Promise<T> =>{
  return Axios.get('/api/apartments');
}

const saveUserApartments = (apartments : Apartment[]):void=>{
  const userApartments: string | null  = localStorage.getItem('userApartments');
  if(userApartments == null){
    localStorage.setItem('userApartments', JSON.stringify(apartments))
  } else {
    localStorage.removeItem('userApartments')
    localStorage.setItem('userApartments', JSON.stringify(apartments))
  }
}
const removeUserApartments = ():void=>{
  localStorage.removeItem('userApartments')
}
const getLocalUserApartments = (): Apartment[] | undefined => {
  const userApartments: string | null = localStorage.getItem('userApartments');
  if (userApartments !== null && userApartments !== "undefined") {
    try {
      return JSON.parse(userApartments);
    } catch (error) {
      console.error("Error parsing userApartments:", error);
      return undefined;
    }
  }
  return undefined;
}
const saveUserBuildings = (buildings : Building[]):void=>{
  const userBuildings: string | null  = localStorage.getItem('userBuildings');
  if(userBuildings == null){
    localStorage.setItem('userBuildings', JSON.stringify(buildings))
  } else {

    localStorage.removeItem('userBuildings')
    localStorage.setItem('userBuildings', JSON.stringify(buildings))
  }
}
const removeUserBuildings = ():void=>{
  localStorage.removeItem('userBuildings')
}
const getLocalUserBuildings = (): Building[] | undefined => {
  const userBuildings: string | null = localStorage.getItem('userBuildings');
  if (userBuildings != null) {
    try {
      return JSON.parse(userBuildings);
    } catch (error) {
      console.error("Error parsing userBuildings:", error);
      return undefined;
    }
  }
  return undefined;
}


const getSyndicateBuildings =<T>():Promise<T> =>{
  return Axios.get('/api/buildings');
}

// conversations
const getAllConversations =<T>():Promise<T> =>{
  return Axios.get('/api/conversations');
}

export const userService: {
  saveUserProfile: (profile: UserProfile) => void;
  saveUserApartments: (apartments: Apartment[]) => void;
  saveUserBuildings: (buildings: Building[]) => void;
  removeProfile: () => void;
  removeUserBuildings: () => void;
  removeUserApartments: () => void;
  getUserProfile: <T>() => Promise<T>;
  getUserApartments: <T>() => Promise<T>;
  getSyndicateBuildings: <T>() => Promise<T>;
  getLocalUserProfile : () => UserProfile | undefined;
  getLocalUserApartments : () => Apartment[] | undefined;
  getLocalUserBuildings : () => Building[] | undefined;
  getAllConversations: <T>() => Promise<T>;

} ={
  getUserProfile,
  removeProfile,
  removeUserBuildings,
  removeUserApartments,
  saveUserApartments,
  saveUserBuildings,
  saveUserProfile,
  getUserApartments,
  getLocalUserBuildings,
  getLocalUserApartments,
  getSyndicateBuildings,
  getLocalUserProfile,
  getAllConversations,
}
