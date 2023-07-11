<script setup lang="ts">
import {toRefs} from 'vue'

//declaration of props
const props = defineProps({
  listItems: Array
})

//destructuring props
const { listItems } = toRefs(props);


</script>
<template>
<div v-for="(item,index) in listItems"  :key="index" class="list-item" >
  <slot name="item"></slot>
</div>
</template>

<style lang="scss" scoped>
.list-item{
  margin: 20px 0;
}

@media screen and (min-width: 981px) {}

</style>
