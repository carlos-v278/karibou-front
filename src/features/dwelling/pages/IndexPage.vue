<script setup lang="ts">
import {onBeforeMount, reactive, ref} from 'vue'
import ListItem from 'src/features/base-components/ListItem.vue';
import ListItems from 'src/features/base-components/listItems.vue';
import ToggleBtn from 'src/features/base-components/ToggleBtn.vue';
import MyAvatar from 'src/features/base-components/MyAvatar.vue';
import {ApiInstance} from 'src/utils/api';
import {User, Building, Apartment,} from 'src/utils/interfaces';

//lifes cycles
onBeforeMount( ():void => {
  getApartments();
})

const slide = ref(1)

//function get emits from switch components
function getCurrentChoice(choice:string):void
{
  console.log(choice,'outside')
}


//building of the user
let userBuildings = reactive<Building[]>([

])

//Apartments of the user
let userApartments = reactive<Apartment[]>([

])



function getApartments():void
{
  ApiInstance.get('/api/apartments')
    .then((response) => {
      const result = response.data;
      userApartments = result
      result.forEach((apart:any )=>{
        userBuildings.push(apart.building )
      })
      console.log(userBuildings,'before')
      console.log(result,'la');
    })
    .catch((error) => {
      console.log('error', error);
    })

}
</script>
<template>
  <q-page class="page_container row  justify-center">
    <div class="left ">
      <div class="left_header">
        <MyAvatar class="avatar"></MyAvatar>
      </div>
      <ToggleBtn one-txt="Imeubles" two-txt="Appartements" @current-choice="getCurrentChoice">

      </ToggleBtn>
      <div class="list-items">
        <ListItems :list-items="userBuildings">
          <template v-slot:item>
            <ListItem >
              <template v-slot:icons>
                <div class="icon row items-center justify-center">
                  <q-icon name="fa-solid fa-building"  round size="md" color="primary"/>
                </div>
              </template>
              <template v-slot:infos>
          <span
            style="font-size: 13px; font-weight: 600;"
            class="item-title"
          >
            7 Rue du Merignac
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
      </div>
    </div>
    <div class="right">
      <div class="floating-cloud">
        <div class="cloud-1">
          <img src="@pub/images/svg/cloud-1.svg" alt="">
        </div>
        <div class="cloud-2">
          <img src="@pub/images/svg/cloud-2.svg" alt="">
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
