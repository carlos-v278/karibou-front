<script lang="ts" setup>
import {PropType} from 'vue';
import {Advertisement} from 'src/utils/interfaces';
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation, Pagination, A11y,Scrollbar,Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';


const swiperModules = [Navigation, Pagination, Scrollbar, A11y,Autoplay];
const props = defineProps({
  advertisement:{
    type:Object as PropType<Advertisement>
  }
})
const emits = defineEmits(['currentAdvertisement'])

// current Advertisement selected

</script>

<template>
  <div class="advertisement-item row items-center justify-between no-wrap" >
    <div class="advertisement-item-image">

      <swiper
        :modules="swiperModules"
        class="swiper-slide"
        :slides-per-view="1"
        :pagination="{ clickable: true }"
        autoplay


      >
        <swiper-slide

          v-for="(item) in props.advertisement?.pictures"
          :key="item"
        >
          <img
            v-if="props.advertisement?.pictures?.length >0"
            :src="item?.file"
            alt="image-annonce"
          >

        </swiper-slide>
        <swiper-slide
          v-if="props.advertisement?.pictures?.length === 0"
        >
          <img
            src="https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"
            alt="image-annonce"
          >

        </swiper-slide>

      </swiper>
    </div>
    <div class="advertisement-item-infos">
        <span class="advertisement-item-type">{{ props.advertisement.type }} </span>
        <span class="advertisement-item-title">{{ props.advertisement.title }}</span>
        <p class="advertisement-item-resume">{{ props.advertisement.description }}</p>

    </div>
    <div class="advertisement-item-actions row justify-center no-wrap">
      <q-btn
        round
        unelevated
        color="white"
        size="md"
        text-color="primary"
        icon="fa-solid fa-angle-right"
        class="q-mr-md"
        @click="emits('currentAdvertisement',props.advertisement)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.advertisement-item{
  margin: 15px auto;
  padding: 2px ;
  border: 1px solid #E8E8E8;
  max-width: 600px;
  height: 120px;
  width: 100%;
  border-radius: 10px;
  .advertisement-item-infos {
    padding: 5px 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .advertisement-item-type{
      font-size: var(--fs-300);
      color: $primary;
      font-weight: 400;
    }
    .advertisement-item-title{
      font-size: var(--fs-400);
      font-weight: 500;
    }
    .advertisement-item-resume{
      max-width: 355px;
      min-width: 100px;
      font-size: var(--fs-300);
      font-weight: 300;
      overflow: hidden;
      max-height: 42px;

    }
  }
.advertisement-item-image{
  max-width: 140px;
  width: 100%;
  border-radius: 10px;
  height: 100%;
  .swiper{
    width: 100%!important;
    height: 100% !important;

  }
  img{
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover ;
  }
}

}

</style>
