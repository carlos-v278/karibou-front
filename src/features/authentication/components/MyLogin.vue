<script setup lang="ts">
import {ref} from 'vue'
import { ApiInstance } from 'src/utils/api'
import { useStoreAuth } from '../utils/user';
import { UserAuth } from 'src/utils/interfaces'
import { useRouter } from 'vue-router'
import {userConnect} from 'src/features/authentication/utils/connect';

const storeAuth = useStoreAuth();
const router = useRouter();

// login form data
const user = ref<UserAuth>({
  email:'felix@gmail.com',
  password:'3debd266',
})

//submit the login form
function onSubmit():void
{
  userConnect(user.value);
}


</script>

<template>
  <div class="login-component">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        type="email"
        v-model="user.email"
        label="Email"
        hint="Your email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="user.password"
        label="Password"
      />

      <div>
        <q-btn label="connexion" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<style class="scss" scoped>


</style>
