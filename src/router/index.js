import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/components/Main';
import World from '@/components/World';
import FormAuth from '@/components/FormAuth';
import firebase, { firebaseAuth } from '@/firebase';

Vue.use(Router);

function requireAuth(to, from, next) {
	const user = firebaseAuth.currentUser;
	if (!user) {
		console.log('User is not logged in');
		next({
			path: '/',
			query: { redirect: to.fullPath },
		});
	} else {
		next();
	}
}

var router = new Router({
	routes: [
		{
			path: '/',
			name: 'Main',
			component: Main,
		},
		{
			path: '/world',
			name: 'World',
			component: World,
			beforeEnter: requireAuth,
		},
		{
			path: '/auth',
			name: 'FormAuth',
			component: FormAuth,
		},
	],
});


router.beforeEach((to, from, next) => {
	window.scrollTo(0, 0);
	next();
});

export default router;
