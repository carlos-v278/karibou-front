<script lang="ts" setup>
import {PropType} from 'vue';
import {Advertisement} from 'src/utils/interfaces';
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, A11y,Scrollbar,Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import ListItem from 'src/features/_base-components/ListItem.vue';
import MyAvatar from 'src/features/_base-components/MyAvatar.vue';
import {messagingService} from "src/_services";
import {notify} from "src/utils/utils";
import {useRouter} from "vue-router";
import {useStoreBaseFeatures} from "stores/base-features";

const router = useRouter()
const swiperModules = [Navigation, Pagination, Scrollbar, A11y,Autoplay];
const props = defineProps({
  advertisement:{
    type: Object as PropType<Advertisement>
  }
})

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
  <div class="advertisement-view">
    <div class="advertisement-view-header">
      <swiper
        :modules="swiperModules"
        class="swiper-slide"
        :slides-per-view="1"
        :pagination="{ clickable: true }"
        navigation


      >

        <swiper-slide

          v-for="(item,index) in props.advertisement?.pictures"
          :key="item"
        >
          <img
            v-if="props.advertisement?.pictures?.length >0"
            :src="item?.file"
            alt="image-annonce"
          >
          <div class="priview">
            <img
              v-if="props.advertisement?.pictures?.length >0 &&  index < props.advertisement?.pictures?.length"
              :src="[index + 1 < props.advertisement?.pictures?.length ? props.advertisement?.pictures[index +1]?.file : props.advertisement?.pictures[0]?.file]"
              alt="image-annonce"
            >
          </div>
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
    <div class="advertisement-view-main">
      <div class="top">
        <span class="type">{{ advertisement.type.charAt(0).toUpperCase() + advertisement.type.slice(1)}}</span>
      </div>
      <div class="middle">
        <span class="title">{{ advertisement.title}}</span>
        <span
          class="price"
          v-if="advertisement?.type ==='vente' || advertisement?.type ==='job'"
        >
          {{ advertisement.price}} €
        </span>

      </div>
      <div class="tags">
        <span class="tag">#sell</span>
        <span class="tag">#home</span>
        <span class="tag">#sell</span>
      </div>
      <div class="bottom">

        <div class="description" v-html="advertisement?.description">

        </div>

        <div class="owner">
          <ListItem
          :border="false"
          >
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
                   {{advertisement.owner.firstname}} {{advertisement.owner.lastname}}
                </span>
              <span
                v-if="advertisement?.owner?.roles.includes('ROLE_OWNER_CREATE')"
                style="font-size: 13px; font-weight: 300;"
                class="items-baseline"
              >
                  Syndicat
              </span>
              <span
                v-if="advertisement?.owner?.roles.includes('ROLE_TENANT_CREATE')"
                style="font-size: 13px; font-weight: 300;"
                class="items-baseline"
              >
                  Propriétaire
              </span>
              <span
                v-if="advertisement?.owner?.roles.includes('ROLE_TENANT_EDIT')"
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
                @click="sendMessage(advertisement?.owner?.id)"
              />
            </template>
          </ListItem>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.advertisement-view{
  width: 100%;

  min-height: 120vh;
  .advertisement-view-header{
    max-height:380px;
    height: 40vh;
  }
  .advertisement-view-main{
    padding: 25px;
    .top {
      color: $primary;
      font-size: var(--fs-800);
    }
    .middle {
      margin: 4px 0 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title{
        font-size: 20px;
        font-weight: 500;
      }
      .price {
        color: $primary;
        font-size: var(--fs-800);
      }
    }
    .tags {
      display: flex;
      gap: 8px;
      color: $grey-dark ;
      font-size: var(--fs-400);
    }

    .description {
      margin: 23px 0;
      font-weight: 300;
      font-size: var(--fs-500);
    }
    .owner {
      display: flex;
      justify-content: flex-start;
      border-top: 2px solid $grey-light;
    }
  }
  .swiper{
    width: 100%!important;
    height: 100% !important;

  }
  .priview{
    border-radius: 10px;
    max-width: 65px;
    height: 56px;
    width: 100%;
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 1;
    img{
      border-radius: 10px;
      border: 2px solid #F3F3F3;
    }
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;

  }
}

@media screen and (min-width: 977px) {
  .advertisement-view{
    width: 100%;
    .advertisement-view-header{
      .priview{
        max-width: 75px;
        height: 66px;

      }
    }
}
}
</style>
