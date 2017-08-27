<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            {{ wg }}
          </h1>
          <h2 class="subtitle">

          </h2>
        </div>
      </div>
    </section>

    <div>
      <div id="world"></div>
      <button class="button is-warning" @click="exit"> Salir </button>
    </div>

  </div>
</template>

<script>

import firebase from '@/firebase';
import vis from 'vis';


export default {
  data() {
    return {
      wg: ''
    };
  },
  methods: {
    draw(){
      var nodes = new vis.DataSet([
        {id: 1, label: 'Yo'},
        {id: 2, label: 'Ella'},
        {id: 3, label: 'El'},
        {id: 4, label: 'lorem'},
        {id: 5, label: 'ipsum'},
        {id: 6, label: 'dolor'},
      ]);
      // create an array with edges
      var edges = new vis.DataSet([
        {from: 1, to: 4},
        {from: 1, to: 5},
        {from: 2, to: 4},
        {from: 2, to: 6},
        {from: 3, to: 6}
      ]);
      // create a network
      var container = document.getElementById('world');
      var data = {
        nodes: nodes,
        edges: edges
      };
      var options = {};
      var network = new vis.Network(container, data, options);

    },
    exit(){
      this.$router.push({ name: 'Main' })
    }
  },
  mounted(){
    this.wg = this.$route.params.wg
    this.$toast.open({
        message: `Hola`,
    })

    this.draw()

  }
};
</script>

<style scoped>
  #world {
    width: 100%;
    height: 400px;
    border: 1px solid lightgray;
  }
</style>
