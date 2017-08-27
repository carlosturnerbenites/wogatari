<template>
  <div>

    <section class="hero is-primary">
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

    <div class="container">

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

        <b-modal :canCancel="false" :active.sync="ifShowModalAuth" has-modal-card>
            <modal-auth v-bind="formProps"></modal-auth>
        </b-modal>

    </div>
  </div>
</template>

<script>
import firebase from '@/firebase'
import WoGatari from '@/components/WoGatari.vue'
import ModalAuth from '@/components/ModalAuth.vue'
window.firebase = firebase
import Utils from '@/utils'

export default {
  components:{
    WoGatari,
    ModalAuth
  },
  data() {
    return {
      wg: '',
      words: [],
      isFetching: false,
      ifShowModalAuth: false,
      formProps: {
          email: 'evan@you.com',
          password: 'testing'
      }
    };
  },
  methods:{
    getWords(){

      isFetching: true
      this.words = []
      var wordsRef = firebase.database().ref('words/')
      wordsRef.orderByChild("text").startAt(this.wg).on('value', (snapshot) => {
        snapshot.forEach(item => {
          this.words.push(item.val())
        })
        isFetching: false
      });
    },
    init(){
      if ( Utils.isValid(this.wg) ){

        var wordsRef = firebase.database().ref('words/')
        var monogatariesUserRef = firebase.database().ref(`monogataries`)

        wordsRef.orderByChild("text").equalTo(this.wg).once('value', (snapshot) => {

          console.log(snapshot)
          if ( !snapshot.val() ){
            var record = { text: this.wg }
            let word = wordsRef.push(record);

            monogatariesUserRef.push({ 
              word: word.key,
              user: this.user.uid,
              incidences: 0
            })
          }

          this.$router.push({ name: 'World', params: { wg: this.wg } })
        });


      }else{
        this.$toast.open({
            message: `Nop, Esto '${this.wg}' No puede ser`,
        })
      }
    }
  },
  mounted(){
    var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged((user) =>  {
        if (!user) {
          this.ifShowModalAuth = true
        }
        this.user = user
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
