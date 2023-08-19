<script lang="ts" setup>
import {PropType} from 'vue';
import {BuildingDetailsApartment} from 'src/utils/interfaces';

const props  = defineProps({
  apartments:{
    type: Array as PropType<BuildingDetailsApartment[]>
  }
})
const emits = defineEmits(['selctedCurrFlat'])
console.log(props.apartments)
</script>

<template>
  <div
    class="building_illustration">
    <div class="building_header">
      <img class="img_header" src="@pub/images/svg/buildings-appartments/top-building.svg" alt="top-building">
    </div>
    <div class="building_main">

     <div class="windows">

       <div
         v-for="(apartment,index) in props.apartments"
         :key="index"
         class="window"
        @click="emits('selctedCurrFlat',apartment.id)"
       >

         <img class="img" src="@pub/images/svg/buildings-appartments/building-window.svg"  alt="top-window">
         <span class="flat-number">{{ apartment.number}}</span>
       </div>


     </div>
     </div>
    <div class="building_footer">
      <img class="img" src="@pub/images/svg/buildings-appartments/bottom-building.svg" alt="bottom-window">
    </div>
  </div>
</template>
<style lang="scss" scoped>
.building_illustration{
    width: 70%;
  margin: 80px auto;
  min-height: 80vh;
  .building_header{
    width: 100%;

  }
  .building_main{
    background: $primary;
    justify-content: flex-start;
    padding: 16px;
    min-height: 30vh;

   .windows{
     display: flex;
     flex-wrap: wrap;
     gap: 10px;
     row-gap: 10px;
     min-height: 20vh;
     .window{
       position: relative;
       width: 17%;
       height: 20%;
       transition: scale .2s ease-out;
       cursor: pointer;
       &:hover{
         scale: 1.1;

       }
       .flat-number{
         position: absolute;
         font-size: 1.6rem;
         width: fit-content;
         font-weight: 600;
         color: white;
         top:45%;
         left: 50%;
         transform: translate(-50%,-50%);
       }
     }
   }

  }
  .building_footer{
    position: relative;
    &::before{
      content: url("data:image/svg+xml;base64,PHN2ZyBpZD0iR3JvdXBlXzEzNyIgZGF0YS1uYW1lPSJHcm91cGUgMTM3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5Mi4zNjciIGhlaWdodD0iMTI5LjYyNCIgdmlld0JveD0iMCAwIDkyLjM2NyAxMjkuNjI0Ij4KICA8ZyBpZD0iR3JvdXBlXzEzNiIgZGF0YS1uYW1lPSJHcm91cGUgMTM2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDApIj4KICAgIDxjaXJjbGUgaWQ9IkVsbGlwc2VfMTEyIiBkYXRhLW5hbWU9IkVsbGlwc2UgMTEyIiBjeD0iMzIuNjU2IiBjeT0iMzIuNjU2IiByPSIzMi42NTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgNDYuMTgzKSByb3RhdGUoLTQ1KSIgZmlsbD0iIzhkYTYyOCIvPgogICAgPHBhdGggaWQ9IlRyYWPDqV8zMjA2IiBkYXRhLW5hbWU9IlRyYWPDqSAzMjA2IiBkPSJNMjU4LjcyMiwyOTAuNDg0SDI1NC4xN2wxLjYxLTgxLjc0OC42NjYtNS43WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMC4xMTkgLTE2Mi41NTgpIiBmaWxsPSIjYTY3NjA5Ii8+CiAgICA8cGF0aCBpZD0iVHJhY8OpXzMyMDciIGRhdGEtbmFtZT0iVHJhY8OpIDMyMDciIGQ9Ik0yNTYuMjMsMjE2LjA4MWw2LjcyNy00LjkxN0wyNjguMiwyMDAuNzl2LjgzbC00LjUsMTAuMzc0LTcuNDY5LDYuNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDkuNTg5IC0xNjMuMTM3KSIgZmlsbD0iI2E2NzYwOSIvPgogICAgPHBhdGggaWQ9IlRyYWPDqV8zMjA4IiBkYXRhLW5hbWU9IlRyYWPDqSAzMjA4IiBkPSJNMjU2Ljg0MywyMjMuMjA5bC04LjE3NC01Ljc1OXYuODQybDguMTc0LDYuODE2WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMS41MzUgLTE1OC44NDcpIiBmaWxsPSIjYTY3NjA5Ii8+CiAgPC9nPgogIDxwYXRoIGlkPSJUcmFjw6lfMzIwOSIgZGF0YS1uYW1lPSJUcmFjw6kgMzIwOSIgZD0iTTI3OS43OTUsMjcyLjkyOGMwLC45NDMtOC44NTMsMS43LTE5Ljc2NywxLjdzLTE5Ljc2Ny0uNzU1LTE5Ljc2Ny0xLjcsOC44NTMtMS43LDE5Ljc2Ny0xLjdTMjc5Ljc5NSwyNzEuOTg0LDI3OS43OTUsMjcyLjkyOFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTMuNzAxIC0xNDUuMDAxKSIgZmlsbD0iIzQ1NDIzZiIgb3BhY2l0eT0iMC4yIi8+CiAgPHBhdGggaWQ9IlRyYWPDqV8zMjEwIiBkYXRhLW5hbWU9IlRyYWPDqSAzMjEwIiBkPSJNMjU2LjQ3MSwyNDQuNjQxbC04LjE2MS00Ljc5MUwyNTYuNSwyNDMuN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTEuNjI4IC0xNTMuMDgpIiBmaWxsPSIjYjA3ZTA5Ii8+Cjwvc3ZnPgo=");
      width: 70px;
      height: 70px;
      left: -40%;
      position: absolute;
    }
    &::after{
      content: url("data:image/svg+xml;base64,PHN2ZyBpZD0iR3JvdXBlXzEzNyIgZGF0YS1uYW1lPSJHcm91cGUgMTM3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5Mi4zNjciIGhlaWdodD0iMTI5LjYyNCIgdmlld0JveD0iMCAwIDkyLjM2NyAxMjkuNjI0Ij4KICA8ZyBpZD0iR3JvdXBlXzEzNiIgZGF0YS1uYW1lPSJHcm91cGUgMTM2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDApIj4KICAgIDxjaXJjbGUgaWQ9IkVsbGlwc2VfMTEyIiBkYXRhLW5hbWU9IkVsbGlwc2UgMTEyIiBjeD0iMzIuNjU2IiBjeT0iMzIuNjU2IiByPSIzMi42NTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgNDYuMTgzKSByb3RhdGUoLTQ1KSIgZmlsbD0iIzhkYTYyOCIvPgogICAgPHBhdGggaWQ9IlRyYWPDqV8zMjA2IiBkYXRhLW5hbWU9IlRyYWPDqSAzMjA2IiBkPSJNMjU4LjcyMiwyOTAuNDg0SDI1NC4xN2wxLjYxLTgxLjc0OC42NjYtNS43WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMC4xMTkgLTE2Mi41NTgpIiBmaWxsPSIjYTY3NjA5Ii8+CiAgICA8cGF0aCBpZD0iVHJhY8OpXzMyMDciIGRhdGEtbmFtZT0iVHJhY8OpIDMyMDciIGQ9Ik0yNTYuMjMsMjE2LjA4MWw2LjcyNy00LjkxN0wyNjguMiwyMDAuNzl2LjgzbC00LjUsMTAuMzc0LTcuNDY5LDYuNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDkuNTg5IC0xNjMuMTM3KSIgZmlsbD0iI2E2NzYwOSIvPgogICAgPHBhdGggaWQ9IlRyYWPDqV8zMjA4IiBkYXRhLW5hbWU9IlRyYWPDqSAzMjA4IiBkPSJNMjU2Ljg0MywyMjMuMjA5bC04LjE3NC01Ljc1OXYuODQybDguMTc0LDYuODE2WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMS41MzUgLTE1OC44NDcpIiBmaWxsPSIjYTY3NjA5Ii8+CiAgPC9nPgogIDxwYXRoIGlkPSJUcmFjw6lfMzIwOSIgZGF0YS1uYW1lPSJUcmFjw6kgMzIwOSIgZD0iTTI3OS43OTUsMjcyLjkyOGMwLC45NDMtOC44NTMsMS43LTE5Ljc2NywxLjdzLTE5Ljc2Ny0uNzU1LTE5Ljc2Ny0xLjcsOC44NTMtMS43LDE5Ljc2Ny0xLjdTMjc5Ljc5NSwyNzEuOTg0LDI3OS43OTUsMjcyLjkyOFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTMuNzAxIC0xNDUuMDAxKSIgZmlsbD0iIzQ1NDIzZiIgb3BhY2l0eT0iMC4yIi8+CiAgPHBhdGggaWQ9IlRyYWPDqV8zMjEwIiBkYXRhLW5hbWU9IlRyYWPDqSAzMjEwIiBkPSJNMjU2LjQ3MSwyNDQuNjQxbC04LjE2MS00Ljc5MUwyNTYuNSwyNDMuN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTEuNjI4IC0xNTMuMDgpIiBmaWxsPSIjYjA3ZTA5Ii8+Cjwvc3ZnPgo=");
      width: 70px;
      height: 70px;
      top: -30px;
      right: -25%;
      position: absolute;
    }
  }
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .img_header{
    width: 91%;
    height: 100%;
    object-fit: cover;
    scale: 1.2;
  }
}
@media screen and (min-width: 525px) {
  .building_illustration{
    width: 50%;
    min-height: 80vh;

    .building_main{
      min-height: 35vh;
    }
  }
}
@media screen and (min-width: 750px) {
  .building_illustration{
    width: 50%;
    min-height: 80vh;

    .building_main{
      min-height: 35vh;
    }
  }
}
</style>
