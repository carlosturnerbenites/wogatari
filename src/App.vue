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
	import AuthBar from '@/components/AuthBar.vue'
	import FormAuth from '@/components/FormAuth.vue'
	import firebase from '@/firebase';

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

<style>
</style>
