<template>
	<Navbar></Navbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Components import
import Navbar from '@/components/Navbar/index.vue';

export default defineComponent({
	name: 'Home' as string,
	components: {
		Navbar
	}
});
</script>
