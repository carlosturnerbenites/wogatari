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
	</div>

</div>
</template>

<script>

import firebase, { firebaseDatabase } from '@/firebase';
import vis from 'vis';

export default {
	data() {
		return {
			wg: ''
		};
	},
	methods: {
		draw(){

			var arrayNodes = []
			var arrayEdges = []

			var historyRef = firebaseDatabase.ref('history')

			historyRef.once('value', (snapshot) => {
				window.snapshot = snapshot
				var users = snapshot.child("users").val()
				var words = snapshot.child("words").val()

				var nodes = new vis.DataSet(arrayNodes);
				var edges = new vis.DataSet(arrayEdges);
				var container = document.getElementById('world');
				var data = {
					nodes: nodes,
					edges: edges
				};
				var options = {};
				var network = new vis.Network(container, data, options);
			});
		},
	},
	mounted(){
		this.wg = this.$route.params.wg
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
