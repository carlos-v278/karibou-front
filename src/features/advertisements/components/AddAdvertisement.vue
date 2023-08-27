<script lang="ts" setup>
import Axios from 'src/_services/caller.service';

import {accountService} from 'src/_services';

import {notify} from 'src/utils/utils';
import {useStoreBaseFeatures} from 'stores/base-features';




//emits
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
  },
  formImages:{
    type:Array
  }
})


//submit form value
function onSubmit():void{

  postAdvertisementInfos();
}

//function wich path every primitive users informations
function postAdvertisementInfos():void
{
  const dataBody = props.formData
  if(props.request && props.request.method === 'post' && dataBody){
    useStoreBaseFeatures().enableLoading()
    Axios.post(props.request.url ,dataBody)
      .then(res =>{
        console.log(res.status)
        useStoreBaseFeatures().disableLoading()
        filesUploads(res.data?.id)

      })
      .catch(err =>{
        useStoreBaseFeatures().disableLoading()
        console.log(err)
      })

  }
}


//function wich uploads files ex: user profile picture
function filesUploads(id:number):void
{

    if(props.formImages && Object.keys(props.formImages).length > 0){

      props.formImages.forEach((file)=>{
        let formData = new FormData();
        let myHeaders = new Headers();
        let token = accountService.getToken()
        myHeaders.append('Authorization', `Bearer ${token}`);
        formData.append('file', file)
        fetch(`http://localhost:8080/api/advertisements/${id}/picture`, {
          method: 'POST',
          headers: myHeaders,
          body:formData,
        }).then(()=> {
          notify('L\'image a été uploadé avec succès.','positive')
        }).catch(function (error) {
            console.log(error);
          })})

      }

}

//update personal profile informations after edit

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

  width: 100%;
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
    padding: 15px 15px 100px;
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
