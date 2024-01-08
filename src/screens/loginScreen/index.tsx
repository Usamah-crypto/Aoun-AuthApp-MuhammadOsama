import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Image,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SignUpScreen from '../signupScreen';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useUserStore} from '../../zustand';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '85756825516-ro0na36p76a0cn15jocbjc013f5v677r.apps.googleusercontent.com',
});

const LoginSignupScreen: React.FC = () => {
  const setUserProfile = useUserStore(state => state.setUserProfile);
  const setAccessToken = useUserStore(state => state.setAccessToken);

  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [animation, setAnimatedValue] = useState(new Animated.Value(0));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleScreen = () => {
    setAnimatedValue(new Animated.Value(0));
    setShowLogin(!showLogin);
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [showLogin]);

  const gradientColors = ['#000000', '#333333'];
  const animatedStyles = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  const onPressLogin = async () => {
    setIsLoading(true);
    if (email && password) {
      setError('');
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async user => {
          console.log(user);

          if (user) {
            const userRef = firestore().collection('users').doc(user.user.uid);

            const firestoreData = await firestore()
              .collection('users')
              .doc(user.user.uid)
              .get();
            if (
              firestoreData.exists &&
              firestoreData?.data()?.isFirstTimeLogin !== false
            ) {
              console.log('undefine');

              return userRef
                .set(
                  {
                    isFirstTimeLogin: true,
                  },
                  {merge: true},
                )
                .then(() => {
                  console.log('then 1');

                  return userRef.get();
                })
                .then(docSnapshot => {
                  if (docSnapshot.exists) {
                    setIsLoading(false);

                    setUserProfile(user);
                    setAccessToken(user.user.uid);
                  } else {
                    setError('Something went wrong');
                  }
                })
                .catch(error => {
                  setError('Something went wrong');
                });
            } else {
              setIsLoading(false);
              setUserProfile(user);
              setAccessToken(user.user.uid);
            }
          }
        })
        .catch(error => {
          setIsLoading(false);

          console.log('error - - - >>>', error);
          if (error.code === 'auth/invalid-email') setError(error.message);
          else if (error.code === 'auth/user-not-found')
            setError('No User Found');
          else {
            setError('Please check your email id or password');
          }
        });
    } else {
      setIsLoading(false);
      setError('Please fill all fields to continue.');
    }
  };

  const onPressGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);

      const userRef = firestore().collection('users').doc(user.user.uid);

      const firestoreData = await firestore()
        .collection('users')
        .doc(user.user.uid)
        .get();

      return userRef
        .set(
          {
            isFirstTimeLogin:
              firestoreData?.data()?.isFirstTimeLogin !== false ? true : false,
            username: user?.additionalUserInfo?.profile?.name,
          },
          {merge: true},
        )
        .then(() => {
          console.log('then 1');

          return userRef.get();
        })
        .then(docSnapshot => {
          if (docSnapshot.exists) {
            setIsLoading(false);

            setUserProfile(user);
            setAccessToken(idToken);
          } else {
            setError('Something went wrong');
          }
        })
        .catch(error => {
          setError('Something went wrong');
          setIsLoading(false);
        });
    } catch (error: any) {
      setIsLoading(false);

      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <Animated.View style={[styles.contentContainer, animatedStyles]}>
        {showLogin ? (
          <>
            <Text style={styles.title}>{t('login')}</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder={t('email')}
              onChangeText={text => setEmail(text)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder={t('password')}
              secureTextEntry
              onChangeText={text => setPassword(text)}
              value={password}
            />
            <Text style={{color: 'red'}}>{error}</Text>

            {isLoading ? (
              <ActivityIndicator animating={true} size="large" color="#000" />
            ) : (
              <>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={onPressLogin}>
                  <Text style={styles.loginButtonText}>{t('login')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.googleButton}
                  onPress={onPressGoogleLogin}>
                  <Image
                    style={styles.googleIcon}
                    source={{
                      uri: 'https://i.ibb.co/j82DCcR/search.png',
                    }}
                  />

                  <Text style={styles.googleButtonText}>
                    Sign in with Google
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={toggleScreen} style={styles.signupLink}>
              <Text style={styles.signupText}>{t('notUser')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <SignUpScreen toggleScreen={toggleScreen} />
        )}
      </Animated.View>
    </LinearGradient>
  );
};

export default LoginSignupScreen;
