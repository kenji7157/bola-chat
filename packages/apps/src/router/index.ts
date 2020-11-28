import firebase from 'firebase/app';
import 'firebase/auth';
import { Store } from 'vuex';
import Router from 'vue-router';
import { RouteConfig } from 'vue-router';
import fetchInitData from '@/init';
import { signInActionType } from '@/store/SignInModule';

const Home = () => import(/* webpackChunkName: "Home"*/ '@/views/Home.vue');

const SignIn = () =>
  import(/* webpackChunkName: "sign-in"*/ '@/views/SignIn.vue');
const SignUp = () =>
  import(/* webpackChunkName: "sign-up"*/ '@/views/SignUp.vue');

export const AppRoutes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

export const SignInRoute: RouteConfig = {
  path: '/signIn',
  name: 'signIn',
  component: SignIn,
};

export const SignUpRoute: RouteConfig = {
  path: '/signUp',
  name: 'signUp',
  component: SignUp,
};

export const Routes: RouteConfig[] = [...AppRoutes, SignInRoute, SignUpRoute];

// const redirected = false;
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
      console.log('未ログイン');
      // const result = await firebase.auth().getRedirectResult();
      // console.log('新規作成ユーザー:', result.additionalUserInfo?.isNewUser);
    } else {
      await store.dispatch(signInActionType('updateCurrentUser'));
      console.log('ログイン中');
      // signIn画面に遷移するときはトップ画面にリダイレクトさせる
      if (to.path === '/signIn') {
        next({ path: '/' });
      }
    }
    next();
    // beforeEach内で動的にroutingしたときはそのまま解決する
    // if (redirected) {
    //   redirected = false;
    //   next();
    //   return;
    // } else {
    //   next();
    // }
  });
  return router;
}
