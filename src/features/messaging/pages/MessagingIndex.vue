<script setup lang="ts">
import MyAvatarOptions from 'src/features/_base-components/MyAvatarOptions.vue';
import {onBeforeMount, reactive, ref} from 'vue';
import FormComponents from 'src/features/_base-components/FormComponents.vue';
import ListItem from 'src/features/_base-components/ListItem.vue';
import ListItems from 'src/features/_base-components/listItems.vue';
import {useUserStore} from 'src/features/_utils/user.store';
import {storeToRefs} from 'pinia';
import { userService} from 'src/_services';
import {Conversation} from 'src/utils/interfaces';
import MyAvatar from 'src/features/_base-components/MyAvatar.vue';
import ToggleBtn from 'src/features/_base-components/ToggleBtn.vue';
import ChatMessage from "src/features/messaging/components/ChatMessage.vue";
const userStore = useUserStore()
onBeforeMount(()=>{
  loadAllconversations();
})
let {getUserProfile} = storeToRefs(userStore)

const slide = ref(1)

//current choice for the toggle of building or apartments
const currentChoice = ref('Message(s)')

//function get emits from switch components
function getCurrentChoice(choice:string):void
{
  currentChoice.value = choice
}
let displayForm = ref(false)
let componentToDisplay = ref('none');

function getCurrFormToDisplay(choice:string):void{

  componentToDisplay.value = choice;
  displayForm.value = true
}

function closeFormComponent(){
  componentToDisplay.value = 'none'
  displayForm.value = false
}

let conversationsList =reactive<Conversation[]>([])
function loadAllconversations():void
{
  userService.getAllConversations()
    .then((res)=>{
        console.log(res)
      conversationsList = res?.data
      conversationsList.forEach((conversation)=>{
        conversation.participants?.forEach((participant)=>{
          if(participant.id != getUserProfile.value?.id){
            conversation.recipient = participant
          }
        })
      })
    }).catch((res)=>{
      console.log(res.status)
  })
}

let currentConversation = ref<Conversation>()
function conversationSelected(conversation:Conversation):void
{
  currentConversation.value = conversation
  getCurrFormToDisplay('message')
}
</script>

<template>
  <q-page class="messaging row  justify-center">
    <div
      class="left"
      :class="{mobile_form : displayForm}"
    >
      <div class="left_header">
        <MyAvatarOptions
          class="avatar"
          @display-form ="getCurrFormToDisplay"
        >
        </MyAvatarOptions>
      </div>
      <div class="conversations">
        <ToggleBtn
          one-txt="Message(s)"
          two-txt="Groupe(s)"
          @current-choice="getCurrentChoice"
        >

        </ToggleBtn>
        <div class="list-items">
          <ListItems
            v-if="currentChoice === 'Message(s)'"
            :list-items="conversationsList"
          >
            <template
              #item="item "
            >
              <ListItem >
                <template #icons>
                  <div class="icon row items-center justify-center">
                    <my-avatar :picture="item.recipient?.picture"></my-avatar>
                  </div>
                </template>
                <template #infos>
                <span
                  style="font-size: 13px; font-weight: 600;"
                  class="item-title"
                >
                   {{item.recipient?.firstname}} {{item.recipient?.lastname}}
                </span>
                  <span
                    v-if="item.recipient?.roles.includes('ROLE_OWNER_CREATE')"
                    style="font-size: 13px; font-weight: 300;"
                    class="items-baseline"
                  >
                  Syndicat
              </span>
                  <span
                    v-if="item.recipient?.roles.includes('ROLE_TENANT_CREATE')"
                    style="font-size: 13px; font-weight: 300;"
                    class="items-baseline"
                  >
                  Propriétaire
              </span>
                  <span
                    v-if="item?.recipient?.roles.includes('ROLE_TENANT_EDIT')"
                    style="font-size: 13px; font-weight: 300;"
                    class="items-baseline"
                  >
                  locataire
              </span>
                </template>
                <template v-slot:actions>
                  <q-btn
                    round
                    unelevated
                    color="white"
                    size="md"
                    text-color="primary"
                    icon="fa-solid fa-message"
                  @click="conversationSelected(item)"
                  />
                </template>
              </ListItem>
            </template>
          </ListItems>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="floating-cloud"  v-if="componentToDisplay === 'none'">
        <div class="cloud-1">
          <img src="@pub/images/svg/cloud-1.svg" alt="karibou-home-cloud">
        </div>
        <div class="cloud-2">
          <img src="@pub/images/svg/cloud-2.svg" alt="karibou-home-cloud">
        </div>
      </div>
      <q-carousel
        v-if="componentToDisplay === 'none'"
        class="carousel"
        animated
        v-model="slide"
        infinite
        autoplay="9000"
        transition="fade"
      >
        <q-carousel-slide
          :name="1"
          img-src="@pub/images/illustration-town-1.png">

        </q-carousel-slide>
        <q-carousel-slide
          :name="2"
          img-src="@pub/images/illustration-town-2.png"
        >
        </q-carousel-slide>
      </q-carousel>
    </div>
    <FormComponents
      v-if="componentToDisplay ===  'informations' ||
     componentToDisplay === 'owner-inv' ||
     componentToDisplay === 'tenant-inv'"
      @close-form="closeFormComponent()"
      :component="componentToDisplay"
    ></FormComponents>
  <ChatMessage
    v-if="componentToDisplay ===  'message'"
    :conversation="currentConversation"
    @close-form="closeFormComponent()"
  >

  </ChatMessage>

  </q-page>
</template>

<style scoped lang="scss">
.messaging{
  width: 100%;
  display: flex;
  .mobile_form{
    display: none;
  }
  .left{

    flex: 2;
    padding: 50px 30px;
    .list-items{
      max-width: 600px;
      margin: 0 auto;
    }
    .left_header{
      max-width:650px ;
      width: 100%;
      margin: 5px auto 45px;
      display: flex;
      justify-content: space-between;
      .avatar{
        margin-left: auto;

      }
    }
    .conversations {
      max-width: 650px;
      margin: 0 auto;
    }
  }
  .right{
    display: none;
    overflow-y: scroll;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .cloud-1{
      top:150px;
      left: 300px;
    }
    .cloud-2{
      top:180px;
      left: 100px;
    }


  }

}


@media screen and (min-width: 977px) {
  .messaging{
    .mobile_form {
      display: block;
    }
    .left{
      flex: 1.5;
      padding:  50px 20px 50px 120px;
    }
    .right{
      display: block;
      position: relative;
      flex: 1.60;
      min-height: 100vh;
      .carousel{
        width: 100%;
        height: 100vh;
      }
      .cloud-1 ,.cloud-2{
        z-index: 1;
        max-width: 100px;
        width: 100%;
        position: absolute;

      }
    }
  }
}
</style>
