import {createStackNavigator} from '@react-navigation/stack';
import LoginSignupScreen from '../../screens/loginScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="loginScreen" component={LoginSignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
