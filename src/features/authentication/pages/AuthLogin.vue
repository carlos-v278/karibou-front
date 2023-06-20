<script setup lang="ts" >

import MyLogin from 'src/features/authentication/components/MyLogin.vue';
</script>

<template>
  <div class="login-page">
    <div class="left">
      <h1 class="login-baseline">
        Bienvenue sur Karibou, le meilleur outil de
        communication Et de Gestion locatif
      </h1>
      <MyLogin></MyLogin>
    </div>
    <div class="right">
      <div class="illustration">
        <img class="img" src="/images/login-illustration.png" alt="auth-illustration">
      </div>
    </div>
  </div>
</template>

<style class="scss" scoped>
.login-page{
  display: flex;
  .left{
    flex: 1;
    .login-baseline{
      font-size: 2rem;
    }
  }
  .right{
    flex: 1;
    height: 100vh;
    .illustration{
      width: 100%;
      height: 100%;
      .img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
