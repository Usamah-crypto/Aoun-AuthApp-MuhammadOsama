import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {styles} from '../loginScreen/styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({toggleScreen}: {toggleScreen: () => void}) => {
  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSignup = async () => {
    if (!email || !password || !username) {
      setError('Please fill all required fields to continue.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        return auth()
          .currentUser?.updateProfile({
            displayName: username,
          })
          .then(() => {
            const userRef = firestore().collection('users').doc(resp.user.uid);

            return userRef
              .set(
                {
                  username,
                  email,
                },
                {merge: true},
              )
              .then(() => {
                return userRef.get();
              })
              .then(docSnapshot => {
                if (docSnapshot.exists) {
                  setIsLoading(false);
                  toggleScreen();
                } else {
                  setIsLoading(false);
                  setError('Something went wrong');
                }
              })
              .catch(error => {
                setIsLoading(false);
                setError('Something went wrong');
              });
          });
      })
      .catch(error => {
        setIsLoading(false);

        if (error.code === 'auth/email-already-in-use') {
          setError('That email address is already in use.');
        } else if (error.code === 'auth/invalid-email') {
          setError('That email address is invalid.');
        } else {
          setError('Failed to create an account.');
        }
      });
  };

  return (
    <>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder={t('username')}
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder={t('email')}
        autoCapitalize="none"
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
      <TextInput
        style={styles.input}
        placeholder={t('confirm_password')}
        secureTextEntry
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <Text style={{color: 'red'}}>{error}</Text>
      <TouchableOpacity style={styles.loginButton} onPress={onSignup}>
        {isLoading ? (
          <ActivityIndicator animating={true} size="small" color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>{t('signup')}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleScreen} style={styles.signupLink}>
        <Text style={styles.signupText}>{t('alreadyUser')}</Text>
      </TouchableOpacity>
    </>
  );
};

export default SignUpScreen;
