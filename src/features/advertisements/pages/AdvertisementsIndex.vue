<script setup lang="ts">
import MyAvatarOptions from 'src/features/_base-components/MyAvatarOptions.vue';
import {ref} from 'vue';
import FormComponents from 'src/features/dwelling/components/FormComponents.vue';
import PropertyDetails from 'src/features/_base-components/PropertyDetails.vue';
import ListItem from 'src/features/_base-components/ListItem.vue';
import ListItems from 'src/features/_base-components/listItems.vue';
import {useUserStore} from 'src/features/_utils/user.store';
import {storeToRefs} from 'pinia';

const userStore = useUserStore()

let {getBuildings,getApartments,getUserProfile} = storeToRefs(userStore)

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
          component-title="Annonces du voisinages"
          type="Selectionner un imeuble"

        >
          <template #actions>
            <q-icon
              name="fa-solid fa-plus"
              round
              size="sm"
              color="primary"

            />
          </template>
        </PropertyDetails>
        <div class="list-items">
          <ListItems
            :list-items="getBuildings"
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
                    :to="`/buildings/${id}/annonces`"
                  />
                </template>
              </ListItem>
            </template>
          </ListItems>
        </div>
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


  </q-page>
</template>

<style scoped lang="scss">
.advertisements{
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
  .advertisements{
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
