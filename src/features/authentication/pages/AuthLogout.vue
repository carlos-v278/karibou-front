<script setup lang="ts">
import { onMounted } from 'vue';
import { accountService, userService } from 'src/_services';
import { useRouter } from 'vue-router';
import { notify } from 'src/utils/utils';
import { useUserStore } from 'src/features/_utils/user.store';

//lifes cycles hook
onMounted(() => {
  logoutUser();
});
const userStore = useUserStore();
const router = useRouter();

//function logout the user from the Api and remove Token
function logoutUser(): void {
  userService.removeProfile();
  userService.removeUserBuildings();
  userService.removeUserApartments();
  userStore.removeUserBuildings();
  userStore.removeUserApartments();
  userStore.removeUserProfile();
  accountService
    .logout()
    .then((res) => {
      router.push({ name: 'login' });
      notify('Déconnexion réussie', 'positive');
    })
    .catch((err) => {
      notify('Déconnexion impossible.', 'negative');
    });
}
</script>

<template>
  <div class="logout"></div>
</template>

<style scoped lang="scss"></style>
