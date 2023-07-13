<script setup lang="ts">
import {ref} from 'vue'
import { UserAuth } from 'src/utils/interfaces'
import { useRouter } from 'vue-router'
import {userConnect} from 'src/features/authentication/utils/connect';
import {notify} from 'src/utils/utils';
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter();


// login form data
const user = ref<UserAuth>({
  email:'felix@gmail.com',
  password:'3debd266',
})

//submit the login form
async function onSubmit():Promise<void>
{
  $q.loading.show()
  const isUserConnect = await userConnect(user.value);
  $q.loading.hide()
  if(isUserConnect){

    router.push({
      name: 'dwelling',
    })
    notify(`Bienvenue ${user.value.email}`,'positive')
  } else{
    notify('Email ou Mot de passe incorrect','negative')
  }
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
