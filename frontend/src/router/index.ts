import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue')
	},
	{
		path: '/unauthorized',
		name: 'Unauthorized',
		component: () => import('../views/Unauthorized.vue')
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
