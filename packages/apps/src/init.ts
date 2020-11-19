import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Store } from 'vuex';
import { CommentCollectionGetters } from '@/store/CommentCollectionModule';

type storeGetters = {
  CommentCollectionModule: CommentCollectionGetters;
};

export default async (store: Store<storeGetters>): Promise<void> => {
  const promises: Promise<any>[] = [];

  if (!store.state.CommentCollectionModule.getRef) {
    const commentCollectionRef = firebase.firestore().collection('comment');
    promises.push(
      store
        .dispatch('CommentCollectionModule/setRef', commentCollectionRef)
        .catch((e) => console.error(e))
    );
  }

  await Promise.all(promises)
    .then(() => {
      console.log('fetch store');
    })
    .catch((e) => {
      console.log(e);
    });
};
