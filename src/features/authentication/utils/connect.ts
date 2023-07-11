import { useStoreAuth } from 'src/features/authentication/utils/user';
import {ApiInstance} from 'src/utils/api';
import { UserAuth } from 'src/utils/interfaces'
export function getLocalToken():boolean{
  let userToken:string | null = window.localStorage.getItem('userToken') != null ? window.localStorage.getItem('userToken') : null;
  if(userToken != null){
    userToken = JSON.parse(userToken);
    if (typeof userToken === 'string') {
      useStoreAuth().updateToken(userToken)
    }
    return true
  }
  return false
}

//function for connect the user
export const userConnect = async (user:UserAuth): Promise<boolean> => {
  try {
    const response = await ApiInstance.post('/connexion', user);
    const token = response.data?.token;
    if (token !== '') {
      useStoreAuth().updateToken(token);
      window.localStorage.setItem('userToken', JSON.stringify(token));
    }

    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

