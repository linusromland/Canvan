<template>
	<div class="fixed inset-0 w-full h-full z-50 flex" id="transition">
		<div class="m-auto w-4/6 bg-white p-5 rounded-md flex flex-col items-center" v-if="!error">
			<div class="w-full flex">
				<div class="w-2/6 m-5">
					<h3 class="text-gray-700 text-2xl m-3">Board settings</h3>
					<label class="text-gray-700 text-md mx-3 my-0" for="title">Title</label>
					<input type="text" v-model="title" class="w-full p-2 m-3 rounded-md bg-gray-200" placeholder="Title" />
					<div class="w-full flex justify-center">
						<button type="submit" class="p-2 rounded-md m-5 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer" @click="updateSettings">Update Settings</button>
					</div>
				</div>
				<div class="w-4/6 m-5 p-3 bg-gray-100 rounded-md">
					<div class="flex justify-between">
						<h3 class="text-gray-700 text-2xl m-2">Users</h3>
						<div class="flex m-2">
							<input type="text" class="text-sm p-2 mx-2 rounded-md bg-gray-200" placeholder="Add user" />
							<input type="button" class="w-4/12 text-sm p-2 mx-2 rounded-md bg-blue-500 hover:bg-blue-400 text-white" value="Add user" />
						</div>
					</div>
					<div class="h-14 flex" v-for="(user, index) in users" :key="index">
						<p class="text-sm p-2 mx-2 rounded-md bg-gray-200">Linus Romland</p>
						<p class="text-sm p-2 mx-2 rounded-md bg-gray-200">hello@linusromland.com</p>
						<select class="w-1/2 m-2 p-2 rounded-md bg-gray-200" :disabled="true">
							<option value="owner" v-if="true" selected>Owner</option>
							<option value="admin">Admin</option>
							<option value="user">User</option>
							<option value="user">Viewer</option>
						</select>
						<input type="button" class="text-sm rounded-md bg-blue-500 hover:bg-blue-400 text-white" value="Update user" />
						<input type="button" class="text-sm rounded-md bg-red-500 hover:bg- red-400 text-white" value="Delete user" />
					</div>
				</div>
			</div>
			<button type="submit" class="w-2/6 p-2 rounded-md m-5 bg-red-500 hover:bg-red-400 text-white cursor-pointer" @click="close">Close</button>
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
			error: false as boolean,
			title: '' as string,
			users: [] as Array<any>
		};
	},
	props: {
		board: { type: Object }
	},
	methods: {
		close() {
			this.$emit('close');
		},
		updateSettings() {
			this.error = false;
			this.$emit('updateSettings', this.title);
		}
	},
	mounted() {
		if (this.board) {
			this.title = this.board.name;
			this.users = this.board.users;
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
