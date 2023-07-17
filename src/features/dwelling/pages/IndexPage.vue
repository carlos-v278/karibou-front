<script setup lang="ts">
import { onMounted, reactive, ref} from 'vue'
import ListItem from 'src/features/_base-components/ListItem.vue';
import ListItems from 'src/features/_base-components/listItems.vue';
import ToggleBtn from 'src/features/_base-components/ToggleBtn.vue';
import MyAvatar from 'src/features/_base-components/MyAvatar.vue';
import {useStoreBaseFeatures} from 'stores/base-features';
import {useUserStore} from 'src/features/_utils/user.store'
import {userService} from 'src/_services';
import { Building, Apartment,} from 'src/utils/interfaces';
import EditProfileInfos from 'src/features/dwelling/components/EditProfileInfos.vue';
import {storeToRefs} from 'pinia';


//import stores
const baseFeatures = useStoreBaseFeatures();
const userData = useUserStore();

//all user data ex: profile and current role
const {getUserProfile} = storeToRefs(userData)

//lifes cycles hooks
onMounted( ():void => {
  getApartments();
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
let userApartments = reactive<Apartment[]>([])

//Get Appartments and building request from the APi
function getApartments():void
{
  baseFeatures.enableLoading()

  userService.getUserApartments()
    .then(<Response>(response:Response) => {
      userApartments = response.data;
      userApartments.forEach((apart:Apartment )=>{
        userBuildings.push(apart.building)
      })
      baseFeatures.disableLoading()
    })
    .catch((error) => {
      console.log('error', error);
      baseFeatures.disableLoading()
    })

}


let componentToDisplay = ref('none');
//get the emits from the Avatar component to display the chosen form
function getCurrFormToDisplay(choice:string):void{

  componentToDisplay.value =  choice;
  console.log(componentToDisplay.value)
}


// profile informations to edit
let profileInfosEdit = reactive({
  firstname : undefined,
  lastname : undefined,
  username :undefined,
  picture : undefined,
  password:undefined
})



function updateModelValue():void {
  console.log(profileInfosEdit)
}
</script>
<template>
  <q-page class="page_container row  justify-center">
    <div class="left ">
      <div class="left_header">
        <MyAvatar
          class="avatar"
          @display-form ="getCurrFormToDisplay"
        >
        </MyAvatar>
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
            #item="{street,number,zipcode, city}"
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
          <template #item="{number,floor}">
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
    <EditProfileInfos
      v-if="componentToDisplay === 'informations'"
      title="Modifier vos informations personnels"
      @go-back="componentToDisplay = 'none'"
      :request="{method:'patch',url:`api/users/${getUserProfile?.id}` }"
      :form-data="profileInfosEdit"
    >
      <template #header>
        <div
          class="row avatar-edit no-wrap items-center"
        >
          <q-avatar >
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <q-file
            color="lime-11"
            bg-color="grey-light"
            filled
            label="Photo de profil"
            class="q-ml-md"
            style="width: 100%"
          >
            <template v-slot:prepend>
              <q-icon name="attachment" />
            </template>
          </q-file>
        </div>
      </template>
      <template #main>
        <q-input
          class="row-input"
          filled
          type="text"
          v-model="profileInfosEdit.firstname"
          :model-value="profileInfosEdit.firstname ===''? profileInfosEdit.firstname = undefined : profileInfosEdit.firstname"
          @update:modelValue="updateModelValue"
          label="Prenom"


        />

        <q-input
          class="row-input"
          filled
          v-model="profileInfosEdit.lastname"
          type="text"
          label="Nom"
          lazy-rules

        />
        <q-input
          class="row-input"
          filled
          v-model="profileInfosEdit.username"
          type="text"
          label="Username"
          lazy-rules

        />
        <q-input
          class="row-input"
          filled
          v-model="profileInfosEdit.password"
          type="password"
          label="Mot de passe"
          lazy-rules

        />
      </template>
      <template #footer>
        <q-btn
          class="row-input btn-cta"
          label="Modifier"
          type="submit"
          color="primary"/>
      </template>
    </EditProfileInfos>
  </q-page>
</template>

<style lang="scss" scoped>
.page_container{
  width: 100%;
  display: flex;
  min-height: 100vh;

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
.icon{
  background: white;
  width: 56px;
  height: 56px;
  padding: 7.8px;
  border-radius: 50%;
}


@media screen and (min-width: 1081px) {
  .page_container{
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
