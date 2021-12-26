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
						<a href="" class="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold">Active</a>
						<a href="" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Link</a>
						<a href="" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Link</a>
						<a href="" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Link</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Navbar'
});
</script>

<style scoped></style>
