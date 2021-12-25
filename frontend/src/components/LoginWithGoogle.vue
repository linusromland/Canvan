<template>
	<a id="google-button" @click="googleButton()" class="btn btn-block btn-social btn-google"> <i class="fa fa-google"></i> <slot>Sign in with Google</slot> </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'LoginWithGoogle',
	props: {
		link: String
	},
	methods: {
		googleButton() {
			const link = this.$props.link;
			if (link) window.location.href = link;
		}
	}
});
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
@import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/4.12.0/bootstrap-social.min.css';

#google-button {
	cursor: pointer;
}
</style>
