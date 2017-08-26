<template>
  <div class="container">
    <div class="columns">
      <div class="column is-10 is-offset-1">
        <h1 class="title is-1 has-text-centered">WoGatari</h1>
        <div class="section">
          <div class="field">
            <div class="control">
              <input class="input" v-model="wg" type="text" placeholder="Una Palabra">
            </div>
          </div>
          <div clas="box has-text-centered">
            <button class="button is-primary is-large" @click="init">Comparte</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '@/firebase'
export default {
  data() {
    return {
      wg: 'lorem',
    };
  },
  methods:{
    init(){
      firebase.auth().signInAnonymously().catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

      firebase.auth().onAuthStateChanged((user) =>  {
        if (user) {

          var userId = firebase.auth().currentUser.uid;
          var wordsRef = firebase.database().ref('words')


          // User is signed in.
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          // alert(`Hola ${uid}`)
          
          var record = {
            text: this.wg
          }
          firebase.database().ref('words').push(record);

          wordsRef.equalTo("lorem").on('value', function(snapshot) {
            window.snapshot = snapshot
            console.log(snapshot.val())
          });

          this.$router.push({ name: 'World', params: { wg: this.wg } })

        } else {
          // User is signed out.
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
