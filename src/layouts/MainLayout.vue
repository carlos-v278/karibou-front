

<script setup lang="ts">
import {onMounted, reactive, watch,ref} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import {getLocalToken} from 'src/features/authentication/utils/connect';
import {NavLinks} from 'src/utils/interfaces'
import { RouteRecordName } from 'vue-router';

const router = useRouter();
const route = useRoute()

const navLinks = reactive<NavLinks[]>([
  {
    to:'/',
    name:'home',
    size:'sm',
    icon:'fa-solid fa-house'
  },
  {
    to:'/login',
    name:'messages',
    size:'sm',
    icon:'fa-solid fa-comments'
  },
  {
    to:'#',
    name:'new',
    size:'md',
    icon:'fa-solid fa-plus'
  },
  {
    to:'',
    name:'apartment',
    size:'sm',
    icon:'fa-solid fa-building-user'
  },
  {
    to:'/login',
    name:'apartment',
    size:'sm',
    icon:'widgets'
  },
])

// check if connected when layout is mounted
onMounted(() => {
  checkConnected();
  checkPathHeader()
});

//check if connected when path change
watch(route, ():void => {
  checkPathHeader()
  checkConnected()
})

//check if the token exist in local storage and redirect
function checkConnected():void{
  const isConnected:boolean = getLocalToken();
  console.log(isConnected , 'ici')
  if(!isConnected){
    router.push({
      name: 'login',
    })
  }
}

//check the current path to hide the header if need to
const currentPathName = ref<RouteRecordName | undefined | null>()
const hideHeader = ref(false)
function checkPathHeader():void{
  //path to display none the header
  const pathsHideHeader:string[]=[
    'login'
  ];
  currentPathName.value = route.name
  hideHeader.value = pathsHideHeader.includes(currentPathName.value as string);
}


</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q‑px‑md">
      <header class="header" v-if="!hideHeader">
        <div class="logo">
          <img src="@pub/images/logo.svg" alt="logo-karibou">
        </div>
        <ul class="nav-links">
          <li v-for="(link,index) in navLinks" :key="index">
            <q-btn  :size="link.size"  :to="link.to" color="white" text-color="primary" class="nav-link" round  :icon="link.icon" />
          </li>
        </ul>
      </header>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.header{
  z-index: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  border-radius: 18px;
  width: 90%;
  background: $grey-light;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 62px;
  .logo{
    display: none;

  }
  .nav-links{
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    li{
      list-style: none;
      .nav-link{
        padding: 10px;
      }
    }
  }
}
@media screen and (min-width: 881px) {
  .header{
    width: 81px;
    height: 94vh;
    left: 15px;
    transform: translate(0);
    flex-direction: column;
    .logo{
      display: block;
      position: absolute;
      top: 20px;
      max-width: 40px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

    }
    .nav-links{
      flex-direction: column;
      gap: 40px;
      .nav-link{
        scale: 1.1;
      }
    }
  }

}

</style>
