

<script setup lang="ts">
import {onMounted, ref,watch} from 'vue';
import { useStoreAuth } from 'src/features/authentication/utils/user';
import { useRouter, useRoute } from 'vue-router'
import {getLocalToken} from 'src/features/authentication/utils/connect';

const router = useRouter();
const route = useRoute()

const storeAuth = useStoreAuth();


// check if connected when layout is mounted
onMounted(() => {
  checkConnected();
});

//check if connected when path change
watch(route, (to):void => {
  checkConnected()
})

const userToken = ref<string | null>()
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


</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>

      <router-view />
    </q-page-container>
  </q-layout>
</template>
