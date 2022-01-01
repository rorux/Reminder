import { Dispatch } from 'react';
import firebase from 'firebase';
import { RecordsActionTypes, TRecord, TRecordsAction } from './types';

export const addRecordWithFirebase = (record: TRecord) => () => {
  const uid = firebase.auth().currentUser?.uid;
  if (uid) {
    firebase.database().ref('users').child(uid).child('records').child(record.id).set(record);
  }
};

export const deleteRecordWithFirebase = (id: string) => () => {
  const uid = firebase.auth().currentUser?.uid;
  if (uid) {
    firebase.database().ref('users').child(uid).child('records').child(id).remove();
  }
};

export const initRecords = () => (dispatch: Dispatch<TRecordsAction>) => {
  try {
    dispatch({ type: RecordsActionTypes.RECORDS_INIT });
    const uid = firebase.auth().currentUser?.uid;
    if (uid) {
      firebase
        .database()
        .ref('users')
        .child(uid)
        .child('records')
        .on('value', (snapshot) => {
          const payload: Array<TRecord> = [];
          if (snapshot.val() !== null) {
            Object.keys(snapshot.val()).forEach((id) => {
              payload.push({ ...snapshot.val()[id] });
            });
          }
          dispatch({
            type: RecordsActionTypes.RECORDS_SUCCESS,
            payload,
          });
        });
    }
  } catch (e) {
    dispatch({
      type: RecordsActionTypes.RECORDS_ERROR,
      payload: 'Произошла ошибка при загрузке напоминаний!',
    });
  }
};
