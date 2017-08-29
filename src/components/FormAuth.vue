<template>
	<form action="">

		<b-loading :active.sync="isLoading" :canCancel="true"></b-loading>

		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Autenticación</p>
			</header>
			<section class="modal-card-body">
				<b-field label="">
					<b-input
						type="text"
						v-model="displayName"
						placeholder="Nombre"
						required>
					</b-input>
				</b-field>

				<b-field label="">
					<b-input
						type="email"
						v-model="email"
						placeholder="Email"
						required>
					</b-input>
				</b-field>

				<b-field label="">
					<b-input
						type="password"
						v-model="password"
						password-reveal
						placeholder="Santo y Seña"
						required>
					</b-input>
				</b-field>
			</section>
			<footer class="modal-card-foot">
				<button type="button" class="button is-primary" @click="login">Ingresar</button>
				<button type="button" class="button is-primary" @click="register">Registrarse</button>
			</footer>
		</div>
	</form>
</template>

<script>
	import firebase, { firebaseAuth } from '@/firebase'

	export default {
		data() {
			return {
				email: 'carlosturnerbenites@gmail.com',
				password: '123456',
				displayName: 'Carlos Turner',
				isLoading: false,
			}
		},
		methods: {
			login(){
				this.isLoading = true
				firebaseAuth.signInWithEmailAndPassword(this.email,this.password).catch((error) => {
					this.isLoading = false
					var errorCode = error.code;
					var errorMessage = error.message;
					this.$toast.open({ message: `Opps, '${errorMessage}'`, })
				});
			},
			register(){
				this.isLoading = true
				firebaseAuth.createUserWithEmailAndPassword(this.email,this.password)
				.then((p) => {
					this.isLoading = false
					console.info("Nuevo Usuario Registrado")
					var currentUser = firebaseAuth.currentUser;
					currentUser.updateProfile({displayName: this.displayName,}).then(function() {}, function(error) {});

					firebaseDatabase.ref(`users/${currentUser.uid}`).set({
						uid: currentUser.uid,
						displayName: this.displayName,
					});

				}).catch((error) => {
					this.isLoading = false
					var errorCode = error.code;
					var errorMessage = error.message;
					this.$toast.open({ message: `Opps, '${errorMessage}'`, })
				});
			},
		},
		mounted(){
			firebaseAuth.onAuthStateChanged((user) =>  {
				this.isLoading = false
				if (user) {
					var currentUser = firebaseAuth.currentUser;
					this.$toast.open({ message: `Hola. Bienvenido ${currentUser.displayName}. ` })
					this.$parent.close()
				} else {
					// User is signed out.
				}
			});
		}
	}
</script>

<style scoped>
	.modal-card {
		width: auto;
	}
</style>
