<template>
	<div id="app">

		<auth-bar></auth-bar>

		<transition name="slide">
			<router-view></router-view>
		</transition>

		<b-modal :canCancel="false" :active.sync="ifShowModalAuth" has-modal-card>
				<form-auth></form-auth>
		</b-modal>

	</div>
</template>

<script>
	import firebase from '@/firebase';

	import AuthBar from '@/components/AuthBar.vue'
	import FormAuth from '@/components/FormAuth.vue'

	export default {
		data(){
			return {
				user: null,
				ifShowModalAuth: false,
			}
		},
		components: {
			AuthBar,
			FormAuth,
		},
		mounted(){
			firebase.auth().onAuthStateChanged((user) =>  {
				this.ifShowModalAuth = user ? false : true
				this.user = user
			});
		}
	};
</script>

<style>
</style>
