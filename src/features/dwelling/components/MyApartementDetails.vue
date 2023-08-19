<script lang="ts" setup>
import {
  Apartment,
} from 'src/utils/interfaces';

import {buildingService} from 'src/_services';
import {onBeforeMount, ref} from 'vue';
import PropertyDetails from 'src/features/_base-components/PropertyDetails.vue';
import ListItem from 'src/features/_base-components/ListItem.vue';
import MyAvatar from 'src/features/_base-components/MyAvatar.vue';
import ListItems from 'src/features/_base-components/listItems.vue';
import {useStoreBaseFeatures} from 'stores/base-features';

const props = defineProps({
  currentApartement: {
    type: Number
  },
})
const emits = defineEmits(['goBack'])

onBeforeMount(async ()=>{
  await loadApartementDetails()
})

// all the details data about the selected building
let apartementDetailsData = ref<Apartment>()

async function loadApartementDetails()
{
  useStoreBaseFeatures().enableLoading()
  await buildingService.getApartmentDetails(props.currentApartement)
    .then(<Response>(response:Response) => {
      apartementDetailsData.value = response.data
      useStoreBaseFeatures().disableLoading()
    })
    .catch((error)=>{
      console.log('error', error)
      useStoreBaseFeatures().disableLoading()
    })
}


</script>

<template>
  <div class="apartement-details">
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
        title="Gérer mon appartement"
        type="Résidence collective"
        :component-title="`Appartement n° ${apartementDetailsData?.number}, étage ${apartementDetailsData?.floor}`"

      >

      </PropertyDetails>
      <div
        class="apartement_actions" >
        <ListItem
        >
          <template #icons>
            <div class="icon row items-center justify-center">
              <q-icon
                name="fa-solid fa-file-circle-check"
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
                    Gérer mes quittances de loyer
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
            />
          </template>
        </ListItem>
        <ListItem
        >
          <template #icons>
            <div class="icon row items-center justify-center">
              <q-icon
                name="fa-solid fa-check-double"
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
                    Gérer mes états des lieux
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
            />
          </template>
        </ListItem>
      </div>
      <div class="member_separation">
          Membres de l'appartement
      </div>
      <div class="apartement-members">
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
                   {{apartementDetailsData?.owner.firstname}} {{apartementDetailsData?.owner.lastname}}
                </span>
            <span
              v-if="apartementDetailsData?.owner?.roles?.includes('ROLE_TENANT_CREATE')"
              style="font-size: 13px; font-weight: 300;"
              class="items-baseline"
            >
                  Propriétaire
              </span>
            <span
              v-if="apartementDetailsData?.owner?.roles?.includes('ROLE_TENANT_EDIT')"
              style="font-size: 13px; font-weight: 300;"
              class="items-baseline"
            >
                  locataire
              </span>
          </template>
          <template v-slot:actions>
            <a :href="'mailto:' +apartementDetailsData?.owner?.email">
              <q-btn
                round
                unelevated
                color="white"
                size="md"
                text-color="primary"
                icon="fa-solid fa-envelope"

              />

            </a>
          </template>
        </ListItem>
        <ListItems
          :list-items="apartementDetailsData?.tenants"
        >
          <template
            #item="{firstname, lastname,picture,email,roles}"
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
                  v-if="roles?.includes('ROLE_OWNER_CREATE')"
                  style="font-size: 13px; font-weight: 300;"
                  class="items-baseline"
                >
                  Syndicat
              </span>
                <span
                  v-if="roles?.includes('ROLE_TENANT_CREATE')"
                  style="font-size: 13px; font-weight: 300;"
                  class="items-baseline"
                >
                  Propriétaire
              </span>
                <span
                  v-if="roles?.includes('ROLE_TENANT_EDIT')"
                  style="font-size: 13px; font-weight: 300;"
                  class="items-baseline"
                >
                  locataire
              </span>
              </template>
              <template v-slot:actions>
                <a :href="'mailto:' +email">
                  <q-btn
                    round
                    unelevated
                    color="white"
                    size="md"
                    text-color="primary"
                    icon="fa-solid fa-envelope"

                  />

                </a>
              </template>
            </ListItem>
          </template>
        </ListItems>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.apartement-details{
  width: 100%;
  border: 2px solid $grey-light;
  padding: 39px;
  .member_separation{
    border-bottom: 1px solid black;
    font-weight: 500;
    margin: 60px 0 50px;
    font-size: var(--fs-400);
  }
  .apartement-members, .apartement_actions{
    max-width: 578px;
    margin: 0 auto;
  }
}

@media screen and (min-width: 977px) {
  .apartement-details{
    display: block;
    width: 50%;

  }
}


</style>
