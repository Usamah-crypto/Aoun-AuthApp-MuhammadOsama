import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 10,
    alignSelf: 'center',
  },
  signupText: {
    color: 'black', // Color for the sign-up link text
    textDecorationLine: 'underline',
  },
  googleButton: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  googleButtonText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  googleIcon: {
    height: 20,
    width: 20,
  },
});
