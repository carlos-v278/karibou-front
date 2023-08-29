<script setup lang="ts">

import DefaultForm from 'src/features/_base-components/DefaultForm.vue';
import {onBeforeMount, reactive, ref} from 'vue';
import {
  Apartment,
  Building,
  BuildingsOptions,
  OwnerInfosInvit,
  OwnerInfosProperty,
  TenantInfosInvit,
  UserProfileEdit,
  PostAdvertisement
} from 'src/utils/interfaces';
import {storeToRefs} from 'pinia';
import {useUserStore} from 'src/features/_utils/user.store';
import AddAdvertisement from "src/features/advertisements/components/AddAdvertisement.vue";
import {useRoute} from "vue-router";

const route = useRoute()

//import stores
const userData = useUserStore();

onBeforeMount(()=>{
  let tempOptionBuil: BuildingsOptions = {
  }
  let tempOptionApart: BuildingsOptions = {
  }
  getBuildings.value?.forEach((building : Building)=>{
    tempOptionBuil.uriId = '/api/buildings/' + building.id
    tempOptionBuil.label = `${building.number} ${building.street}, ${building.city} ${building.zipcode}`
    buildingOptions = [...buildingOptions, tempOptionBuil];
  })

  getApartments.value?.forEach((apartment : Apartment)=>{
    tempOptionApart.uriId = '/api/apartments/' + apartment.id
    tempOptionApart.label = `Appartement  N°${apartment.number}, étage N°${apartment.floor} `
    apartmentsOptions = [...apartmentsOptions, tempOptionApart];
  })

  advertisementForm.value.owner= '/api/users/' + getUserProfile.value?.id
  advertisementForm.value.building= '/api/buildings/' + route.params.id
  console.log(advertisementForm.value,'fezfz')
})

//all user data ex: profile and current role
const {getUserProfile, getBuildings,getApartments} = storeToRefs(userData)

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
let formPicture = ref<Blob | MediaSource | object>({})

// owner informations to invite
let ownerInfosInvit = reactive<OwnerInfosInvit>({
  email : undefined,
  username :undefined,
  firstname : undefined,
  lastname : undefined,
  properties : [],
})

//tenant informations to invite
let tenantInfosInvit = reactive<TenantInfosInvit>({
  email : undefined,
  username :undefined,
  firstname : undefined,
  lastname : undefined,
  location : undefined,
})


function addProperties():void{
  let property:OwnerInfosProperty =   {
    number: 0,
    floor: 0,
    rent: 0,
    building: ''
  }
  ownerInfosInvit.properties =[...ownerInfosInvit.properties, property]

}

let buildingOptions = reactive<BuildingsOptions[]>([
])
let apartmentsOptions = reactive<BuildingsOptions[]>([
])
let currBuildChoice = ref({
  uriId:'',
  label:''
})

let currApartChoice = ref({
  uriId:'',
  label:''
})

function upCurrBuilChoice(apartmentIndex :number):void{
  ownerInfosInvit.properties[apartmentIndex].building = currBuildChoice.value.uriId

}
function upCurrApartChoice():void{
  tenantInfosInvit.location = currApartChoice.value.uriId
}

// advertisement form
let advertisementForm = ref<PostAdvertisement>({
  title : undefined,
  description :'',
  price : undefined,
  type : undefined,
  building : undefined,
  owner: undefined,
})
let advertisementTypeOptions =ref([
  'vente',
  'job',
  'information'
])
let formPictures = ref<File[] >([

])
function addAdvertisementPicture():void{
  let newfile = {
    lastModified: 0,
    name: '',
    webkitRelativePath: '',

  }

 formPictures.value.push(newfile as File)
}

