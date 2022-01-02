<template>
	<div class="fixed inset-0 w-full h-full z-50 flex" id="transition">
		<div class="m-auto w-2/6 bg-white p-5 rounded-md flex flex-col items-center" v-if="!createdBoard">
			<h3 class="text-xl m-5">Create a new Kanban Board</h3>
			<input type="text" v-model="boardName" class="w-5/6 p-2 m-5 rounded-md bg-gray-200" placeholder="Kanban Board Name" />
			<p class="text-red-600">{{ errorMessage }}</p>

			<div class="flex w-5/6 px-6">
				<input type="submit" class="w-1/2 p-2 rounded-md m-2 bg-red-600 hover:bg-red-400 text-white cursor-pointer" value="Cancel" @click="close" />
				<input type="submit" class="w-1/2 p-2 rounded-md m-2 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer" value="Create" @click="createBoard" />
			</div>
		</div>
		<div class="m-auto w-2/6 bg-white p-5 rounded-md flex flex-col items-center" v-else>
			<h3 class="text-2xl m-5 text-green-500">Created board "{{ boardName }}"!</h3>
			<button type="submit" class="w-5/6 p-2 rounded-md m-5 bg-red-500 hover:bg-red-400 text-white cursor-pointer" @click="close">Close</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'newBoard',
	data() {
		return {
			boardName: '',
			errorMessage: '',
			boards: [] as Array<any>,
			createdBoard: false
		};
	},
	props: {
		boardCreated: { type: Function }
	},
	methods: {
		async createBoard() {
			if (this.boardName.length == 0) {
				this.errorMessage = 'Board name cannot be empty';
				return;
			} else {
				this.errorMessage = '';
				const request = await fetch(`/api/createBoard`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name: this.boardName
					})
				});
				const response = await request.json();
				this.boards = response;
				this.createdBoard = true;
			}
		},
		close() {
			this.boardName = '';
			this.errorMessage = '';
			this.createdBoard = false;
			if (this.boardCreated) this.boardCreated(this.boards);
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
