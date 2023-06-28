<script setup lang="ts">
import {ref} from 'vue'
import { ApiInstance } from 'src/utils/api'
import { useStoreAuth } from '../utils/user';
import {UserAuth} from 'src/utils/interfaces'
import { useRouter } from 'vue-router'
import {onBeforeMount} from 'vue';

const storeAuth = useStoreAuth();
const router = useRouter();

onBeforeMount(() => {
  request();
});





function request():void {

  ApiInstance.get('/api/users')
    .then((response) => {
     console.log(response)
    })
    .catch((error) => {
      console.log('error', error);
    })


}

</script>

<template>
  <div class="login-component">
    <h1> page test request</h1>
  </div>
</template>

<style class="scss" scoped>


</style>
