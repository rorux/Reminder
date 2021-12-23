import { IRootState } from '@store/types';

export const authSelector = (store: IRootState) => store.auth;
