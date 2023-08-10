import Axios from './caller.service'
import {UserProfile} from 'src/utils/interfaces';

 const  getUserProfile = async <T>():Promise<T> =>{
   return await Axios.get('/api/me');
}

const saveUserProfile = (profile : UserProfile):void=>{
  const localProfile: string | null  = localStorage.getItem('userProfile');
  if(localProfile == null){
    localStorage.removeItem('userProfile')
    localStorage.setItem('userProfile', JSON.stringify(profile))
  } else {
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
const getSyndicateBuildings =<T>():Promise<T> =>{
  return Axios.get('/api/buildings');
}

export const userService: {
  saveUserProfile: (profile: UserProfile) => void;
  removeProfile: () => void;
  getUserProfile: <T>() => Promise<T>;
  getUserApartments: <T>() => Promise<T>;
  getSyndicateBuildings: <T>() => Promise<T>;
  getLocalUserProfile : () => UserProfile | undefined

} ={
  getUserProfile,
  removeProfile,
  saveUserProfile,
  getUserApartments,
  getSyndicateBuildings,
  getLocalUserProfile,
}
