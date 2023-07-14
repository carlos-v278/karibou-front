<script setup lang="ts">
import {onBeforeMount, reactive} from 'vue'
import { UserAuth } from 'src/utils/interfaces'
import { useRouter } from 'vue-router'
import {notify} from 'src/utils/utils';
import {accountService} from 'src/_services';

//vue router actions
const router = useRouter();


onBeforeMount(()=>{
  if(accountService.isLogged())
  {
    notify('Vous êtes déjà connecté.','warning')
    router.push({name: 'dwelling'})
  }
})

// login form data
const user = reactive<UserAuth>({
  email:'carlosvieir333@gmail.com',
  password:'carlos17',
})

//submit the login form
async function onSubmit():Promise<void>
{
  login();
}


function login ():void {

    accountService.login(user)
      .then(res =>{
        accountService.saveToken(res.data?.token)
        notify(`Bienvenue ${user.email}.`,'positive')
        router.push({name: 'dwelling'})
      })
      .catch(err => {
        console.log(err)
        notify('Email ou Mot de passe incorrect.','negative')
      })


}


</script>

<template>
  <div class="login-component">
    <h2 class="form-title">Identifiants de connexion</h2>
    <q-form
      @submit="onSubmit"
    >
      <q-input
        class="row-input"
        filled
        type="email"
        v-model="user.email"
        label="Email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        class="row-input"
        filled
        type="password"
        v-model="user.password"
        label="Password"
      />
      <q-btn  class="row-input btn-cta" label="connexion" type="submit" color="primary"/>
    </q-form>
  </div>
</template>

<style lang="scss" scoped>
.login-component{
  max-width: 351px;
  margin: 0 auto;
  .form-title{
    text-align: center;
    font-size: var(--fs-500);
    font-weight: 400;
    color: $secondary;
  }
  .row-input{
    width: 100%;

  }

}


</style>
