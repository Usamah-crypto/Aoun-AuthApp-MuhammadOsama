import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useUserStore} from '../../zustand';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const userProfile = useUserStore(state => state.userProfile);
  const [welcomeText, setWelcomeText] = useState('');

  const checkFirstTimeLogin = () => {
    const usersRef = firestore().collection('users');
    const userId = userProfile?.user.uid;
    console.log('userId', userId);

    usersRef
      .doc(userId)
      .get()
      .then(doc => {
        if (doc.exists) {
          const userData = doc.data();

          const isFirstTimeLogin = userData?.isFirstTimeLogin;
          console.log('isFirstTimeLogin', isFirstTimeLogin);

          if (isFirstTimeLogin) {
            setWelcomeText(
              `Hi welcome ${userData?.username},\n Its your first time here in our app please take a tour and get familiar with the app`,
            );
            const userRef = firestore()
              .collection('users')
              .doc(userProfile?.user.uid);

            return userRef
              .set(
                {
                  isFirstTimeLogin: false,
                },
                {merge: true},
              )
              .then(() => {
                return userRef.get();
              })
              .then(docSnapshot => {
                if (docSnapshot.exists) {
                  const userData = docSnapshot.data();
                  console.log('userData', userData);
                } else {
                  console.log('err');
                }
              })
              .catch(error => {
                console.log('err', error);
              });
          } else {
            setWelcomeText(
              `Hi welcome ${userData?.username}, \nYou're back again!!!`,
            );
          }
        } else {
          console.log('User document does not exist');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  };

  useEffect(() => {
    checkFirstTimeLogin();
  }, []);

  return (
    <LinearGradient colors={['#000000', '#333333']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>{welcomeText}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFF',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF6961',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
