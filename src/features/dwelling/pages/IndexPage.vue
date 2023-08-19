<script setup lang="ts">
import {onBeforeMount, onMounted, reactive, ref} from 'vue'
import ListItem from 'src/features/_base-components/ListItem.vue';
import ListItems from 'src/features/_base-components/listItems.vue';
import ToggleBtn from 'src/features/_base-components/ToggleBtn.vue';

import {useStoreBaseFeatures} from 'stores/base-features';
import {useUserStore} from 'src/features/_utils/user.store'
import { userService} from 'src/_services';
import {
  Building,
  Apartment, CurBuildingDetails,
} from 'src/utils/interfaces';
import FormComponents from 'src/features/dwelling/components/FormComponents.vue';
import BuildingDetails from 'src/features/dwelling/components/BuildingDetails.vue';
import MyAvatarOptions from 'src/features/_base-components/MyAvatarOptions.vue';
import {storeToRefs} from 'pinia';
import MyApartementDetails from 'src/features/dwelling/components/MyApartementDetails.vue';


//import stores
const baseFeatures = useStoreBaseFeatures();
const userStore = useUserStore()

let {getBuildings,getApartments,getUserProfile} = storeToRefs(userStore)
//all user data ex: profile and current role

//lifes cycles hooks
onBeforeMount( ():void => {
  if(getApartments.value != null ){
    userApartments.value = getApartments.value
    console.log('1',getApartments.value)
  }
  if(getBuildings.value != null ){
    userBuildings = getBuildings.value
    console.log('2')
  }

})
onMounted(async ()=>{
  let roles = await  getUserProfile?.value?.roles

  if(roles != undefined && roles.includes('ROLE_SYNDIC_EDIT') ){
    getSyndicBuildings()
    console.log(roles,'laaa')
  }
 else{
    console.log(roles,'ici')
    loadApartments();
  }
})

//images slider
const slide = ref(1)

//current choice for the toggle of building or apartments
const currentChoice = ref('imeuble')

//function get emits from switch components
function getCurrentChoice(choice:string):void
{
  currentChoice.value = choice
}

//building of the user
let userBuildings = reactive<Building[]>([])

//Apartments of the user
let userApartments = ref<Apartment[]>([])

//Get Appartments and building request from the APi
function loadApartments():void
{
  baseFeatures.enableLoading()

  userService.getUserApartments()
    .then(<Response>(response:Response) => {
      userStore.removeUserApartments()
      userStore.removeUserBuildings()
      userService.removeUserApartments
      userService.removeUserBuildings

      userApartments.value = response.data;
      console.log(userBuildings.length,'la of')
      if(userBuildings.length === 0){
        userApartments.value.forEach((apart:Apartment)=>{
          userBuildings.push(apart.building  )
        })
      }
      userService.saveUserBuildings(userBuildings)
      userService.saveUserApartments(userApartments.value)
      userStore.updateUserBuildings(userBuildings)
      userStore.updateUserApartments(userBuildings)
      baseFeatures.disableLoading()
    })
    .catch((error) => {
      console.log('error', error);
      baseFeatures.disableLoading()
    })

}

//get all syndicate's Buildings
function getSyndicBuildings():void
{
  baseFeatures.enableLoading()

    userService.getSyndicateBuildings()
      .then(<Response>(response:Response) => {
        userStore.removeUserApartments()
        userStore.removeUserBuildings()
        userService.removeUserApartments
        userService.removeUserBuildings
        userBuildings = response.data;
        userService.saveUserBuildings(userBuildings)
        userStore.updateUserBuildings(userBuildings)
        baseFeatures.disableLoading()
      })
      .catch((error) => {
        console.log('error', error);
        baseFeatures.disableLoading()
      })

}


let componentToDisplay = ref('none');
let displayForm = ref(false)

//get the emits from the Avatar component to display the chosen form
function getCurrFormToDisplay(choice:string):void{

  componentToDisplay.value = choice;
  displayForm.value = true
}

function closeFormComponent(){
  componentToDisplay.value = 'none'
  displayForm.value = false
}


