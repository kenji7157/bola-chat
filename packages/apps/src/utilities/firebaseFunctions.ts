import firebase from 'firebase/app';
import 'firebase/functions';

export function updateUserMetadata() {
  const func = firebase.functions().httpsCallable('updateUserMetadata');
  return func();
}
