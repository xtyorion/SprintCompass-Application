import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserHomeScreen from '../screens/UserHomeScreen';
import ProjectDetailsScreen from '../screens/ProjectDetailsScreen';

const UserHomeStack = createNativeStackNavigator();

const UserHomeStackScreen = () => {
  return (
    <UserHomeStack.Navigator  
      screenOptions={{
      headerShown: false,}}
      initialRouteName="UserHomeScreen"
      >
      <UserHomeStack.Screen name="UserHomeScreen" component={UserHomeScreen} />
      <UserHomeStack.Screen name="ProjectDetailsScreen" component={ProjectDetailsScreen} />
    </UserHomeStack.Navigator>
  );
}

export default UserHomeStackScreen;