<template>
	<Navbar></Navbar>

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

export default defineComponent({
	name: 'Home' as string,
	components: {
		draggable,
		Navbar
	},
	data() {
		return {
			drag: false,
			data: {} as any
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
	async created() {
		const request = await fetch(`/api/board/${this.$route.query.id}`);
		if ((await request.status) === 200) {
			const data = await request.json();
			this.data = data;
		} else {
			this.$router.push('/boards');
		}
	}
});
</script>
