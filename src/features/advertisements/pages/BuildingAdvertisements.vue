<script setup lang="ts">
import MyAvatarOptions from 'src/features/_base-components/MyAvatarOptions.vue';
import {onBeforeMount, reactive, ref} from 'vue';
import FormComponents from 'src/features/_base-components/FormComponents.vue';
import PropertyDetails from 'src/features/_base-components/PropertyDetails.vue';
import {  useRoute } from 'vue-router'
import {useStoreBaseFeatures} from 'stores/base-features';
import {buildingService} from 'src/_services';
import AdvertisementCard from 'src/features/advertisements/components/AdvertisementCard.vue';
import {Advertisement} from 'src/utils/interfaces';
import ViewAdvertisement from 'src/features/advertisements/components/ViewAdvertisement.vue';

onBeforeMount(async ()=>{
  await loadBuildingDetails();
})

//vue router
const route = useRoute()

const slide = ref(1)
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


let buildingAdvertisements = ref<Advertisement[]>()

//loading building infos with advertisements
async function loadBuildingDetails()
{
  useStoreBaseFeatures().enableLoading()
  await buildingService.getBuildingDetails(route.params.id)
    .then(<Response>(response:Response) => {
      console.log(response.data)
      buildingAdvertisements.value = response?.data?.advertisements
      useStoreBaseFeatures().disableLoading()
    })
    .catch((error)=>{
      console.log('error', error)
      useStoreBaseFeatures().disableLoading()
    })
}

let currentAdvertisement = ref<Advertisement  | null>(null)
function displayCurrentAdvert(advertisement :Advertisement):void{
  currentAdvertisement.value = advertisement
  getCurrFormToDisplay('advertisement')
}


</script>

<template>
  <q-page class="advertisements row  justify-center">
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
      <div class="buildings-advertisement">
        <PropertyDetails
          icon='fa-solid fa-bullhorn'
          component-title="Annonces du voisinage"
          type="Plusieurs type d’annonces peuvent être publié: vente, job, information"

        >
          <template #actions>
            <q-icon
              name="fa-solid fa-plus"
              round
              size="sm"
              color="primary"
              class="cursor-pointer"
              @click="getCurrFormToDisplay('add-advertisement')"
            />
            <q-icon
              name="fa-solid fa-arrows-rotate"
              round
              size="sm"
              color="primary"
              class="cursor-pointer"
              @click="loadBuildingDetails"
            />
          </template>
        </PropertyDetails>
        <div class="list-items">
          <AdvertisementCard
            v-for="advertisement in buildingAdvertisements"
            :key="advertisement.id"
            :advertisement = advertisement
            @current-advertisement="displayCurrentAdvert"
          ></AdvertisementCard>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="floating-cloud"   v-if="componentToDisplay === 'none'">
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
      componentToDisplay === 'add-advertisement' ||
      componentToDisplay === 'tenant-inv'"

        @close-form="closeFormComponent()"
        :component="componentToDisplay"
      ></FormComponents>
      <view-advertisement
        :advertisement="currentAdvertisement"
        v-if="componentToDisplay ===  'advertisement' && Object.keys(currentAdvertisement).length != 0"
      >
      </view-advertisement>
    </div>

  </q-page>
</template>

<style scoped lang="scss">
.advertisements{

  width: 100%;
  .mobile_form{
    display: none;
  }
  .left{

    padding: 50px 30px;

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
    .buildings-advertisement {
      max-width: 650px;
      margin: 0 auto;
    }
  }
  .right{
    position: relative;
    width: 100%;

    overflow-y: scroll;
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
  .advertisements{

    .mobile_form {
      display: block;
    }
    .left{
      position: fixed;
      max-height: 100%;
      overflow: scroll;
      width: 50%;
      left: 0;
      padding:  50px 20px 50px 120px;
      min-height: 100vh;
    }
    .right{
      position: fixed;
      max-height: 100%;
      overflow: scroll;
      width: 50%;
      right: 0;
      border-left: 2px solid $grey-light;
      display: block;
      flex: 1.60;
      min-height: 100vh;
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
