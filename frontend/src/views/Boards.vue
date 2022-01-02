<template>
	<Navbar />
	<div>
		<button type="button" @click="newBoard = true">Create new Kanban Board</button>
		<div v-for="(board, index) in boards" :key="index">
			<p>{{ board.name }}</p>
		</div>
	</div>
	<newBoard v-if="newBoard" :boardCreated="newBoardCreated" id="transition" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Components import
import Navbar from '@/components/Navbar/index.vue';
import newBoard from '@/components/newBoard/index.vue';

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
