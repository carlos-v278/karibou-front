import { useStoreAuth } from 'src/features/authentication/utils/user';
import {ApiInstance} from 'src/utils/api';
import { UserAuth } from 'src/utils/interfaces'
import {AxiosResponse} from 'axios';
export function getLocalToken():boolean{
  const userToken:string | null = window.localStorage.getItem('userToken') != null ? window.localStorage.getItem('userToken') : null;
  if(userToken != null){
    useStoreAuth().updateToken(userToken)
    return true
  }
  return false
}

//function for connect the user
export  function userConnect(user : UserAuth):void{

  ApiInstance.post('/connexion', user)
    .then((response) => {
      const token: string = response.data?.token
      if (token != '') {
        console.log(token)
        useStoreAuth().updateToken(token)
        window.localStorage.setItem(
          'userToken',
          JSON.stringify(token)
        );
      }

    })
    .catch((error) => {
      console.log('error', error);
    })

}
