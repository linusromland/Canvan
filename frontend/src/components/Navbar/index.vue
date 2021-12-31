<template>
	<nav class="bg-white shadow-lg">
		<div class="max-w-6xl mx-auto px-4">
			<div class="flex justify-between">
				<div class="w-full flex justify-between">
					<div>
						<a href="/" class="flex items-center py-4 px-2">
							<img src="@/assets/icon.svg" alt="Logo" class="h-8 w-8 mr-2" />
							<span class="font-semibold text-gray-500 text-lg">Canban</span>
						</a>
					</div>
					<div class="flex items-center">
						<!-- <a href="" class="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold">Active</a> -->
						<div v-if="loggedIn" class="flex">
							<p class="py-4 px-2 text-gray-900 font-semibold">Logged in as: {{ displayName }}</p>
							<a href="/auth/logout" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Logout</a>
						</div>
						<router-link v-else to="/login" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Login</router-link>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Navbar',
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

<style scoped></style>
