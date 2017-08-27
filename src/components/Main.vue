<template>
  <div class="container">

    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            <WoGatari></WoGatari>
          </h1>
          <h2 class="subtitle">
            Comparte Palabras
          </h2>
        </div>
      </div>
    </section>

    <div>

      <section class="section">
        <h1 class="title is-1 has-text-centered">
          List@
        </h1>
      </section>
      
      <section class="section">
        <div class="field">
          <div class="control">

            <b-autocomplete
                v-model="wg"
                :data="words"
                field="text"
                :loading="isFetching"
                @input="getWords"
                placeholder="Una Palabra"
            >
                <template scope="props">
                    <div class="media">
                        <div class="media-left">
                        </div>
                        <div class="media-content">
                            {{ props.option.text }}
                            <br>
                            <small>
                                Coincidencias #
                            </small>
                        </div>
                    </div>
                </template>
            </b-autocomplete>
          </div>
        </div>
        <div class="has-text-right">
          <button class="button is-success" @click="init">Comparte</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import firebase from '@/firebase'
import WoGatari from '@/components/WoGatari.vue'
import Utils from '@/utils'

export default {
  components:{
    WoGatari
  },
  data() {
    return {
      wg: '',
      words: [],
      isFetching: false,
    };
  },
  methods:{
    getWords(){
      isFetching: true
      this.words = [{text:"lorem"},{text:"ipsum"},{text:"dolor"}]
      isFetching: false
    },
    init(){
      var wordsRef = firebase.database().ref('words')
      if ( Utils.isValid(this.wg) ){
        var record = { text: this.wg }
        firebase.database().ref('words').push(record);

        wordsRef.equalTo("lorem").on('value', function(snapshot) {
          window.snapshot = snapshot
          console.log(snapshot.val())
        });

        this.$router.push({ name: 'World', params: { wg: this.wg } })
      }else{
        this.$toast.open({
            message: `Nop, Esto '${this.wg}' No puede ser`,
        })
      }

      /*
      firebase.auth().signInWithCustomToken(this.wg).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
      firebase.auth().onAuthStateChanged((user) =>  {
        if (user) {
          var userId = firebase.auth().currentUser.uid;

          // User is signed in.
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;

        } else {
          // User is signed out.
        }
      });
      */
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
