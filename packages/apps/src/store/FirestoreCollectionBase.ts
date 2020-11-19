import {
  Getters,
  Mutations,
  Actions,
  Dispatch,
  Module,
} from 'vuex-smart-module';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

type firestoreCollectionRefLike =
  | firebase.firestore.Query
  | firebase.firestore.CollectionReference;

export class FirestoreCollectionState<T extends {}> {
  data: T[] = [];
  proxy: T[] = [];
  ref: firestoreCollectionRefLike | null = null;
  handler: any = {};
  isLoaded: boolean = false;
}

export class FirestoreCollectionGetters<
  T extends {},
  S extends FirestoreCollectionState<T>
> extends Getters<S> {
  get getData() {
    return this.state.proxy;
  }

  get getRef() {
    return this.state.ref;
  }

  get getIsLoaded() {
    return this.state.isLoaded;
  }
}

export class FirestoreCollectionMutations<
  T extends {},
  S extends FirestoreCollectionState<T>
> extends Mutations<S> {
  // constructor() {
  //   super();
  //   for (const k in vuexfireMutations) {
  //     console.log(k);
  //   }
  // }
  //
  // vuexfireMutations
  async ['vuexfire/SET_VALUE'](a: any) {
    await vuexfireMutations['vuexfire/SET_VALUE'](this, a);
    this.state.proxy = this.state.data.map((x) =>
      typeof x === 'object' ? new Proxy(x, this.state.handler) : x
    );
  }
  ['vuexfire/ARRAY_ADD'](a: any) {
    vuexfireMutations['vuexfire/ARRAY_ADD'](this, a);
    this.state.proxy = this.state.data.map((x) =>
      typeof x === 'object' ? new Proxy(x, this.state.handler) : x
    );
  }
  ['vuexfire/ARRAY_REMOVE'](a: any) {
    vuexfireMutations['vuexfire/ARRAY_REMOVE'](this, a);
    this.state.proxy = this.state.data.map((x) =>
      typeof x === 'object' ? new Proxy(x, this.state.handler) : x
    );
  }
  setRefState(ref: firestoreCollectionRefLike | null) {
    this.state.ref = ref;
  }
}

export class FirestoreCollectionActions<
  T extends {},
  S extends FirestoreCollectionState<T>,
  G extends FirestoreCollectionGetters<T, S>,
  M extends FirestoreCollectionMutations<T, S>
> extends Actions<S, G, M, FirestoreCollectionActions<T, S, G, M>> {
  setRef(ref: firestoreCollectionRefLike): Promise<number> {
    this.state.isLoaded = false;
    return new Promise((resolve, reject) => {
      const f = firestoreAction as (a: any) => any;
      f(({ bindFirestoreRef }: any) => {
        bindFirestoreRef('data', ref)
          .then(() => {
            this.state.isLoaded = true;
            resolve();
          })
          .catch((e: any) => {
            reject();
          });
      })(this);
      const commit = this.commit as (k: keyof M, v: any) => void;
      commit('setRefState', ref);
    });
  }

  setCollectionRef(collectionPath: string) {
    const cRef = firebase.firestore().collection(collectionPath);
    return this.setRef(cRef);
  }
}
