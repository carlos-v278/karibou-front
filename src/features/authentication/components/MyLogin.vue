<script setup lang="ts">
import {onBeforeMount, reactive} from 'vue'
import {UserAuth, UserProfile} from 'src/utils/interfaces'
import { useRouter } from 'vue-router'
import {notify} from 'src/utils/utils';
import {accountService, userService} from 'src/_services';
import {useUserStore} from 'src/features/_utils/user.store';

//vue router actions
const router = useRouter();

const userInfosStore = useUserStore();

onBeforeMount(()=>{
  if(accountService.isLogged())
  {
    notify('Vous êtes déjà connecté.','warning')
    router.push({name: 'dwelling'})
  }
})

// login form data
const user = reactive<UserAuth>({
  email:'dorian.montalbetti@gmail.com',
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
        getProfileInfos()
      })
      .catch(err => {
        console.log(err)
        notify('Email ou Mot de passe incorrect.','negative')
      })


}



//function to get currentUserInfos
function getProfileInfos(){
  userService.getUserProfile()
    .then( (res: unknown) => {
      console.log(res.data)
      userService.saveUserProfile(res.data)
      userInfosStore.updateUserProfile(res.data)
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
      />

      <q-input
        class="row-input"
        filled
        type="password"
        v-model="user.password"
        label="Password"
      />
      <q-btn
        class="row-input btn-cta"
        label="connexion"
        type="submit"
        color="primary"
      />
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
