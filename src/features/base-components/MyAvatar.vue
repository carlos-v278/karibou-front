<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'
import {userService} from 'src/_services';
//boolean to activate the floating avatar options
const  userOptions = ref(false)
//function wich help to activate the floating avatar options

onBeforeMount(()=>{
  getProfileInfos();
})

function getProfileInfos():void{
  userService.getUserProfile()
    .then(res =>{
      console.log(res);
    })
}

</script>
<template>
<div class="my-avatar">
  <div class="my-avatar-img">
    <img src="https://cdn.quasar.dev/img/avatar.png" alt="personal-avatar-image">
  </div>
  <div class="floating-info">
    <q-icon @click="userOptions = !userOptions" :class="{arrow: userOptions}" name="fa-solid fa-angle-down"  round size="xs" color="primary"/>
    <div class="my-avatar-options" v-if="userOptions">
      <ul class="options">
        <li class="option">
          Informations personelles
        </li>
        <li class="option">
          Inviter un locataire
        </li>
        <li class="option">
          Inviter un propriètaire
        </li>
        <li class="option">
          <q-btn
            class="btn"
            flat
            color="white"
            to="deconnexion"
            text-color="secondary"
            icon="fa-solid fa-right-from-bracket"
            label="Déconnexion"
            padding="0"
          />
        </li>
      </ul>
    </div>
  </div>

</div>
</template>

<style lang="scss" scoped>
.my-avatar{
  z-index: 1;
  position: relative;
  display: flex;
  gap: 3px;
  align-items: center;
  .my-avatar-img{
    border: 1px solid $primary;
    padding: 3px;
    width: 53px;
    height: 53px;
    border-radius: 50%;
    img{
      object-fit: cover;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .floating-info{
    .my-avatar-options{
      display: block !important;
    }
    .arrow{
      transform: rotate(180deg);
    }
    .arrow{
      cursor: pointer;
      transition: transform .1s ease-out;
    }
    .my-avatar-options{
      position: absolute;
      display: none;
      top: 130%;
      z-index: 1;
      right: 0%;
      width: 200px;
      border:1px solid $primary ;
      background: white;
      padding: 10px 10px;
      border-radius: 5px;
      .options{
        padding: 0;
        .option{
          list-style: none;
          margin: 5px 0;
          color: $secondary;
          font-weight: 400;
          font-size: 14px ;
          font-family: $primary-font;
          .btn{
            font-size: inherit;
            font-weight: inherit;
            font-family: inherit;
          }
        }
      }

    }
  }

}

@media screen and (min-width: 981px) {}

</style>
