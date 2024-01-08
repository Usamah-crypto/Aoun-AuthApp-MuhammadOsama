import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Dispatch} from 'react';

export interface userType extends FirebaseAuthTypes.UserCredential {
  gender?: string;
  age?: string;
}

export interface useUserStoreTypes {
  accessToken: null | string;
  userProfile: null | userType;
  setAccessToken: (accessToken: string | null) => void;
  setUserProfile: (userProfile: userType | null) => void;
}

export interface DeleteModalProps {
  visible: boolean;
  isLoading: boolean;
  onClose: () => void;
  onDelete: () => void;
  password: string;
  setPassword: Dispatch<React.SetStateAction<string>>;
  error: string;
}
