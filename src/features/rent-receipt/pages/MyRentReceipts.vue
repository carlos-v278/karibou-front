<script setup lang="ts">
import MyAvatarOptions from 'src/features/_base-components/MyAvatarOptions.vue';
import {nextTick, onBeforeMount, reactive, ref} from 'vue';
import FormComponents from 'src/features/_base-components/FormComponents.vue';
import PropertyDetails from 'src/features/_base-components/PropertyDetails.vue';
import {  useRoute } from 'vue-router'
import {useStoreBaseFeatures} from 'stores/base-features';
import {buildingService, messagingService, userService} from 'src/_services';
import AdvertisementCard from 'src/features/advertisements/components/AdvertisementCard.vue';
import {Advertisement, Conversation, RentReceipt} from 'src/utils/interfaces';
import ViewAdvertisement from 'src/features/advertisements/components/ViewAdvertisement.vue';
import ChatMessage from "src/features/messaging/components/ChatMessage.vue";
import {useUserStore} from "src/features/_utils/user.store";
import {storeToRefs} from "pinia";
import ListItems from "src/features/_base-components/listItems.vue";
import ToggleBtn from "src/features/_base-components/ToggleBtn.vue";
import MyAvatar from "src/features/_base-components/MyAvatar.vue";
import ListItem from "src/features/_base-components/ListItem.vue";
import MyApartementDetails from "src/features/dwelling/components/MyApartementDetails.vue";
import BuildingDetails from "src/features/dwelling/components/BuildingDetails.vue";

const userStore = useUserStore()
onBeforeMount(()=>{
  loadAllRentReceipt();
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

let allRentReceipts =ref<RentReceipt[]>([])

//get all rent receipt from the current user connected
function loadAllRentReceipt():void
{
  useStoreBaseFeatures().enableLoading()
  userService.getAllRentReceipts()
    .then((res)=>{
      allRentReceipts.value = res.data
      useStoreBaseFeatures().disableLoading()
    }).catch((res)=>{
      useStoreBaseFeatures().disableLoading()
      console.log(res)
  })
}



</script>

<template>
  <q-page class="receipt row  justify-center">
    <div
      class="left"
      :class="{left_mobile_form : displayForm}"
    >
      <div class="left_header">
        <MyAvatarOptions
          class="avatar"
          @display-form ="getCurrFormToDisplay"
        >
        </MyAvatarOptions>
      </div>
      <PropertyDetails
        class="header_banner"
        icon='fa-solid fa-bullhorn'
        component-title="Mes quittances de loyer"
        type="Gestion des quittances entre le propriétaire et locataire"

      >
        <template #actions>

          <q-icon
            name="fa-solid fa-arrows-rotate"
            round
            size="sm"
            color="primary"
            class="cursor-pointer"
            @click="loadAllRentReceipt()"
          />
          <q-icon
            v-if="getUserProfile?.roles.includes('ROLE_OWNER_EDIT')"
            name="fa-solid fa-add"
            round
            size="sm"
            color="primary"
            class="cursor-pointer"
            @click="getCurrFormToDisplay('new-receipt')"
          />
        </template>
      </PropertyDetails>

      <div class="list-items">
        <ListItems

          :list-items="allRentReceipts"
        >
          <template
            #item="item "
          >
            <ListItem >
              <template #icons>
                <div class="icon row items-center justify-center">
                  <q-icon
                    size="sm"
                    color="primary"
                    class="btn-back"
                    name="fa-solid fa-file-invoice"
                  />
                </div>
              </template>
              <template #infos>
                <span
                  style="font-size: 13px; font-weight: 600;"
                  class="item-title"
                >
                   Quittance {{item.month}}
                </span>
                <span> Payé </span>
              </template>
              <template v-slot:actions>
                <a target="_blank" :href="item.file">
                  <q-btn
                    round
                    unelevated
                    color="white"
                    size="sm"
                    text-color="primary"
                    icon="fa-solid fa-download"

                  />
                </a>
              </template>
            </ListItem>
          </template>
        </ListItems>
      </div>
    </div>
    <div
      class="right"
      :class="{right_mobile_form : displayForm}"
    >
      <div class="floating-cloud" v-if="componentToDisplay === 'none'">
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
      <FormComponents
        v-if="componentToDisplay ===  'informations' ||
      componentToDisplay === 'owner-inv' ||
      componentToDisplay === 'add-conversation' ||
      componentToDisplay === 'new-receipt' ||
      componentToDisplay === 'tenant-inv'"
        @close-form="closeFormComponent()"
        :component="componentToDisplay"
      ></FormComponents>

    </div>


  </q-page>
</template>

<style lang="scss" scoped>
.receipt{
  width: 100%;
  display: flex;
  .left_mobile_form{
    display: none !important;
  }
  .right_mobile_form{
    display: block !important;
  }
  .left{

    flex: 2;
    padding: 50px 30px;
    .header_banner{
      max-width:678px ;
      margin: 30px auto;
    }
    .list-items{
      max-width:578px ;
      width: 100%;
      margin: 0 auto;
    }
    .left_header{
      max-width:578px ;
      width: 100%;
      margin: 5px auto 45px;
      display: flex;
      justify-content: space-between;
      .avatar{
        margin-left: auto;

      }
    }
  }
  .right{
    right: 0;
    border: 2px solid $grey-light;
    width: 100%;
    display: none;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .cloud-1{
      display: none;
      top:150px;
      left: 300px;
    }
    .cloud-2{
      display: none;
      top:180px;
      left: 100px;
    }


  }

}


@media screen and (min-width: 977px) {
  .receipt{
    .left_mobile_form{
      display: block !important;
    }
    .right_mobile_form{
      display: block !important;
    }
    .left{

      padding:  50px 20px 50px 120px;
      width: 50%;
      min-height: 100vh;
      position: fixed;
      overflow: scroll;
      max-height: 100%;
      left: 0;
    }
    .right{
      display: block;
      width: 50%;
      right: 0;
      min-height: 100vh;
      position: fixed;
      overflow: scroll;
      max-height: 100%;
      .carousel{
        width: 100%;
        height: 100vh;
      }
      .cloud-1 ,.cloud-2{
        display: block;
        z-index: 1;
        max-width: 100px;
        width: 100%;
        position: absolute;

      }
    }
  }
}
</style>

