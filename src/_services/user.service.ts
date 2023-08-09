import Axios from './caller.service'
import {UserProfile} from 'src/utils/interfaces';

 const  getUserProfile = async <T>():Promise<T> =>{
   return await Axios.get('/api/me');
}

const saveUserProfile = (profile : UserProfile):void=>{
  localStorage.setItem('userProfile', JSON.stringify(profile))
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


export const userService: {
  saveUserProfile: (profile: UserProfile) => void;
  removeProfile: () => void;
  getUserProfile: <T>() => Promise<T>;
  getUserApartments: <T>() => Promise<T>;
  getLocalUserProfile : () => UserProfile | undefined

} ={
  getUserProfile,
  removeProfile,
  saveUserProfile,
  getUserApartments,
  getLocalUserProfile,
}
