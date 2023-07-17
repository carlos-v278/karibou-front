<script setup lang="ts">
import {toRefs,ref} from 'vue';


//defined props
const props = defineProps({
  oneTxt:{
    type:String
  },
  twoTxt:{
    type:String
  }
})

const emits = defineEmits(['currentChoice'])

// Destructuring props
const {oneTxt,twoTxt} = toRefs(props)

const currentChoice = ref(1)
function toggleChoice(number:number, choice:string | number ):void
{
  currentChoice.value = number
  emits('currentChoice',choice )
}

</script>
<template>
<div class="toggle-btn">
  <div @click="toggleChoice(1, oneTxt ? oneTxt: 1)"  class="one choice" :class="{ select: currentChoice === 1 }">
    <span v-if="oneTxt" class="one-txt">
      {{oneTxt}}
    </span>
    <slot v-else name="one"></slot>
  </div>
  <div @click="toggleChoice(2,twoTxt ? twoTxt :2 )" class="two choice" :class="{ select: currentChoice === 2 }">
    <span v-if="twoTxt" class="two">
      {{twoTxt}}
    </span>
    <slot v-else name="two"></slot>
  </div>
</div>
</template>

<style lang="scss" scoped>
.toggle-btn{
  margin: 0 auto;
  border-radius: 22px;
  background: $grey-light;
  padding: 6px;
  max-width: 587px;
  width: 100%;
  min-height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;


  .choice{
    min-height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 50%;
    border-radius: 15.5px;
  }
  .select{
    background: white;
    color: $primary;
  }
}


@media screen and (min-width: 981px) {}

</style>