let currBuildingSelected = reactive<CurBuildingDetails>({
  id:undefined,
  label:undefined
})
//select the current building and show the building coponent
function selectBuildingDetails(buildingId: number,buildingLabel:string):void{
  getCurrFormToDisplay('building-details')
  currBuildingSelected.id = buildingId
  currBuildingSelected.label = buildingLabel
}

let currentApartementSelected = ref <number| undefined >( undefined)
function displayMyApartement(id):void{
  currentApartementSelected.value = id
  getCurrFormToDisplay('mon-appartement');
}
</script>
<template>
  <q-page class="page_container row  justify-center">
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
      <ToggleBtn
        one-txt="imeuble"
        two-txt="appartement"
        @current-choice="getCurrentChoice"
      >

      </ToggleBtn>
      <div class="list-items">
          <!--        Building lists-->
        <ListItems
          v-if="currentChoice === 'imeuble'"
          :list-items="userBuildings"
        >
          <template
            #item="{id,street,number,zipcode, city}"
          >
            <ListItem >
              <template #icons>
                <div class="icon row items-center justify-center">
                  <q-icon
                    name="fa-solid fa-building"
                    round size="md"
                    color="primary"
                  />
                </div>
              </template>
              <template #infos>
                <span
                  style="font-size: 13px; font-weight: 600;"
                  class="item-title"
                >
                  {{number}} {{street}}, {{zipcode}} {{city}}
                </span>
                <span
                  style="font-size: 13px; font-weight: 300;"
                  class="items-baseline"
                >
                  Résidence
                </span>
              </template>
              <template v-slot:actions>
                <q-btn
                  round
                  unelevated
                  color="white"
                  size="md"
                  text-color="primary"
                  icon="fa-solid fa-angle-right"
                  @click="selectBuildingDetails(id, `${number} ${street}, ${city}`)"
                />
              </template>
            </ListItem>
          </template>
        </ListItems>
        <!--        apartments lists-->
        <ListItems
          v-else
          :list-items="userApartments"
        >
          <template #item="{id,number,floor}">
            <ListItem >
              <template #icons>
                <div class="icon row items-center justify-center">
                  <q-icon
                    name="fa-solid fa-building-user"
                    round
                    size="md"
                    color="primary"
                  />
                </div>
              </template>
              <template #infos>
                <span
                  style="font-size: 13px; font-weight: 600;"
                  class="item-title"
                >
                  Appartment N°{{number}} , étage N°{{floor}}
                </span>
                <span
                  style="font-size: 13px; font-weight: 300;"
                  class="items-baseline"
                >
                  Appartement
                </span>
              </template>
              <template v-slot:actions>
                <q-btn
                  round
                  unelevated
                  color="white"
                  size="md"
                  text-color="primary"
                  icon="fa-solid fa-angle-right"
                  @click="displayMyApartement(id)"
                />
              </template>
            </ListItem>
          </template>
        </ListItems>
      </div>
    </div>
    <div class="right" v-if="componentToDisplay === 'none'">
      <div class="floating-cloud" >
        <div class="cloud-1">
          <img src="@pub/images/svg/cloud-1.svg" alt="karibou-home-cloud">
        </div>
        <div class="cloud-2">
          <img src="@pub/images/svg/cloud-2.svg" alt="karibou-home-cloud">
        </div>
      </div>
      <q-carousel
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
    <BuildingDetails
      v-if="componentToDisplay ===  'building-details'"
      :building-id="currBuildingSelected.id"
      @close-form="closeFormComponent()"
      :building-label="currBuildingSelected.label"
    >

    </BuildingDetails>
    <MyApartementDetails
      v-if="componentToDisplay ===  'mon-appartement'"
      @close-form="closeFormComponent()"
      :current-apartement=currentApartementSelected
    ></MyApartementDetails>
  </q-page>
</template>

<style lang="scss" scoped>
.page_container{
  width: 100%;
  display: flex;
  .mobile_form{
    display: none;
  }
  .left{

    flex: 2;
    padding: 50px 30px;
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
  .page_container{
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
