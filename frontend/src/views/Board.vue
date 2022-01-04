<template>
	<Navbar></Navbar>
	<button class="p-2 rounded-md m-2 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer" @click="newEntryModal = true">New Entry</button>
	<button class="p-2 rounded-md m-2 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer" @click="settingsModal = true">Settings</button>

	<div class="flex m-2 min-h-fit">
		<div class="bg-gray-200 p-4 m-2 min-h-full" v-for="(column, index) in data.columns" :key="index">
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
					<li class="p-2 m-2 text-center rounded cursor-move bg-gray-300">{{ element.title }}</li>
				</template>
			</draggable>
		</div>
	</div>
	<newEntry v-if="newEntryModal" :entryCreated="closeEntry" :id="id" :columnID="columnID"></newEntry>
	<settingsModal v-if="settingsModal" @close="closeSettings"></settingsModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
	computed: {
		dragOptions() {
			return {
				animation: 200,
				group: 'description',
				disabled: false,
				ghostClass: 'ghost'
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
		}
	},
	created() {
		this.id = this.$route.query.id;
		this.getData();
	}
});
</script>
