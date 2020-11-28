import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import createAuth0Client from '@auth0/auth0-spa-js';

export class SignInState {
  user: firebase.User | null = null;
  isSignIn: boolean = false;
}

export class SignInGetters extends Getters<SignInState> {
  get getUser() {
    return this.state.user;
  }
  get isSignIn() {
    return this.state.isSignIn;
  }
}

export class SignInMutations extends Mutations<SignInState> {
  setUser(user: firebase.User | null) {
    this.state.user = user;
  }
  setIsSignIn(flag: boolean) {
    this.state.isSignIn = flag;
  }
}

export class SignInActions extends Actions<
  SignInState,
  SignInGetters,
  SignInMutations
> {
  updateCurrentUser() {
    const user = firebase.auth().currentUser;
    const isSignIn = !!user;
    this.commit('setUser', user);
    this.commit('setIsSignIn', isSignIn);
  }

  async signUp(payload: { email: string; password: string }) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          firebase.firestore().collection('account').doc(user.uid).set({
            accountUID: user.uid,
            email: user.email,
            name: user.displayName,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async signIn(payload: { email: string; password: string }) {
    // firebaseAuthentificationの呼び出し
    await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password);
  }

  async signOut() {
    await firebase
      .auth()
      .signOut()
      .catch((err) => {
        console.log('error: ', err);
      });
    // TODO: auth0は別ファイルに切り出す
    const auth0 = await createAuth0Client({
      domain: 'bola-chat.us.auth0.com',
      client_id: 'uQRDgLsXa5CrqJ5FHpQWQVblXO6umErj',
      returnTo: `https://${process.env.VUE_APP_AUTH_DOMAIN}/signIn`,
    });
    auth0.logout();
  }

  signInAuth() {
    console.log('signInWithRedirect');
    const provider = new firebase.auth.SAMLAuthProvider('saml.auth0');
    firebase.auth().signInWithRedirect(provider);
  }
}

export function signInActionType(action: keyof SignInActions) {
  return `SignInModule/${action}`;
}

export const SignInModule = new Module({
  state: SignInState,
  getters: SignInGetters,
  mutations: SignInMutations,
  actions: SignInActions,
});
