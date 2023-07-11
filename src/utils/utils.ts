import { Notify } from 'quasar'
export function notify (message:string,type:string):void {

  Notify.create({
    type: type,
    message: message
  })
}
