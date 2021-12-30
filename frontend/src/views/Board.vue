<template>
	<div class="flex">
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
		>
			<template #item="{ element }">
				<li>{{ element.name }}</li>
			</template>
		</draggable>

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
		>
			<template #item="{ element }">
				<li>{{ element.name }}</li>
			</template>
		</draggable>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Components import
import draggable from 'vuedraggable';

const message = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6', 'Test6', 'Test7', 'Test8', 'Test9', 'Test10'];
const message2 = ['1Test1', '1Test2', '1Test3', '1Test4', '1Test5', '1Test6', '1Test6', '1Test7', '1Test8', '1Test9', '1Test10'];

export default defineComponent({
	name: 'Home' as string,
	components: {
		draggable
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
	methods: {
		async getUser() {
			const request = await fetch('/api/user');
			const user = await request.json();
			if (!user) {
				window.location.href = '/unauthorized';
			}
		}
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
	created() {
		this.getUser();
	}
});
</script>
