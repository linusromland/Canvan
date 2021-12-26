<template>
	<div class="flex h-screen">
		<div class="m-auto flex flex-col items-center p-10">
			<h2>Login to Canvan</h2>
			<div class="flex flex-col w-52">
				<LoginWithGoogle class="my-2" link="/auth/google"></LoginWithGoogle>
				<LoginWithGithub class="my-2" link="/auth/github"></LoginWithGithub>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginWithGoogle from '@/components/LoginWithGoogle/index.vue';
import LoginWithGithub from '@/components/LoginWithGitHub/index.vue';

export default defineComponent({
	name: 'Login' as string,
	components: { LoginWithGoogle, LoginWithGithub },
	data() {
		return {};
	},
	methods: {
		async getUser() {
			const request = await fetch('/api/user');
			const user = await request.json();
			if (user) {
				window.location.href = '/';
			}
		}
	},
	created() {
		console.log(this);
		this.getUser();
	}
});
</script>
