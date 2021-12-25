<template>
	<p class="text-green-800">Home</p>
	<p v-if="user.displayName">Logged in as: {{ user.displayName }}</p>
	<router-link v-else to="/login">Login</router-link>
</template>

<script lang="ts">
export default {
	name: 'Home' as string,
	components: {},
	data() {
		return {
			user: {} as object
		};
	},
	methods: {
		async getUser() {
			const request = await fetch('/api/user');
			this.user = await request.json();
			console.log(this.user);
		}
	},
	created() {
		this.getUser();
	}
};
</script>
