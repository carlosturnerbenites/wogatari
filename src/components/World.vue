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

      var arrayNodes = [
        /*{id: 1, label: 'Yo'},
        {id: 2, label: 'Ella'},
        {id: 3, label: 'El'},
        {id: 4, label: 'lorem'},
        {id: 5, label: 'ipsum'},
        {id: 6, label: 'dolor'},*/
      ]
      var arrayEdges = [
        /*{from: 1, to: 4},
        {from: 1, to: 5},
        {from: 2, to: 4},
        {from: 2, to: 6},
        {from: 3, to: 6}*/
      ]

    var monogatariesRef = firebase.database().ref('monogataries')
    monogatariesRef.once('value', (snapshot) => {
      window.obj = snapshot.val()
      snapshot.forEach(item => {
        var monogatari = item.val()
	      console.log(monogatari)
        arrayNodes.push({ id: monogatari.word, label: monogatari.word })
        if ( !arrayNodes.some(i => i.id == monogatari.user ) ){
          arrayNodes.push({ id: monogatari.user, label: monogatari.user })
        }
        
        arrayEdges.push({ from: monogatari.user, to: monogatari.word })
      })
      console.log(arrayNodes)
      console.log(arrayEdges)
      var nodes = new vis.DataSet(arrayNodes);
      // create an array with edges
      var edges = new vis.DataSet(arrayEdges);
      // create a network
      var container = document.getElementById('world');
      var data = {
        nodes: nodes,
        edges: edges
      };
      var options = {};
      var network = new vis.Network(container, data, options);
    });


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
