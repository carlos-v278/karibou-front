<script lang="ts" setup >

</script>
<template>
 <div class="karibou-loading">
    <div class="bg-filter">
        <div class="loading-element">
            <div class="logo">
              <img src="@pub/images/logo.svg" alt="logo-karibou">
            </div>
           <span id="animation">
              <q-spinner-dots size="7em" color="orange" />
           </span>
        </div>
    </div>
 </div>
</template>

<style scoped lang="scss">
.karibou-loading{
  position: fixed;
  z-index: 100000;
  background: rgba(0,0,0,.5);
  top: 0 ;
  left: 0;
  width: 100%;
  height: 100%;
  .bg-filter{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .loading-element{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .logo{
        width: 120px;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .animation{
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
