<script setup lang="ts">
import {PropType, ref, watch} from 'vue';
import {Conversation, Message, UserMessage} from 'src/utils/interfaces';
import MyAvatar from 'src/features/_base-components/MyAvatar.vue';
const emits = defineEmits(['closeForm', 'reRender'])
import {useUserStore} from 'src/features/_utils/user.store'
import {storeToRefs} from "pinia";

const userStore = useUserStore()

let {getUserProfile} = storeToRefs(userStore)
const props = defineProps({
  conversation: {
    type:Object as PropType<Conversation>
  }
})


//init the connexion to the backend server socket
let conn = new WebSocket(`ws://127.0.0.1:8081?room=${props.conversation?.id}`)

//list all the messages from both users
const messages = ref<Message[]>([]);


//current user informations
const currentUserConnected = ref<UserMessage>({
  id: getUserProfile.value?.id,
  username: getUserProfile.value?.firstname ,
  message:'',
  picture: getUserProfile.value?.picture
});

// method to open the socket tunel
conn.onopen = function() {
  console.info("Connection established successfully");

};

//method which load all the message sent to the socket
conn.onmessage = function(e) {
  let data = JSON.parse(e.data);
  pushMessage(
    data.id,
    data.username,
    data.message,
    data.picture
  );
};

conn.onerror = function(e) {
  alert('Error: something went wrong with the socket.');
  console.error(e);
};

//method whick help to push new message to all the messages with both
function pushMessage(id:number, username :string, message :string, avatar:string) {
  const from = username === getUserProfile.value?.firstname ? 'me' : username;
  messages.value.push(
    { id: id,
      from,
      text: message,
      picture: avatar
    });

}

function sendMessage() {
  if (!currentUserConnected.value.message) {
    alert("Veuillez remplir le champ");
    return;
  }
  conn.send(JSON.stringify(currentUserConnected.value));
  pushMessage(
    currentUserConnected.value.id,
    currentUserConnected.value.username,
    currentUserConnected.value.message,
    currentUserConnected.value.picture
  );
  currentUserConnected.value.message = '';
}

watch(props, () => {
  console.log('here')
  emits('reRender')
})



</script>
<template>
  <div class="conversation">

    <div class="header">
      <q-btn
        size="sm"
        color="grey-light"
        text-color="black"
        class="btn-back"
        round
        icon="fa-solid fa-arrow-left"
        @click="emits('closeForm')"
      />
      <div class="recipient">
        <my-avatar :picture="props.conversation?.recipient?.picture"></my-avatar>
        <div class="recipient-infos">
          <span class="name">{{ props.conversation?.recipient?.firstname }} {{ props.conversation?.recipient?.lastname }}</span>
          <div class="roles">

              <span
                v-if="props.conversation?.recipient?.roles.includes('ROLE_OWNER_CREATE')"

                class="role"
              >
                  Syndicat
              </span>
              <span
              v-if="props.conversation?.recipient?.roles.includes('ROLE_TENANT_CREATE')"

              class="role"
            >
                  Propriétaire
              </span>
              <span
              v-if="props.conversation?.recipient?.roles.includes('ROLE_TENANT_EDIT')"

              class="role"
            >
                  locataire
              </span>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="message_container">
        <q-chat-message
          v-for="(message,index) in messages"
          :key="index"
          :name="message.from"

          :text="[message.text]"
          :sent="message.from ==='me' ? true:false"
        >
          <template #avatar>
            <my-avatar
              class="avatar"
              :picture="message?.picture"
            >

            </my-avatar>
          </template>
      </q-chat-message>
      </div>
    </div>
    <div class="footer">

      <q-input
        rounded
        outlined
        color="primary"
        bg-color="grey-light"
        class="input"
        v-model="currentUserConnected.message"
        @keyup.enter="sendMessage()"
        dense
      >
        <template v-slot:append>
          <q-icon
            name="fa-solid fa-paper-plane"
            round size="xs"
            color="primary"
            @click="sendMessage()"
          />
        </template>
      </q-input>
    </div>
  </div>
</template>

<style scoped lang="scss">
.conversation{
  padding: 15px;
  position: relative;
  width: 100%;
  border-left: 2px solid $grey-light;
  .header{
    padding: 12px 0;
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%;
    .btn-back{
      width: 40px !important;
      height: 40px;
    }
    .recipient{
      display: flex;
      gap: 15px;
      align-items: center;
      .recipient-infos{
        .name{
          font-size: var(--fs-600);
          font-weight: 500;
        }
        .role {
          font-size: var(--fs-400);
          font-weight: 300;
        }
      }
    }
  }

  .main{
    background: $grey-light;
    border-radius: 10px;
    min-height: 70vh;
    .message_container{
      padding: 26px;
      .avatar{
      margin: 0 10px;
      }
    }
  }
  .footer{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .input{
      width: 100%;

    }
  }

}
@media screen and (min-width: 977px) {
  .conversation{
    width: 100%;
  }
}
</style>
