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
					<router-link to="World" class="button is-primary" tag="button"> Mundo </router-link>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import firebase, { firebaseDatabase, firebaseAuth } from '@/firebase'
import WoGatari from '@/components/WoGatari.vue'
import Utils from '@/utils'

window.firebaseDatabase = firebaseDatabase

export default {
	components:{
		WoGatari,
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
			this.words = []
			var wordsRef = firebaseDatabase.ref('words/')
			wordsRef.orderByChild("word").startAt(this.wg).on('value', (snapshot) => {
				snapshot.forEach(item => {
					this.words.push(item.val())
				})
				isFetching: false
			});
		},
		init(){
			if ( Utils.isValid(this.wg) ){

				var currentUser = firebaseAuth.currentUser
				var wordsRef = firebaseDatabase.ref('words')
				var wordRef = firebaseDatabase.ref('words').child(this.wg)

				var historyRef = firebaseDatabase.ref('history')

				wordRef.once("value",(snap) => {
					var word = snap.val();
					if ( word ){
						var currentIncidences = word.incidences || 0
						wordRef.update({incidences:currentIncidences + 1 })
					}else{
						wordRef.set({
							text:this.wg,
							incidences:1,
						})
					}

					historyRef.push({
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						word:this.wg,
						date: new Date().getTime(),
					})

					this.$router.push({ name: 'World', params: { wg: this.wg } })

				})

			}else{
				this.$toast.open({ message: `Nop, Esto '${this.wg}' No puede ser`, })
			}
		}
	},
	mounted(){}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
