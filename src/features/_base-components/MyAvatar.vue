<script setup lang="ts">
const props = defineProps({
  picture:String
})

console.log(props.picture)
</script>
<template>
  <div class="my-avatar-img">

    <img
      v-if="props?.picture !=  undefined "
      alt="personal-avatar-image"
      :src="props?.picture"
    >
    <img
      v-else
      alt="personal-avatar-image"
      src="https://images.assetsdelivery.com/compings_v2/salamatik/salamatik1801/salamatik180100019.jpg"
    >


  </div>
</template>
<style scoped lang="scss">
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
</style>
