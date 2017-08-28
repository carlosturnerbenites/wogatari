<template>

<nav class="navbar has-text-centered">
  <h1 v-if="user" class="is-title is-1"> {{ user.displayName }} </h1>
  <button v-if="user" class="button is-warning" @click="exit"> Salir </button>  
</nav>

</template>

<script>
import firebase from '@/firebase';
export default {
  data() {
    return {
      user : null
    };
  },
  methods: {
    exit(){
      firebase.auth().signOut().then( () => {
            this.$toast.open({message: `Adios`,})
        this.$router.push({ name: 'Main' })
      })
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged((user) =>  {
        this.user = user
    });
  }
};
</script>

<style scoped>
</style>
