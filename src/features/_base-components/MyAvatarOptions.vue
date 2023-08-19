<script setup lang="ts">
import { ref} from 'vue'

import {storeToRefs} from 'pinia';
import {useUserStore} from 'src/features/_utils/user.store';
import MyAvatar from 'src/features/_base-components/MyAvatar.vue';
//import stores


const userInfosStore = useUserStore();
const {getUserProfile} = storeToRefs(userInfosStore)


//boolean to activate the floating avatar options
const  userOptions = ref(false)

//emits
const emits = defineEmits(['displayForm'])

//function wich emits and disable the floating user options
function emitsFormToDisplay(choice:string):void
{
  emits('displayForm', choice)
  userOptions.value =false
}

</script>
<template>
<div class="my-avatar" >
    <my-avatar
      :picture="getUserProfile?.picture"
    >

    </my-avatar>
  <div class="floating-info">
    <q-icon @click="userOptions = !userOptions" :class="{arrow: userOptions}" name="fa-solid fa-angle-down"  round size="xs" color="primary"/>
    <div class="my-avatar-options" v-if="userOptions">
      <ul class="options">
        <li class="option user-name">
          {{getUserProfile?.firstname}} {{getUserProfile?.lastname}}
        </li>
        <li class="option" >
          {{getUserProfile?.email}}
        </li>
        <li
          class="option option-action"
          @click="emitsFormToDisplay('informations')"
        >
          Modifier mes informations
        </li>
        <li
            v-if="getUserProfile?.roles.includes('ROLE_OWNER_CREATE')"
            class="option option-action"
            @click="emitsFormToDisplay('owner-inv')"
        >
          Inviter un Propriètaire
        </li>
        <li
          v-if="getUserProfile?.roles.includes('ROLE_TENANT_CREATE')"
          class="option option-action"
          @click="emitsFormToDisplay('tenant-inv')"
        >
          Inviter un Locataire
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
      right: 0;
      max-width: 520px;
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
.user-name{
  font-weight: 700 !important;
}
.option-action{
  cursor: pointer;
}
@media screen and (min-width: 981px) {}

</style>
