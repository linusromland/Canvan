<template>
	<Navbar></Navbar>
	<p class="text-green-800">Home</p>
	<div v-if="loggedIn">
		<p>Logged in as: {{ displayName }}</p>
		<a href="/auth/logout">Logout</a>
	</div>
	<router-link v-else to="/login">Login</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Components import
import Navbar from '@/components/Navbar/index.vue';

export default defineComponent({
	name: 'Home' as string,
	components: {
		Navbar
	},
	data() {
		return {
			loggedIn: false as boolean,
			displayName: '' as string
		};
	},
	methods: {
		async getUser() {
			const request = await fetch('/api/user');
			const user = await request.json();
			if (user) {
				this.loggedIn = true;
				this.displayName = user.displayName;
			}
		}
	},
	created() {
		this.getUser();
	}
});
</script>
