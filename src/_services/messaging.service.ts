import Axios from './caller.service'


const newConversation = async <T>(userIds:T):Promise<T> =>{
  return await Axios.post('/api/conversations', userIds)
}

const getAllConversations =<T>():Promise<T> =>{
  return Axios.get('/api/conversations');
}

export const messagingService: {
  getAllConversations: <T>() => Promise<T>;
  newConversation: <T>(userIds: T) => Promise<T>;

} ={
  getAllConversations,
  newConversation

}
