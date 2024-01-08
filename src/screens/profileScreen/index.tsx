import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {useUserStore} from '../../zustand';
import auth from '@react-native-firebase/auth';
import DeleteAccountModal from '../../components/DeleteAccountModal';
import firestore from '@react-native-firebase/firestore';
import {userType} from '../../types';

const ProfileScreen = () => {
  const userProfile = useUserStore(state => state.userProfile);
  const setAccessToken = useUserStore(state => state.setAccessToken);
  const setUserProfile = useUserStore(state => state.setUserProfile);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isEditting, setIsEditting] = useState(false);
  const [gender, setGender] = useState(userProfile?.gender);
  const [age, setAge] = useState(userProfile?.age);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccount = () => {
    setIsLoading(true);
    setError('');
    const user = auth().currentUser;

    if (user) {
      const credentials = auth.EmailAuthProvider.credential(
        userProfile?.user.email ?? '',
        password,
      );

      user
        .reauthenticateWithCredential(credentials)
        .then(() => {
          setIsLoading(false);

          user
            .delete()
            .then(() => {
              setAccessToken(null);
              setUserProfile(null);
            })
            .catch(error => {
              setError('Error while deleting account.');
            });
        })
        .catch(error => {
          setIsLoading(false);

          if (error.code === 'auth/invalid-credential') {
            console.log('Wrong password');
            setError('Wrong password.');
          } else {
            console.log('Navigate to Home', error.code);
            setError('Error while deleting account.');
          }
        });
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await auth().signOut();
      setIsLoading(false);

      setAccessToken(null);
      setUserProfile(null);
    } catch (error) {
      setIsLoading(false);
      setError('Something went wrong, try again');
    }
  };

  const setUser = async () => {
    const firestoreData = await firestore()
      .collection('users')
      .doc(userProfile?.user.uid)
      .get();

    setUserProfile({...userProfile, ...firestoreData.data()} as userType);
  };

  useEffect(() => {
    setUser();
  }, [userProfile?.user.uid]);

  const updateAccount = async () => {
    setIsLoading(true);

    const userRef = firestore().collection('users').doc(userProfile?.user.uid);

    return userRef
      .set(
        {
          gender,
          age,
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

          setUserProfile({...userProfile, ...docSnapshot.data()} as userType);
          setIsEditting(false);
        } else {
          setIsLoading(false);
          setError('Something went wrong');
        }
      })
      .catch(() => {
        setIsLoading(false);
        setError('Something went wrong');
      });
  };

  return (
    <LinearGradient colors={['#000000', '#333333']} style={styles.container}>
      <DeleteAccountModal
        error={error}
        password={password}
        setPassword={setPassword}
        isLoading={isLoading}
        visible={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteAccount}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>Profile</Text>
          <TouchableOpacity
            onPress={() => setIsEditting(!isEditting)}
            style={styles.softButtonTwo}>
            <Text style={styles.softButtonTextTwo}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fieldContainer}>
          <View style={styles.field}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userProfile?.user.email || ''}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>
              {userProfile?.user.displayName ?? userProfile?.user.username}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Gender:</Text>
            {!isEditting ? (
              <Text style={styles.value}>{userProfile?.gender ?? ''}</Text>
            ) : (
              <TextInput
                value={gender}
                onChangeText={setGender}
                style={styles.textInput}
              />
            )}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Age:</Text>
            {!isEditting ? (
              <Text style={styles.value}>{userProfile?.age || '-'}</Text>
            ) : (
              <TextInput
                value={age}
                onChangeText={setAge}
                style={styles.textInput}
              />
            )}
          </View>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" animating />
        ) : (
          <View style={styles.buttonContainer}>
            {isEditting && (
              <TouchableOpacity
                onPress={updateAccount}
                style={styles.softButton}>
                <Text style={styles.softButtonText}>Update</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => setIsDeleteModalOpen(true)}
              style={styles.softButton}>
              <Text style={styles.softButtonText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.softButton}>
              <Text style={styles.softButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingTop: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  fieldContainer: {
    marginBottom: 30,
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  label: {
    color: '#DDD',
    fontSize: 20,
  },
  value: {
    color: '#FFF',
    fontSize: 20,
  },
  textInput: {
    color: '#FFF',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    minWidth: 100,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  softButton: {
    backgroundColor: 'rgba(255, 105, 97, 0.3)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  softButtonText: {
    color: '#FF6961',
    fontSize: 20,
  },
  softButtonTextTwo: {
    color: '#FF6961',
    fontSize: 18,
  },
  softButtonTwo: {
    backgroundColor: 'rgba(255, 105, 97, 0.3)',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 1,
  },
});

export default ProfileScreen;
