<template>
	<section>
		<b-modal :active.sync="isComponentModalActive" has-modal-card>
			<form-auth></form-auth>
		</b-modal>
	</section>
</template>

<script>
	import FormAuth from '@/components/FormAuth'

	export default {
		components: {
			FormAuth
		},
	}
</script>
