import { Getters, Mutations, Actions } from 'vuex-smart-module';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

type firestoreDocumentRefLike = firebase.firestore.DocumentReference;

export class FirestoreDocumentState<T extends unknown> {
  data = {} as T;
  proxy = {} as T;
  ref: firestoreDocumentRefLike | null = null;
  isLoaded: boolean = false;
}

export class FirestoreDocumentGetters<
  T extends unknown,
  S extends FirestoreDocumentState<T>
> extends Getters<S> {
  get getData(): T {
    return this.state.proxy;
  }

  // get getDB() {
  //   return this.state.ref ? this.state.ref.firestore : null;
  // }

  get getRef(): firestoreDocumentRefLike | null {
    return this.state.ref;
  }

  get getIsLoaded(): boolean {
    return this.state.isLoaded;
  }
}

export class FirestoreDocumentMutations<
  T extends unknown,
  S extends FirestoreDocumentState<T>
> extends Mutations<S> {
  // constructor() {
  //   super();
  //   for (const k in vuexfireMutations) {
  //     console.log(k);
  //   }
  // }
  //
  // vuexfireMutations
  ['vuexfire/SET_VALUE'](a: any): void {
    vuexfireMutations['vuexfire/SET_VALUE'](this, a);
    // TODO: Proxyの必要性は検討？
    this.state.proxy =
      typeof this.state.data === 'object' && this.state.data
        ? new Proxy(this.state.data as any, this.handler)
        : this.state.data;
  }
  ['vuexfire/ARRAY_ADD'](a: any): void {
    vuexfireMutations['vuexfire/ARRAY_ADD'](this, a);
  }
  ['vuexfire/ARRAY_REMOVE'](a: any): void {
    vuexfireMutations['vuexfire/ARRAY_REMOVE'](this, a);
  }
  handler: any = {};
  setRefState(ref: firestoreDocumentRefLike | null): void {
    this.state.ref = ref;
  }
}

export class FirestoreDocumentActions<
  T,
  S extends FirestoreDocumentState<T>,
  G extends FirestoreDocumentGetters<T, S>,
  M extends FirestoreDocumentMutations<T, S>
> extends Actions<S, G, M, FirestoreDocumentActions<T, S, G, M>> {
  setRef(ref: firestoreDocumentRefLike, callback?: void): Promise<void> {
    // TODO: fix
    return new Promise((resolve, reject) => {
      const f = firestoreAction as (a: any) => any;
      f(({ bindFirestoreRef }: any) => {
        bindFirestoreRef('data', ref)
          .then(() => {
            this.state.isLoaded = true;
            resolve();
          })
          .catch((e: any) => {
            console.warn('binding error', e);
            reject();
          });
      })(this);
      const commit = this.commit as (k: keyof M, v: any) => void;
      commit('setRefState', ref);
    });
  }
  unsetRef(): void {
    const f = firestoreAction as (a: any) => any;
    f(({ unbindFirestoreRef }: any) => {
      unbindFirestoreRef('data');
    })(this);
    const commit = this.commit as (k: keyof M, v: any) => void;
    commit('setRefState', null);
  }
  setDocumentRef(documentPath: string): Promise<void> {
    const dRef = firebase.firestore().doc(documentPath);
    return this.setRef(dRef);
  }
  // 参考 https://github.com/angular/angularfire/blob/c34c0f39f9e60064acfa550f124752a342a3e8c4/src/firestore/firestore.ts#L207
  createId(): string {
    return firebase.firestore().collection('_').doc().id;
  }
}
