<template>
<div>
	<section v-if="wg" class="hero is-primary">
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

import firebase, { firebaseDatabase, firebaseAuth } from '@/firebase';
import vis from 'vis';
import chroma from 'chroma-js';

window.chroma = chroma
export default {
	data() {
		return {
			wg: null
		};
	},
	methods: {
		draw(){

			var arrayNodes = []
			var arrayEdges = []

			var nodes = new vis.DataSet(arrayNodes);
			window.nodes = nodes
			var edges = new vis.DataSet(arrayEdges);
			window.edges = edges
			var container = document.getElementById('world');
			var data = {
				nodes: nodes,
				edges: edges
			};
			var options = {};
			var network = new vis.Network(container, data, options);
			window.network = network

			var historyRef = firebaseDatabase.ref('history')
			var currentUser = firebaseAuth.currentUser

			var scale = chroma.scale(["yellow","orange"])
			var colorsWords = scale.colors(100)

			var scale = chroma.scale(["red","blue"])
			var colorsUser = scale.colors(100)

			historyRef.on('child_added', (snapshot) => {
				var item = snapshot.val()
				var nodeWord = nodes.get(item.word)
				var nodeUser = nodes.get(item.uid)
				if ( !nodeWord ){
						var size = 25
						var index = Math.floor((Math.random() * 100) + 1);
						var color = colorsWords[index]
						if ( this.wg == item.word ){
							size = 30
							color = "green"
						}
						nodes.add({
							id:item.word,
							label:item.word,
							shape:'circle',
							color:color,
							size:size,
						})
				}
				if ( !nodeUser ){
						var color = colorsUser[index]
						var fixed = false
						if ( currentUser.uid == item.uid ) {
							color = "green";
							fixed = true;
						}
					nodes.add({
						id:item.uid,
						label:item.displayName,
						shape:'box',
						color: color,
						fixed: fixed,
					})
				}
				edges.add({to:item.uid, from:item.word})
			})
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
