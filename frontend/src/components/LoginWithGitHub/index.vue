<template>
	<a id="github-button" @click="githubButton()" class="btn btn-block btn-social btn-github"> <i class="fa fa-github"></i> <slot>Sign in with GitHub</slot> </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'LoginWithGithub',
	props: {
		link: String
	},
	methods: {
		githubButton() {
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

#github-button {
	cursor: pointer;
}
</style>
