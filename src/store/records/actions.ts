import { Dispatch } from 'react';
import firebase from 'firebase';
import { RecordsActionTypes, TRecord, IRecordsInitAction } from './types';

export const addRecordWithFirebase = (record: TRecord) => async () => {
  const uid = await firebase.auth().currentUser?.uid;
  if (uid) {
    await firebase.database().ref('users').child(uid).child('records').child(record.id).set(record);
  }
};

export const initRecords = () => async (dispatch: Dispatch<IRecordsInitAction>) => {
  const uid = firebase.auth().currentUser?.uid;
  if (uid) {
    await firebase
      .database()
      .ref('users')
      .child(uid)
      .child('records')
      .on('value', (snapshot) => {
        const payload: Array<TRecord> = [];
        Object.keys(snapshot.val()).forEach((id) => {
          payload.push({ ...snapshot.val()[id] });
        });
        dispatch({
          type: RecordsActionTypes.RECORDS_INIT,
          payload,
        });
      });
  }
};
