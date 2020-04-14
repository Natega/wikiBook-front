<template>
  <div class="home">
    <Agregator msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Agregator from '@/components/Agregator.vue';

export default {
  name: 'Home',
  components: {
    Agregator,
  },
};
</script>
