<template>
	<div class="fixed inset-0 w-full h-full z-50 flex" id="transition">
		<div class="m-auto w-2/6 bg-white p-5 rounded-md flex flex-col items-center" v-if="!error">
			<button type="submit" class="w-5/6 p-2 rounded-md m-5 bg-red-500 hover:bg-red-400 text-white cursor-pointer" @click="close">Close</button>
		</div>
		<div class="m-auto w-2/6 bg-white p-5 rounded-md flex flex-col items-center" v-else>
			<h3 class="text-2xl m-5 text-red-500">Something went wrong!</h3>
			<button type="submit" class="w-5/6 p-2 rounded-md m-5 bg-red-500 hover:bg-red-400 text-white cursor-pointer" @click="close">Close</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'settingsModal',
	data() {
		return {
			error: false
		};
	},
	methods: {
		close() {
			this.$emit('close');
		}
	}
});
</script>

<style scoped>
#transition {
	animation: fadeIn 0.05s;
	background-color: rgba(0, 0, 0, 0.5);
}
@keyframes fadeIn {
	0% {
		background-color: rgba(0, 0, 0, 0);
	}
	100% {
		background-color: rgba(0, 0, 0, 0.5);
	}
}
</style>
