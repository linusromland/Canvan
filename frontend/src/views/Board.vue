<template>
	<Navbar></Navbar>

	<div class="flex m-2 min-h-fit">
		<div class="bg-gray-200 p-4 m-2 min-h-full">
			<h3 class="text-xl">Title:</h3>
			<draggable
				tag="transition-group"
				:component-data="{
					tag: 'ul',
					type: 'transition-group',
					name: !drag ? 'flip-list' : null
				}"
				v-model="list"
				v-bind="dragOptions"
				@start="drag = true"
				@end="drag = false"
				item-key="order"
				class="h-full"
			>
				<template #item="{ element }">
					<li class="p-2 m-2 text-center rounded cursor-move bg-gray-300">{{ element.name }}</li>
				</template>
			</draggable>
		</div>
		<div class="bg-gray-200 p-4 m-2 min-h-full">
			<h3 class="text-xl">Title:</h3>
			<draggable
				tag="transition-group"
				:component-data="{
					tag: 'ul',
					type: 'transition-group',
					name: !drag ? 'flip-list' : null
				}"
				v-model="list2"
				v-bind="dragOptions"
				@start="drag = true"
				@end="drag = false"
				item-key="order"
				class="h-full"
			>
				<template #item="{ element }">
					<li class="p-2 m-2 text-center rounded cursor-move bg-gray-300">{{ element.name }}</li>
				</template>
			</draggable>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Components import
import draggable from 'vuedraggable';
import Navbar from '@/components/Navbar/index.vue';

const message = ['New Navbar', 'Edit User Page', 'Edit Board Page', 'Edit Card Page'];
const message2 = ['Create Login System'];

export default defineComponent({
	name: 'Home' as string,
	components: {
		draggable,
		Navbar
	},
	data() {
		return {
			drag: false,
			list: message.map((name, index) => {
				return { name, order: index + 1 };
			}),
			list2: message2.map((name, index) => {
				return { name, order: index + 1 };
			})
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
	}
});
</script>
