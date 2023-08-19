<script lang="ts" setup>
import { toRefs} from 'vue';

const props = defineProps({
  title: String,
  type:String,
  icon:String,
  componentTitle:String
})

const {title, type,icon,componentTitle} = toRefs(props)

</script>
<template>
  <div class="property_details">
    <div class="property_details_header">
      <q-icon
        :name="'fa-solid ' + icon"
        round
        size="md"
        color="primary"
      />
      <div class="building_infos">
        <span class="buildig_street">{{ componentTitle }}</span>
        <span class="property_type" v-if="type">{{type}}</span>
      </div>
    </div>
    <div class="component_title">
      {{title}}
    </div>
  </div>
</template>
<style scoped lang="scss">
.property_details{
  margin: 40px 0;

  border-bottom: 1px solid $grey-dark;
  .property_details_header{
    display: flex;
    gap: 15px;
    align-items: center;
    margin: 25px 0;
    .building_infos{
      display: flex;
      flex-direction: column;
      .buildig_street{
        font-size: var(--fs-500);
        font-weight: 500;
      }
      .property_type{
        font-size: var(--fs-300);

      }
    }
  }
  .component_title{
    font-size: var(--fs-500);
    font-weight: 500;
  }
}
</style>
