<template>
	<div class="fixed inset-0 w-full h-full z-50 flex" id="transition">
		<div class="m-auto w-2/6 bg-white p-5 rounded-md flex flex-col items-center" v-if="!error">
			<h3 class="text-xl m-5">New Entry</h3>
			<input type="text" v-model="title" class="w-5/6 p-2 m-3 rounded-md bg-gray-200" placeholder="Title" />
			<input type="text" v-model="description" class="w-5/6 p-2 m-3 rounded-md bg-gray-200" placeholder="Description" />
			<p class="text-red-600">{{ errorMessage }}</p>
			<div class="flex w-5/6 px-6">
				<input type="submit" class="w-1/2 p-2 rounded-md m-2 bg-red-600 hover:bg-red-400 text-white cursor-pointer" value="Cancel" @click="close" />
				<input type="submit" class="w-1/2 p-2 rounded-md m-2 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer" value="Create" @click="createEntry" />
			</div>
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
	name: 'newEntry',
	data() {
		return {
			errorMessage: '',
			title: '',
			description: '',
			error: false,
			boards: [] as Array<any>
		};
	},
	props: {
		entryCreated: { type: Function },
		id: { type: String },
		columnID: { type: String }
	},
	methods: {
		async createEntry() {
			if (this.title.length > 0) {
				const request = await fetch(`/api/createEntry`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						title: this.title,
						description: this.description,
						boardId: this.id,
						columnID: this.columnID
					})
				});
				const response = await request.status;
				if (response === 200) {
					this.close();
				} else {
					this.error = true;
				}
			} else {
				this.errorMessage = 'You need to enter a title!';
			}
		},
		close() {
			if (this.entryCreated) this.entryCreated();
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
