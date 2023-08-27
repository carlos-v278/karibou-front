<script setup lang="ts">
import {PropType, ref} from 'vue';
import {Conversation} from 'src/utils/interfaces';
import MyAvatar from 'src/features/_base-components/MyAvatar.vue';
const emits = defineEmits(['closeForm'])
import {useUserStore} from 'src/features/_utils/user.store'
import {storeToRefs} from "pinia";

const userStore = useUserStore()

let {getUserProfile} = storeToRefs(userStore)
const props = defineProps({
  conversation: {
    type:Object as PropType<Conversation>
  }
})
let conn = new WebSocket(`ws://127.0.0.1:8081?room=${props.conversation?.id}`)

const messages = ref([]);
const inputMessage = ref('');
const clientInformation = { username: getUserProfile.value?.firstname , message:'',picture:getUserProfile.value?.picture};

conn.onopen = function() {
  console.info("Connection established successfully");

};

conn.onmessage = function(e) {
  let data = JSON.parse(e.data);

  appendMessage(data.username, data.message, data.picture);
};

conn.onerror = function(e) {
  alert('Error: something went wrong with the socket.');
  console.error(e);
};

function appendMessage(username :string, message :string, avatar:string) {
  const from = username === getUserProfile.value?.firstname ? 'me' : username;
  messages.value.push({ id: messages.value.length, from, text: message, picture: avatar});
  console.log(messages.value,'laa')
}

function sendMessage() {
  const msg = inputMessage.value;
  if (!msg) {
    alert("Please send something on the chat");
    return;
  }
  clientInformation.message = msg;
  conn.send(JSON.stringify(clientInformation));
  appendMessage(clientInformation.username, clientInformation.message,clientInformation.picture);
  inputMessage.value = '';
}




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
          :avatar="message?.picture"
          :text="[message.text]"
          :sent="message.from ==='me' ? true:false"
        />

      </div>
    </div>
    <div class="footer">

      <q-input
        rounded
        outlined
        color="primary"
        bg-color="grey-light"
        class="input"
        v-model="inputMessage"
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
    min-height: 80vh;
    .message_container{
      padding: 26px;
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
    width: 50%;
  }
}
</style>
