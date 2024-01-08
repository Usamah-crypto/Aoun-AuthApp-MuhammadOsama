import {create} from 'zustand';
import {useUserStoreTypes} from '../types';

export const useUserStore = create<useUserStoreTypes>(set => ({
  accessToken: null,
  userProfile: null,
  setAccessToken: accessToken => set({accessToken}),
  setUserProfile: userProfile => set({userProfile}),
}));
