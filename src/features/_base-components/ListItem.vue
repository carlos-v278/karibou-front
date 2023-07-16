<script lang="ts" setup>


</script>

<template>
  <div class="list-item row items-center justify-between q-pa-lg" >
    <div class="list-item-icons">
      <slot name="icons" >

      </slot>
    </div>
    <div class="list-item-infos">
      <slot name="infos" >

      </slot>
    </div>
    <div class="list-item-actions row justify-center no-wrap">
      <slot name="actions">

      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-item{
  border: 1px solid #E8E8E8;
  max-width: 578px;
  min-height: 68px;
  border-radius: 18px;
  width: 100%;
  transition: background .2s ease-out;
  &:hover{
    background: $grey-light;
    cursor: pointer;

  }
  .list-item-icons {
    display: flex;
    flex: 1;
  }
  .list-item-infos{
    padding-left: 10px;
    display: flex;
    flex-direction:column;
    flex: 7;
    max-width: 70%;
    &:first-child{
      font-size: 4rem;
    }
  }
  .list-item-actions{
    width: 100%;
    max-width: 20%;
  }
}
</style>
