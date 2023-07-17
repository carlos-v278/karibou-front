<script setup lang="ts">
import {onBeforeMount, ref,reactive} from 'vue'
import {userService} from 'src/_services';
import {UserProfile} from 'src/utils/interfaces';
import {useUserStore} from 'src/features/_utils/user.store';

//pinia store userInfos

const userInfosStore = useUserStore();

//boolean to activate the floating avatar options
const  userOptions = ref(false)

onBeforeMount(()=>{
  getProfileInfos();
})

//emits
const emits = defineEmits(['displayForm'])

let userInfo = reactive<UserProfile>({
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  picture: '',
  roles: [],
});
let roles= reactive([
  'syndicate',
  'owner',
  'tenant'

])

//current user role
let userRole= ref('')
//function to get currentUserInfos
function getProfileInfos():void{
  userService.getUserProfile()
    .then((res :unknown) =>{
      userInfo = res.data;
      userInfosStore.updateUserProfile(userInfo)
      switch (true) {
        case userInfo.roles.includes('ROLE_OWNER_CREATE'):
          userRole.value = roles[0];
          break;
        case userInfo.roles.includes('ROLE_TENANT_CREATE'):
          userRole.value = roles[1];
          break;
        default:
          userRole.value = roles[2];
      }
      userInfosStore.updateUserRole(userRole.value)
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
        <li class="option user-name">
          {{userInfo.firstName}} {{userInfo.lastName}}
        </li>
        <li class="option" >
          {{userInfo.email}}
        </li>
        <li
          class="option option-action"
          @click=" emits('displayForm', 'informations')"
        >
          Modifier mes informations
        </li>
        <li
            v-if="userRole === roles[0]"
            class="option option-action"
            @click="emits('displayForm', 'invitation')"
        >
          Inviter un Propriètaire
        </li>
        <li
          v-if="userRole === roles[1]"
          class="option option-action"
          @click="emits('displayForm', 'invitation')"
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
      width: 220px;
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
