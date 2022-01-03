<template>
	<Navbar />
	<div>
		<button class="p-2 rounded-md m-2 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer" @click="newBoard = true">New board</button>
		<div class="w-full flex flex-col items-center">
			<router-link v-for="(board, index) in boards" :key="index" :to="`/board?id=${board._id}`" class="w-11/12 bg-gray-300 hover:bg-gray-400 h-14 my-2">
				<h3 class="text-2xl">{{ board.name }}</h3>
			</router-link>
		</div>
	</div>
	<newBoard v-if="newBoard" :boardCreated="newBoardCreated" id="transition" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Components import
import Navbar from '@/components/Navbar/index.vue';
import newBoard from '@/components/NewBoard/index.vue';

export default defineComponent({
	name: 'Home' as string,
	components: {
		Navbar,
		newBoard
	},
	data() {
		return {
			boards: [] as Array<any>,
			newBoard: false
		};
	},
	methods: {
		async getBoards() {
			const request = await fetch(`/api/boards`);
			this.boards = await request.json();
		},
		newBoardCreated(boards: Array<any>) {
			if (boards.length > 0) this.boards = boards;
			this.newBoard = false;
		}
	},
	mounted() {
		this.getBoards();
	}
});
</script>