let newRentReceipt =ref({
  apartment:0
})
function apartmentRentReceipt(){
  let lenght= newRentReceipt.value.apartment.uriId.length
  newRentReceipt.value.apartment = Number(newRentReceipt.value.apartment?.uriId.charAt(lenght -1))
  console.log(newRentReceipt.value)
}
</script>
<template>
  <div
    class="components_container"
  >
    <DefaultForm
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
            label="Photo de profile"
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
    </DefaultForm>
    <DefaultForm
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
          label="Prenom"

        />
        <q-input
          class="row-input"
          filled
          type="text"
          v-model="ownerInfosInvit.lastname"
          label="Nom"

        />
        <q-input
          class="row-input"
          filled
          type="email"
          v-model="ownerInfosInvit.email"
          label="Email"

        />
        <q-input
          class="row-input"
          filled
          type="text"
          v-model="ownerInfosInvit.username"
          label="Username"

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
                  :model-value="Number(propertie.number)"
                  v-model.number="propertie.number"
                  label="N°"

                />
                <q-input
                  class="row-input q-mb-sm"
                  filled
                  dense
                  type="number"
                  :model-value="Number(propertie.floor)"
                  v-model.number="propertie.floor"
                  label="Etage°"

                />
                <q-input
                  class="row-input q-mb-sm"
                  filled
                  dense
                  :model-value="Number(propertie.rent)"
                  type="number"
                  v-model.number="propertie.rent"
                  label="Loyer°"

                />
                <q-select
                  filled
                  dense
                  v-model="currBuildChoice"
                  :options="buildingOptions"
                  @update:modelValue="upCurrBuilChoice(index)"
                  label="Batiment" />
              </li>
            </ul>
          </div>

        </div>


      </template>
      <template #footer>
        <q-btn
          class="row-input btn-cta"
          label="Inviter"
          type="submit"
          color="primary"/>
      </template>
    </DefaultForm>
    <DefaultForm
      v-if="props.component === 'tenant-inv'"
      title="Inviter un locataire"
      @go-back="emits('closeForm')"
      :request="{method:'post',url:'api/users/tenant'}"
      :form-data="tenantInfosInvit"
    >

      <template #main>
        <q-input
          class="row-input"
          filled
          type="text"
          v-model="tenantInfosInvit.firstname"
          label="Prenom"

        />
        <q-input
          class="row-input"
          filled
          type="text"
          v-model="tenantInfosInvit.lastname"
          label="Nom"

        />
        <q-input
          class="row-input"
          filled
          type="email"
          v-model="tenantInfosInvit.email"
          label="Email"

        />
        <q-input
          class="row-input"
          filled
          type="text"
          v-model="tenantInfosInvit.username"
          label="Username"

        />
        <q-select
          filled
          dense
          v-model="currApartChoice"
          :options="apartmentsOptions"
          @update:modelValue="upCurrApartChoice()"
          label="Appartement"
        />


      </template>
      <template #footer>
        <q-btn
          class="row-input btn-cta"
          label="Inviter"
          type="submit"
          color="primary"/>
      </template>
    </DefaultForm>
    <AddAdvertisement
      v-if="props.component === 'add-advertisement'"
      title="Ajouter une annonce"
      @go-back="emits('closeForm')"
      :request="{method:'post',url:`api/advertisements` }"
      :form-data="advertisementForm"
      :form-images="formPictures"
    >
      <template #main>
        <q-input
          class="row-input"
          filled
          type="text"
          v-model="advertisementForm.title"
          label="Titre"

        />

        <q-editor
          v-model="advertisementForm.description"

        ></q-editor>
        <q-input
          class="row-input"
          filled
          type="number"
          :model-value="Number(advertisementForm.price)"
          v-model.number="advertisementForm.price"
          label="Prix"

        />
        <q-select
          filled
          dense
          v-model="advertisementForm.type"
          :options="advertisementTypeOptions"
          label="Type"
        />
        <div class="form-drop_down">
          <div class="form-drop_down-header">
            <span class="drop_down_title">Images(s)</span>
            <div class="actions">
              <q-icon
                @click="addAdvertisementPicture()"
                class="btn-add-apartment cursor-pointer"
                name="fa-solid fa-plus"
                round size="xs"
                color="primary"/>

              <q-icon
                class="btn-add-apartment cursor-pointer q-ml-md"
                name="fa-solid fa-minus"
                round size="xs"
                @click="formPictures.pop()"
                v-if="formPictures.length >0"
                color="primary"/>

            </div>
          </div>
          <q-separator />
          <div class="form-drop_down-main q-pt-xs">
            <ul
              class="drop_down-row-container"
            >
              <li
                v-for="(picture, index) in formPictures"
                :key="index"
                class="drop_down-row q-mb-md"
              >
                <q-file
                  color="lime-11"
                  bg-color="grey-light"
                  filled
                  label="Image"
                  style="width: 100%"
                  v-model="formPictures[index]"
                >
                  <template v-slot:prepend>
                    <q-icon name="attachment" />
                  </template>
                </q-file>



              </li>
            </ul>
          </div>

        </div>



      </template>
      <template #footer>
        <q-btn
          class="row-input btn-cta"
          label="Poster"
          type="submit"
          color="primary"/>
      </template>
    </AddAdvertisement>
    <DefaultForm
      v-if="props.component === 'add-conversation'"
      title="Commencer une conversation avec "
      @go-back="emits('closeForm')"
      :request="{method:'post',url:'api/users/conversations'}"
      :form-data="tenantInfosInvit"
    >

      <template #main>




        <q-select
          filled
          dense
          v-model="currApartChoice"
          :options="apartmentsOptions"
          @update:modelValue="upCurrApartChoice()"
          label="Batiment"
        />


      </template>
      <template #footer>
        <q-btn
          class="row-input btn-cta"
          label="Inviter"
          type="submit"
          color="primary"/>
      </template>
    </DefaultForm>
    <DefaultForm
      v-if="props.component === 'new-receipt'"
      title="Nouvelle quittance de loyer "
      @go-back="emits('closeForm')"
      :request="{method:'post',url:'api/rent_receipts'}"
      :form-data="newRentReceipt"
    >

      <template #main>


        <q-select
          filled
          dense
          v-model="newRentReceipt.apartment"
          :options="apartmentsOptions"
          @update:modelValue="apartmentRentReceipt()"
          label="Appartement"
        />


      </template>
      <template #footer>
        <q-btn
          class="row-input btn-cta"
          label="Creer"
          type="submit"
          color="primary"/>
      </template>
    </DefaultForm>
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
@media screen and (min-width: 977px) {
  .components_container{
    width: 100%;

  }
}
</style>
