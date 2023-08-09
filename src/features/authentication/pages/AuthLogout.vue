<script setup lang="ts">
import {onBeforeMount} from 'vue';
import {accountService, userService} from 'src/_services';
import {useRouter} from 'vue-router';
import {notify} from 'src/utils/utils';

//lifes cycles hook
onBeforeMount(() => {
  logoutUser()
});

const router = useRouter();

//function logout the user from the Api and remove Token
function logoutUser():void
{
  userService.removeProfile();
   accountService.logout()
     .then(res =>{
       console.log(res)
       router.push({name: 'login'})
       notify('Déconnexion réussie','positive')
     })
     .catch(err => {
       console.log(err)
       notify('Déconnexion impossible.','negative')
     })

}


</script>

<template>
<div class="logout">
</div>
</template>

<style scoped lang="scss">

</style>
