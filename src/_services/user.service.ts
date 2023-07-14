import Axios from './caller.service'

const getUserProfile =<T>():Promise<T> =>{
  return Axios.get('/users/profile');
}

const getUserApartments =<T>():Promise<T> =>{
  return Axios.get('/api/apartments');
}


export const userService: {
  getUserProfile: <T>() => Promise<T>;
  getUserApartments: <T>() => Promise<T>;

} ={
  getUserProfile,
  getUserApartments
}
