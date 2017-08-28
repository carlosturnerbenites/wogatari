<template>

<nav class="has-text-centered">
	<h1 v-if="user" class="title is-6"> {{ user.displayName }} </h1>
	<button v-if="user" class="button is-warning" @click="exit"> Salir </button>
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
