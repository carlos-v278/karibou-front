import Axios from './caller.service';
import {UserAuth} from 'src/utils/interfaces';

//login to the api wich return a token
const login = async <T>(credentials:UserAuth):Promise<T> =>{
  return await Axios.post('/login', credentials)
}

//function logout the user from the Api and remove Token
const logout = <T>():Promise<T> =>{
  localStorage.removeItem('userToken')
  return Axios.get('/logout');
}

//function save token to localStorage
const saveToken = (token :string):void =>{
  localStorage.setItem('userToken', JSON.stringify(token))
}
const getToken = ():string=>{
  const token:string | null  = localStorage.getItem('userToken');
  if(token != null){
    return JSON.parse(token)
  }
  return ''
}

//check if localStorage token exist (is logged)
const isLogged = ():boolean =>{
  const token:string | null = localStorage.getItem('userToken')
  return !! token
}

//export callbacks with type
export const accountService: {
  saveToken: (token: string) => void;
  logout: <T>() => Promise<T>;
  isLogged: () => boolean;
  login: <T>(credentials: UserAuth) => Promise<T>;
  getToken : ()=> string;
} ={
  login,
  logout,
  saveToken,
  isLogged,
  getToken,
}
