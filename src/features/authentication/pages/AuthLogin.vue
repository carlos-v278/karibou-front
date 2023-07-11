<script setup lang="ts" >
import MyLogin from 'src/features/authentication/components/MyLogin.vue';
</script>

<template>
  <div class="login-page">
    <div class="left">
      <div class="logo">
        <img src="@pub/images/logo.svg" alt="logo-karibou">
      </div>
      <h1 class="login-baseline">
        <span>Bienvenue</span> sur Karibou, le meilleur outil de
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

<style lang="scss" scoped>
.login-page{
  display: flex;
  .left{
    flex: 1;
    padding:0 15px;
    .logo{
      max-width: 51px;
      width: 100%;
      margin: 50px auto 0;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .login-baseline{
      max-width: 368px;
      margin: 40px auto 48px;
      line-height: 2rem;
      font-family: $primary-font;
      font-size: var(--fs-500);
      span{
        font-family: $secondary-font;
        font-size: var(--fs-800);
        color:$primary ;
      }
    }
  }
  .right{
    display: none;
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

@media screen and (min-width: 781px) {
  .login-page{
    .right{
      display: block;
    }
    .left{
      .logo{
        margin: 36px auto 50px 46px;
      }
    }
  }

}

</style>
