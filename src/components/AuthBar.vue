<template>
	<nav class="navbar ">
		<div class="navbar-brand">
			<a class="navbar-item" href="#">
				<span class="title is-5" v-if="user"> {{ user.displayName }} </span>
			</a>
			<div class="navbar-burger burger" data-target="navMenubd-example">
			<span></span>
			<span></span>
			<span></span>
			</div>
		</div>

		<div id="navMenubd-example" class="navbar-menu">
			<div class="navbar-start"></div>

			<div class="navbar-end">
			<div class="navbar-item">
				<div class="field is-grouped">
				<router-link to="/" class="button is-primary" tag="button"> Buscador </router-link>
				<p class="control">
					<button v-if="user" class="button is-warning" @click="exit"> 
					<span class="icon">
						<i class="fa fa-times"></i>
					</span>
					<span>Salir</span>
					</button>
				</p>
				</div>
			</div>
			</div>
		</div>
	</nav>

</template>

<script>
import firebase, { firebaseAuth } from '@/firebase';
export default {
	data() {
		return {
			user : null
		};
	},
	methods: {
		exit(){
			this.$dialog.confirm({
				title: 'Irme',
				message: 'De salida?',
				confirmText: 'Sip',
				type: 'is-success',
				hasIcon: true,
				onConfirm: () => {
					firebaseAuth.signOut().then( () => {
						this.$toast.open({message: `Adios`,})
						this.$router.push({ name: 'Main' })
					})
				}
			})
		}
	},
	mounted(){
		firebaseAuth.onAuthStateChanged((user) =>  this.user = user );
	}
};
</script>

<style scoped>
</style>
