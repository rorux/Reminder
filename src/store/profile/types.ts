export type TProfile = {
  userName: string;
};

export interface IProfileState {
  userName: string | null;
  loading: boolean;
  error: null | string;
}

export enum ProfileActionTypes {
  PROFILE_INIT = 'PROFILE::PROFILE_INIT',
  PROFILE_SUCCESS = 'PROFILE::PROFILE_SUCCESS',
  PROFILE_ERROR = 'PROFILE::PROFILE_ERROR',
  PROFILE_DELETE = 'PROFILE::PROFILE_DELETE',
}

interface IProfileInitAction {
  type: ProfileActionTypes.PROFILE_INIT;
}

interface IProfileSuccessAction {
  type: ProfileActionTypes.PROFILE_SUCCESS;
  payload: TProfile;
}

interface IProfileErrorAction {
  type: ProfileActionTypes.PROFILE_ERROR;
  payload: string;
}

export type TProfileAction = IProfileInitAction | IProfileSuccessAction | IProfileErrorAction;
