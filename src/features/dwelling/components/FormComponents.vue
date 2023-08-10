<script setup lang="ts">

import EditProfileInfos from 'src/features/dwelling/components/EditProfileInfos.vue';
import { reactive} from 'vue';
import {OwnerInfosInvit, OwnerInfosProperty, UserProfileEdit} from 'src/utils/interfaces';
import {storeToRefs} from 'pinia';
import {useUserStore} from 'src/features/_utils/user.store';

//import stores
const userData = useUserStore();

//all user data ex: profile and current role
const {getUserProfile} = storeToRefs(userData)

let props = defineProps({
  component:{
    type:String
  },

})

let emits = defineEmits(['closeform'])


// personal profile informations to edit
let profileInfosEdit = reactive<UserProfileEdit>({
  firstname : undefined,
  lastname : undefined,
  username :undefined,
  password:undefined
})

//update user profile picture
let formPicture = reactive<Blob | MediaSource | object>({})

// owner informations to invite
let ownerInfosInvit = reactive<OwnerInfosInvit>({
  email : undefined,
  username :undefined,
  firstname : undefined,
  lastname : undefined,
  properties : [],
})


function addProperties():void{
  let property:OwnerInfosProperty =   {
    number: undefined,
    floor: undefined,
    rent: undefined,
    building: undefined
  }
  ownerInfosInvit.properties.push(
    property
  )
}
</script>
<template>
  <div
    class="components_container"
  >
    <EditProfileInfos
      v-if="props.component === 'informations'"
      title="Modifier vos informations personnels"
      @go-back="emits('closeForm')"
      :request="{method:'patch',url:`api/users/${getUserProfile?.id}` }"
      :form-data="profileInfosEdit"
      :form-image="formPicture"
    >
      <template #header>
        <div
          class="row avatar-edit no-wrap items-center"
        >
          <q-file
            color="lime-11"
            bg-color="grey-light"
            filled
            label="Photo de profil"
            style="width: 100%"
            v-model="formPicture"
          >
            <template v-slot:prepend>
              <q-icon name="attachment" />
            </template>
          </q-file>
        </div>
      </template>
      <template #main>
        <q-input
          class="row-input"
          filled
          type="text"
          v-model="profileInfosEdit.firstname"
          :model-value="profileInfosEdit.firstname ===''? profileInfosEdit.firstname = undefined : profileInfosEdit.firstname"
          label="Prenom"

        />

        <q-input
          class="row-input"
          filled
          v-model="profileInfosEdit.lastname"
          type="text"
          label="Nom"
          lazy-rules

        />
        <q-input
          class="row-input"
          filled
          v-model="profileInfosEdit.username"
          type="text"
          label="Username"
          lazy-rules

        />
        <q-input
          class="row-input"
          filled
          v-model="profileInfosEdit.password"
          type="password"
          label="Mot de passe"
          lazy-rules

        />
      </template>
      <template #footer>
        <q-btn
          class="row-input btn-cta"
          label="Modifier"
          type="submit"
          color="primary"/>
      </template>
    </EditProfileInfos>
    <EditProfileInfos
      v-if="props.component === 'owner-inv'"
      title="Inviter un propriétaire"
      @go-back="emits('closeForm')"
      :request="{method:'post',url:'api/users/owner'}"
      :form-data="ownerInfosInvit"
    >

      <template #main>
        <q-input
          class="row-input"
          filled
          type="text"
          v-model="ownerInfosInvit.firstname"
          :model-value="ownerInfosInvit.firstname ===''? ownerInfosInvit.firstname = undefined : ownerInfosInvit.firstname"
          label="Prenom"

        />
        <q-input
          class="row-input"
          filled
          type="text"
          v-model="ownerInfosInvit.lastname"
          :model-value="ownerInfosInvit.lastname ===''? ownerInfosInvit.lastname = undefined : ownerInfosInvit.lastname"
          label="Nom"

        />
        <q-input
          class="row-input"
          filled
          type="email"
          v-model="ownerInfosInvit.email"
          :model-value="ownerInfosInvit.email ===''? ownerInfosInvit.firstname = undefined : ownerInfosInvit.firstname"
          label="Email"

        />
        <q-input
          class="row-input"
          filled
          type="text"
          v-model="ownerInfosInvit.username"
          :model-value="ownerInfosInvit.username ===''? ownerInfosInvit.username = undefined : ownerInfosInvit.username"
          label="Nom"

        />
        <div class="form-drop_down">
          <div class="form-drop_down-header">
            <span class="drop_down_title">Appartement(s)</span>
            <div class="actions">
              <q-icon
                @click="addProperties()"
                class="btn-add-apartment cursor-pointer"
                name="fa-solid fa-plus"
                round size="xs"
                color="primary"/>
              <q-icon
                class="btn-add-apartment cursor-pointer q-ml-md"
                name="fa-solid fa-minus"
                round size="xs"
                @click="ownerInfosInvit.properties.pop()"
                v-if="ownerInfosInvit.properties.length >0"
                color="primary"/>

            </div>
          </div>
          <q-separator />
          <div class="form-drop_down-main q-pt-xs">
            <ul
              class="drop_down-row-container"
            >
              <li
                v-for="(propertie, index) in ownerInfosInvit.properties"
                :key="index"
                class="drop_down-row q-mb-md"
              >
                <q-input
                  class="row-input q-mb-sm"
                  filled
                  dense
                  type="number"
                  v-model="propertie.number"
                  label="N°"

                />
                <q-input
                  class="row-input q-mb-sm"
                  filled
                  dense
                  type="number"
                  v-model="propertie.floor"
                  label="Etage°"

                />
                <q-input
                  class="row-input q-mb-sm"
                  filled
                  dense
                  type="number"
                  v-model="propertie.rent"
                  label="Loyer°"

                />
                <q-select filled dense v-model="model" :options="options" label="Filled" />
              </li>
            </ul>
          </div>

        </div>


      </template>
      <template #footer>
        <q-btn
          class="row-input btn-cta"
          label="Modifier"
          type="submit"
          color="primary"/>
      </template>
    </EditProfileInfos>
  </div>
</template>

<style lang="scss" scoped>
.components_container{
  width: 100%;
  .form-drop_down{
    .form-drop_down-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .drop_down_title {
        font-size: 1.1rem;
        font-weight: 500;
      }
    }
    .form-drop_down-main {
      .drop_down-row-container {
        list-style: none;
        padding: 0 0 0 15px;
      }
    }

  }
}
@media screen and (min-width: 1081px) {
  .components_container{
    width: 50%;

  }
}
</style>
