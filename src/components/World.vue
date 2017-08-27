<template>
  <div class="container">
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            {{ wg }}
          </h1>
          <h2 class="subtitle">

          </h2>
        </div>
      </div>
      <button class="button is-warning" @click="exit"> Salir </button>
    </section>
  </div>
</template>

<script>
import firebase from '@/firebase';
export default {
  data() {
    return {
      wg: ''
    };
  },
  methods: {
    exit(){
      this.$router.push({ name: 'Main' })
    }
  },
  mounted(){
    this.wg = this.$route.params.wg
    this.$toast.open({
        message: `Hola`,
    })
  }
};
</script>

<style scoped>
</style>
