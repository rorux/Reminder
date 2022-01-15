import { Dispatch } from 'react';
import firebase from 'firebase';
import { ProfileActionTypes, TProfileAction, TProfile } from './types';

export const changeProfileWithFirebase = (profile: TProfile) => () => {
  const uid = firebase.auth().currentUser?.uid;
  if (uid) {
    firebase.database().ref('users').child(uid).child('profile').set(profile);
  }
};

export const getProfileFromFirebase = () => (dispatch: Dispatch<TProfileAction>) => {
  try {
    dispatch({ type: ProfileActionTypes.PROFILE_INIT });
    const uid = firebase.auth().currentUser?.uid;
    if (uid) {
      firebase
        .database()
        .ref('users')
        .child(uid)
        .child('profile')
        .on('value', (snapshot) => {
          dispatch({
            type: ProfileActionTypes.PROFILE_SUCCESS,
            payload: snapshot.val(),
          });
        });
    }
  } catch (e) {
    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: 'Произошла ошибка при загрузке профиля!',
    });
  }
};
