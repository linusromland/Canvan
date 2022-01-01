import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		meta: { authentication: false }
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
		meta: { authentication: false }
	},
	{
		path: '/boards',
		name: 'Boards',
		component: () => import('../views/Boards.vue'),
		meta: { authentication: true }
	},
	{
		path: '/board',
		name: 'Board',
		component: () => import('../views/Board.vue'),
		meta: { authentication: true }
	},
	{
		path: '/unauthorized',
		name: 'Unauthorized',
		component: () => import('../views/Unauthorized.vue'),
		meta: { authentication: false }
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach(async (to, from) => {
	if (to.meta.authentication && !(await isLoggedIn())) {
		return {
			path: '/unauthorized'
		};
	} else if (!to.meta.authentication && (await isLoggedIn())) {
		return {
			path: '/boards'
		};
	}
});

async function isLoggedIn() {
	const request = await fetch('/api/user');
	const user = (await request.status) == 200 ? await request.json() : null;
	return user;
}

export default router;
