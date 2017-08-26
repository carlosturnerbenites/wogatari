<template>
  <div class="container">
    <h1 class="title is-1 has-text-centered"> {{ $route.params.wg }} </h1>
    <p> Usted: {{ user.uid }} </p>
    <button  class="button is-darger" @click="signOut"> Salir </button>
  </div>
</template>

<script>
import firebase from '@/firebase';
export default {
  data() {
    return {
        user: {},
    };
  },
  methods: {
    signOut(){
      this.$router.push({ name: 'Main' })
    }
  },
  mounted(){
      this.user = firebase.auth().currentUser
  }
};
</script>

<style scoped>
</style>
