<script lang="ts" setup>
import {
  BuildingDetails
} from 'src/utils/interfaces';

import {buildingService,messagingService} from 'src/_services';
import {onBeforeMount, ref} from 'vue';
import PropertyDetails from 'src/features/_base-components/PropertyDetails.vue';
import BuildingApartIllustration from 'src/features/_base-components/BuildingApartIllustration.vue';
import PublicApartmentDetails from 'src/features/dwelling/components/PublicApartmentDetails.vue';
import ListItem from 'src/features/_base-components/ListItem.vue';
import MyAvatar from 'src/features/_base-components/MyAvatar.vue';
import ListItems from 'src/features/_base-components/listItems.vue';
import {useStoreBaseFeatures} from 'stores/base-features';
import { useRouter } from 'vue-router'
import {notify} from "src/utils/utils";

const router = useRouter()
const props = defineProps({
  buildingId: {
    type: Number
  },
  buildingLabel: String,
})
const emits = defineEmits(['goBack'])

onBeforeMount(async ()=>{
  await loadBuildingDetails()
})

// all the details data about the selected building
let buildingDetailsData = ref<BuildingDetails>({
  id:undefined,
  city:undefined,
  country:undefined,
  number:undefined,
  street:undefined,
  zipcode:undefined,
  advertisements: undefined,
  apartments: undefined,
  syndicate: undefined,
  allMembers:undefined
})
async function loadBuildingDetails()
{
  useStoreBaseFeatures().enableLoading()
 await buildingService.getBuildingDetails(props.buildingId)
    .then(<Response>(response:Response) => {
      buildingDetailsData.value = response.data
      useStoreBaseFeatures().disableLoading()
    })
    .catch((error)=>{
      console.log('error', error)
      useStoreBaseFeatures().disableLoading()
    })
}

let currentFlatSelected = ref<number | undefined>(undefined)
let componentToDisplay = ref('Détails de l\'immeuble')
function getSelectedFlatEmit(currentFlat:number):void
{
  currentFlatSelected.value = currentFlat;
  componentToDisplay.value = 'Membres de l\'appartement'
}

function showComponent(component:string):void
{
  componentToDisplay.value = component
}

// function which help to open a conversation with the user selected
function sendMessage(userId:number):void{
  let bodyRequest={
    participants: [userId]
  }
  useStoreBaseFeatures().enableLoading()
  messagingService.newConversation(bodyRequest)
    .then((res)=>{
      console.log(res.data)
      notify('Une conversation vient d\'être créée.','positive')
      useStoreBaseFeatures().disableLoading()
      router.push({name:'all_conversations'})
    }).catch((res)=>{
    useStoreBaseFeatures().disableLoading()
      console.log(res)
    })

}
</script>


<template>
  <div class="building-details">
    <div class="details-header">
      <q-btn
        size="md"
        color="grey-light"
        text-color="primary"
        class="btn-back"
        round
        icon="fa-solid fa-arrow-left"
        @click="emits('closeForm')"
      />
    </div>
    <div class="details-main">
    <PropertyDetails
      icon='fa-building'
      :title="componentToDisplay"
      type="Résidence collective"
      :component-title="props.buildingLabel"

    >

    </PropertyDetails>
      <q-icon
        v-if="componentToDisplay === 'Membres de l\'imeuble'"
        size="md"
        color="primary"
        class="btn-back"
        label="back"
        name="fa-solid fa-arrow-left cursor-pointer"
        @click="showComponent('Détails de l\'immeuble')"
      />
      <div
        v-if="componentToDisplay === 'Détails de l\'immeuble'"
        class="building_actions" >
        <ListItem
        >
          <template #icons>
            <div class="icon row items-center justify-center">
              <q-icon
                name="fa-solid fa-users"
                round size="sm"
                color="primary"
              />
            </div>
          </template>
          <template #infos>
                <span
                  style="font-size: 13px; font-weight: 600;"
                  class="item-title"
                >
                    Découvrir le voisinage
                </span>

          </template>
          <template v-slot:actions>
            <q-btn
              round
              unelevated
              color="white"
              size="md"
              text-color="primary"
              icon="fa-solid fa-angle-right"
              @click="showComponent('Membres de l\'immeuble')"
            />
          </template>
        </ListItem>
        <ListItem
        >
          <template #icons>
            <div class="icon row items-center justify-center">
              <q-icon
                name="fa-solid fa-bullhorn"
                round size="sm"
                color="primary"
              />
            </div>
          </template>
          <template #infos>
                <span
                  style="font-size: 13px; font-weight: 600;"
                  class="item-title"
                >
                    Découvrir les annonces
                </span>

          </template>
          <template v-slot:actions>
            <q-btn
              round
              unelevated
              color="white"
              size="md"
              text-color="primary"
              icon="fa-solid fa-angle-right"
              :to="`/buildings/${props.buildingId}/annonces`"

            />
          </template>
        </ListItem>
      </div>
      <div
        v-if="componentToDisplay === 'Détails de l\'immeuble'"
        class="apartements_separation"
      >
        Les appartements de l'immeuble
      </div>
      <building-apart-illustration
        v-if="componentToDisplay === 'Détails de l\'immeuble'"
      :apartments="buildingDetailsData.apartments"
      @selcted-curr-flat="getSelectedFlatEmit"
      >
      </building-apart-illustration>
      <public-apartment-details
        v-if="componentToDisplay === 'Membres de l\'appartement'"
      :apartment="currentFlatSelected"
        @close-apart-details="showComponent('Détails de l\'immeuble')"
      >

      </public-apartment-details>
    <div class="building-members">
      <ListItems
        v-if="componentToDisplay === 'Membres de l\'immeuble'"
        :list-items="buildingDetailsData?.allMembers"
      >
        <template
          #item="{id,firstname, lastname,picture,roles}"
        >
          <ListItem >
            <template #icons>
              <div class="icon row items-center justify-center">
                <my-avatar :picture="picture"></my-avatar>
              </div>
            </template>
            <template #infos>
                <span
                  style="font-size: 13px; font-weight: 600;"
                  class="item-title"
                >
                   {{firstname}} {{lastname}}
                </span>
              <span
                v-if="roles.includes('ROLE_OWNER_CREATE')"
                style="font-size: 13px; font-weight: 300;"
                class="items-baseline"
              >
                  Syndicat
              </span>
              <span
                v-if="roles.includes('ROLE_TENANT_CREATE')"
                style="font-size: 13px; font-weight: 300;"
                class="items-baseline"
              >
                  Propriétaire
              </span>
              <span
                v-if="roles.includes('ROLE_TENANT_EDIT')"
                style="font-size: 13px; font-weight: 300;"
                class="items-baseline"
              >
                  locataire
              </span>
            </template>
            <template v-slot:actions>
              <q-btn
                round
                unelevated
                color="white"
                size="md"
                text-color="primary"
                icon="fa-solid fa-message"
                @click="sendMessage(id)"
              />
            </template>
          </ListItem>
        </template>
      </ListItems>
    </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.building-details{
  width: 100%;

  padding: 39px;

  .details-main{
    .building_actions{
      max-width: 80%;
      margin: 0 auto;
    }
  }
}

.apartements_separation{
  border-bottom: 1px solid black;
  font-weight: 500;
  margin: 60px 0 50px;
  font-size: var(--fs-400);
}
.building-members{
  max-width: 578px;
  margin: 0 auto;
}
@media screen and (min-width: 977px) {
  .building-details{
    display: block;
    width: 100%;

  }
}


</style>
