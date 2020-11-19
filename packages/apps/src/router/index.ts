import firebase from 'firebase/app';
import 'firebase/auth';
import { Store } from 'vuex';
import Router from 'vue-router';
import { RouteConfig } from 'vue-router';
import fetchInitData from '@/init';

const Home = () => import(/* webpackChunkName: "Home"*/ '@/views/Home.vue');

export const Routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

let redirected = false;
export function createRouter(store: Store<any>): Router {
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: Routes,
  });

  firebase.auth().onAuthStateChanged((user) => {
    const noAuthRouteNames = Routes.filter((r) => r.meta?.noAuth && r.name).map(
      (r) => r.name || ''
    );
    const noAuthRoute = noAuthRouteNames.some((name) =>
      location.href.includes(name)
    );
    if (user) {
      if (noAuthRoute) router.push('/');
    } else {
      if (noAuthRoute) return;
    }
  });

  router.beforeEach(async (to, from, next) => {
    await fetchInitData(store);
    if (!firebase.auth().currentUser) {
      const result = await firebase.auth().getRedirectResult();
      console.log('新規作成ユーザー:', result.additionalUserInfo?.isNewUser);
    }
    // beforeEach内で動的にroutingしたときはそのまま解決する
    if (redirected) {
      redirected = false;
      next();
      return;
    } else {
      next();
    }
  });
  return router;
}
