import firebase from 'firebase/app';
import 'firebase/firestore';

export type Datetime = firebase.firestore.Timestamp;
export type ServerTimestamp = Datetime | firebase.firestore.FieldValue;

export type DocumentBase = {
  createdAt?: ServerTimestamp;
};
