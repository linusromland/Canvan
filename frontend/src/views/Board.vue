<template>
	<Navbar></Navbar>
	<div class="flex justify-around">
		<h2 class="text-2xl self-center">{{ data.name }}</h2>
		<div>
			<button class="p-2 rounded-md m-2 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer" @click="newEntryModal = true">New Entry</button>
			<!-- Add check if admin -->
			<button class="p-2 rounded-md m-2 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer" @click="settingsModal = true" v-if="true">Settings</button>
		</div>
	</div>
	<hr />
	<div class="w-full flex justify-center">
		<div class="flex m-2 min-h-full w-10/12 justify-center">
			<div class="bg-gray-200 p-4 m-2 min-h-full grow animate-container" v-for="(column, index) in data.columns" :key="index">
				<h3 class="text-xl">{{ column.title }}:</h3>
				<draggable
					tag="transition-group"
					:component-data="{
						tag: 'ul',
						type: 'transition-group',
						name: !drag ? 'flip-list' : null
					}"
					v-model="column.entries"
					v-bind="dragOptions"
					@start="drag = true"
					@end="drag = false"
					item-key="order"
					class="h-full"
				>
					<template #item="{ element }">
						<li class="p-2 my-2 text-center rounded cursor-move bg-gray-300 flex justify-between h-20">
							<div class="flex flex-col justify-around">
								<h3 class="text-2xl">{{ element.title }}</h3>
								<p class="text-sm" v-if="element.description">{{ element.description }}</p>
							</div>
							<div class="flex flex-col justify-around">
								<p class="text-sm" v-if="element.createdAt"><b>Created by:</b> Linus Romland</p>
								<p class="text-sm" v-if="element.createdAt">Created {{ formatDate(element.createdAt) }}</p>
							</div>
						</li>
					</template>
				</draggable>
			</div>
		</div>
	</div>
	<newEntry v-if="newEntryModal" @close="closeEntry" :id="id" :columnID="columnID"></newEntry>
	<settingsModal v-if="settingsModal" @close="closeSettings" @updateSettings="updateSettings" :board="data"></settingsModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { format, TDate } from 'timeago.js';

//Components import
import draggable from 'vuedraggable';
import Navbar from '@/components/Navbar/index.vue';
import newEntry from '@/components/NewEntry/index.vue';
import settingsModal from '@/components/SettingsModal/index.vue';

export default defineComponent({
	name: 'Home' as string,
	components: {
		draggable,
		Navbar,
		newEntry,
		settingsModal
	},
	data() {
		return {
			drag: false,
			data: {} as any,
			id: '' as any,
			columnID: '' as any,
			newEntryModal: false,
			settingsModal: false
		};
	},
	sockets: {
		connect: function () {
			console.log('socket connected');
		},
		customEmit: function (data: any) {
			console.log('customEmit', data);
			console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)');
		}
	},
	computed: {
		dragOptions() {
			return {
				animation: 200,
				group: 'description',
				disabled: false,
				dragClass: 'ghost',
				sort: false
			};
		}
	},
	methods: {
		async getData() {
			const request = await fetch(`/api/board/${this.id}`);
			if ((await request.status) === 200) {
				const data = await request.json();
				this.columnID = data.columns[0].id;
				this.data = data;
			} else {
				this.$router.push('/boards');
			}
		},
		closeEntry() {
			this.newEntryModal = false;
			this.getData();
		},
		closeSettings() {
			this.settingsModal = false;
			this.getData();
		},
		updateSettings(data: string) {
			console.log(data);
		},
		formatDate(date: TDate) {
			return format(date);
		}
	},
	created() {
		this.id = this.$route.query.id;
		this.getData();
	}
});
</script>

<style scoped>
.grow {
	flex-grow: 1;
}
.ghost {
	display: none;
}
</style>
