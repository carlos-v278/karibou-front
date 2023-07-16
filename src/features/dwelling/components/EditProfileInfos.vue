<script lang="ts" setup>




//emits
import Axios from 'src/_services/caller.service';

const emits = defineEmits(['goBack'])
//props
const props = defineProps({
  title:{
    type:String
  },
  formData:{
    type:Object
},
  request:{
    type:Object
  }
})

//submit form value
function onSubmit():void{
  const dataBody = props.formData
  if(props.request && props.request.method === 'patch'){

    Axios.patch(props.request.url ,dataBody)
      .then(res =>{
        console.log(res)
      })
      .catch(err =>{
        console.log(err)
      })
  }

}


</script>

<template>
  <div class="perso-infos-form">
    <q-btn
      size="md"
      color="grey-light"
      text-color="black"
      class="btn-back"
      round
      icon="fa-solid fa-arrow-left"
      @click="emits('goBack')"
    />
    <h2 class="component-title">
      {{props.title}}
    </h2>

    <q-form
      class="form"
      @submit="onSubmit"
    >
      <div class="rows row-header">
        <slot name="header"  >

        </slot>
      </div>
      <div class="rows row-main">
        <slot name="main"  >

        </slot>
      </div>
      <div class="rows row-footer">
        <slot name="footer" >

        </slot>
      </div>

    </q-form>
  </div>
</template>

<style scoped lang="scss">
.perso-infos-form{
  position: relative;
  border: 2px solid #F3F3F3;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .btn-back{
    position: absolute;
    left: 30px;
    top: 30px;
  }

  .component-title{
    font-size: var(--fs-800);
    padding: 15px 15px;
    width: fit-content;
    margin-top:120px;
    font-family: $secondary-font;
    color: $primary;
  }
  .form{
    padding: 15px 15px;
    margin-top:10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 75%;
    .rows {
      width: 100%;
      gap: 10px;
      display: flex;
      flex-direction: column;
    }

  }
}
</style>
